import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";
import * as JWT from "expo-jwt";
import * as SMS from "expo-sms";

// Get the JWT_SECRET from environment variables
const DEV_SECRET =
  "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyNDY4MDUzMCwiaWF0IjoxNzI0NjgwNTMwfQ.WAQ6L0bOIQXc52CSwpVlkcQNM13Dd1XIY9RT9Boj2yc";

const JWT_SECRET = process.env.JWT_SECRET_KEY || DEV_SECRET;

if (!JWT_SECRET) {
  console.warn(
    "JWT_SECRET is not set in environment variables. Using a fallback for development."
  );
}

// Define User type
type User = {
  id: string;
  name: string;
  phoneNumber: string;
  password: string;
};

const SECRET = JWT_SECRET || "fallback_secret_for_development";

// Helper function to create a valid key for SecureStore
function createValidKey(key: string): string {
  return key.replace(/[^a-zA-Z0-9._-]/g, "_");
}

export function generateToken(userId: string): string {
  return JWT.encode(
    {
      userId: userId,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    },
    SECRET
  );
}

async function storeUser(user: User): Promise<void> {
  const validKey = createValidKey(`user_${user.phoneNumber}`);
  await SecureStore.setItemAsync(validKey, JSON.stringify(user));
}

/// Helper function to retrieve user data
async function retrieveUser(phoneNumber: string): Promise<User | null> {
  const validKey = createValidKey(`user_${phoneNumber}`);
  const userData = await SecureStore.getItemAsync(validKey);
  return userData ? JSON.parse(userData) : null;
}

// Helper function to hash passwords
async function hashPassword(password: string): Promise<string> {
  const salt = await Crypto.getRandomBytesAsync(16);
  const hashedPassword = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password + salt.toString()
  );
  return `${salt.toString()}:${hashedPassword}`;
}

// Helper function to verify passwords
async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  const [salt, hash] = hashedPassword.split(":");
  const verifyHash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password + salt
  );
  return hash === verifyHash;
}

export async function loginUser(
  phoneNumber: string,
  password: string
): Promise<{ user: User; token: string }> {
  const user = await retrieveUser(phoneNumber);
  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await verifyPassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  // Generate Token using JWT.encode (now correctly imported)
  const token = JWT.encode({ userId: user.id }, SECRET, {
    expiresIn: 86400,
  });

  await SecureStore.setItemAsync("userToken", token);

  return { user, token };
}

export function validatePassword(password: string): boolean {
  const minLength = 8;
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[!@#$%^&*]/.test(password);

  return (
    password.length >= minLength &&
    hasLowerCase &&
    hasUpperCase &&
    hasNumber &&
    hasSymbol
  );
}

export async function setPassword(
  userId: string,
  newPassword: string
): Promise<boolean> {
  if (!validatePassword(newPassword)) {
    throw new Error("Password does not meet requirements");
  }

  const hashedPassword = await hashPassword(newPassword);

  const success = await updateUserPassword(userId, hashedPassword);

  return success;
}

export async function authenticateToken(): Promise<User | null> {
  try {
    const token = await SecureStore.getItemAsync("userToken");
    if (!token) return null;

    const decoded = JWT.decode(token, JWT_SECRET) as { userId: string };

    const user = await fetchUserById(decoded.userId);

    return user || null;
  } catch (error) {
    console.error("Error authenticating token:", error);
    return null;
  }
}

export async function checkIfUserExists(phoneNumber: string): Promise<boolean> {
  const user = await retrieveUser(phoneNumber);
  return user !== null;
}

async function createUser(userData: {
  name: string;
  phoneNumber: string;
  password: string;
}): Promise<User> {
  const newUser: User = {
    id: Crypto.randomUUID(),
    ...userData,
  };
  await storeUser(newUser);
  return newUser;
}

export async function registerUser(
  name: string,
  phoneNumber: string,
  password: string
): Promise<User> {
  const existingUser = await checkIfUserExists(phoneNumber);
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = await createUser({
    name,
    phoneNumber,
    password: hashedPassword,
  });

  return user;
}

async function findUserByPhoneNumber(
  phoneNumber: string
): Promise<User | null> {
  return retrieveUser(phoneNumber);
}

async function updateUserPassword(
  userId: string,
  hashedPassword: string
): Promise<boolean> {
  const allUsers = await SecureStore.getAllKeys();
  for (const key of allUsers) {
    if (key.startsWith("user_")) {
      const user = JSON.parse((await SecureStore.getItemAsync(key)) || "{}");
      if (user.id === userId) {
        user.password = hashedPassword;
        await storeUser(user);
        return true;
      }
    }
  }
  return false;
}

async function fetchUserById(userId: string): Promise<User | null> {
  const allUsers = await SecureStore.getAllKeys();
  for (const key of allUsers) {
    if (key.startsWith("user_")) {
      const user = JSON.parse((await SecureStore.getItemAsync(key)) || "{}");
      if (user.id === userId) {
        return user;
      }
    }
  }
  return null;
}

function generateOTP(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

export async function sendOTP(phoneNumber: string): Promise<string | null> {
  try {
    // Check if SMS is available on the device
    const isAvailable = await SMS.isAvailableAsync();
    if (!isAvailable) {
      console.log("SMS is not available on this device");
      return null;
    }

    // Generate OTP
    const otp = generateOTP();

    // Prepare message
    const message = `Your OTP is: ${otp}. Please do not share this with anyone.`;

    // Send SMS
    const { result } = await SMS.sendSMSAsync([phoneNumber], message);

    if (result) {
      // Store OTP and phone number temporarily
      await AsyncStorage.setItem(
        "pendingOTP",
        JSON.stringify({ phoneNumber, otp })
      );
      console.log(`OTP sent to ${phoneNumber}`);
      return true;
    } else {
      console.log("Failed to send OTP");
      return false;
    }
  } catch (error) {
    console.error("Error sending OTP:", error);
    return false;
  }
}

export async function verifyOTP(
  phoneNumber: string,
  enteredOTP: string
): Promise<boolean> {
  try {
    const storedData = await AsyncStorage.getItem("pendingOTP");
    if (storedData) {
      const { phoneNumber: storedPhone, otp: storedOTP } =
        JSON.parse(storedData);
      if (phoneNumber === storedPhone && enteredOTP === storedOTP) {
        await AsyncStorage.removeItem("pendingOTP");
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return false;
  }
}

export { retrieveUser };
