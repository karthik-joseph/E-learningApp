import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { Link, router } from "expo-router";

// Import custom components
import CustomText from "@/components/CustomText";
import LoginForm from "@/components/LoginForm";
import CustomAlert from "@/components/CustomAlert";
import { sendOTP, checkIfUserExists } from "../utils/auth";
// Import styles
import { theme } from "@/constants/Colors";

const LoginScreen: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handlePhoneNumberChange = (text: string) => {
    // Only allow numeric input for phone number
    if (/^\d*$/.test(text)) {
      setPhoneNumber(text);
      setErrorMessage("");
    } else {
      setErrorMessage("Please enter only numbers");
    }
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);

      // Check if the phone number is valid
      if (phoneNumber.length < 10) {
        setErrorMessage("Please enter a valid phone number");
        setIsLoading(false);
        return;
      }

      const fullNumber = countryCode + phoneNumber;

      // Check if the user exists
      const userExists = await checkIfUserExists(fullNumber);
      if (userExists) {
        // User exists, proceed with OTP
        const otpSent = await sendOTP(fullNumber);

        if (otpSent) {
          // Navigate to the OTP verification screen
          router.push({
            pathname: "/logging/VerifyOTPScreen",
            params: { phoneNumber: fullNumber, flow: "login" },
          });
        } else {
          setErrorMessage("Failed to send OTP. Please try again.");
        }
      } else {
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCountryCodeChange = (newCode: string) => {
    setCountryCode(newCode);
  };

  const handleCreateAccount = () => {
    setShowAlert(false);
    router.push({
      pathname: "/logging/CreateAccount",
      params: { phoneNumber: countryCode + phoneNumber },
    });
    setPhoneNumber("");
  };

  const handleCancelAlert = () => {
    setShowAlert(false);
    setIsLoading(false); // Reset loading state when alert is cancelled
    setPhoneNumber("");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/login-page.jpg")}
        alt="login-page"
        style={styles.loginImage}
      />
      <CustomText style={styles.title}>Login to your account</CustomText>
      <CustomText style={styles.subtitle}>
        Login with your phone number
      </CustomText>

      <LoginForm
        phoneNumber={phoneNumber}
        onChangePhoneNumber={handlePhoneNumberChange}
        countryCode={countryCode}
        onChangeCountryCode={handleCountryCodeChange}
      />
      {errorMessage ? (
        <CustomText style={styles.errorMessage}>{errorMessage}</CustomText>
      ) : null}
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={isLoading || !!errorMessage}
      >
        <CustomText style={styles.buttonText}>
          {isLoading ? "Processing..." : "Join Now"}
        </CustomText>
      </TouchableOpacity>

      <View style={styles.createAccountContainer}>
        <CustomText>Don't have an account? </CustomText>
        <Link href="/logging/CreateAccount" style={styles.createAccountLink}>
          Create Account
        </Link>
      </View>
      <CustomAlert
        visible={showAlert}
        title="Account Not Found"
        message="No account found with this phone number. Would you like to create a new account?"
        onCancel={handleCancelAlert}
        onConfirm={handleCreateAccount}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loginImage: {
    width: "55%",
    height: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
    marginVertical: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: theme.colors.black,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: theme.colors.disabledText,
  },
  button: {
    width: "100%",
    backgroundColor: theme.colors.violet,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: theme.colors.buttonText,
    fontSize: 17,
    fontWeight: "600",
  },
  errorMessage: {
    color: theme.colors.red,
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
    padding: 5,
    marginBottom: -10,
  },
  disabledButton: {
    backgroundColor: theme.colors.disabled,
  },
  createAccountContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  createAccountLink: {
    color: theme.colors.darkBlue,
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
