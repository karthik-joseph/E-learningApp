import React, { createContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { generateToken, retrieveUser } from "./auth";

// Define User type
type User = {
  id: string;
  name: string;
  phoneNumber: string;
};

// Create the AuthContext
const AuthContext = createContext<{
  user: User | null;
  isLoading: boolean;
  login: (user: User) => Promise<void>;
  logout: () => Promise<void>;
}>({
  user: null,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
});

// Create the AuthProvider component
const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing user token on app load
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = await SecureStore.getItemAsync("userToken");
        if (token) {
          const storedUser = await retrieveUser(token);
          if (storedUser) {
            setUser(storedUser);
          }
        }
      } catch (error) {
        console.error("Error checking for logged-in user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  const login = async (userData: User) => {
    try {
      await SecureStore.setItemAsync("userToken", userData.id);
      const token = generateToken(userData.id);
      await SecureStore.setItemAsync("userToken", token);
      const storedUser = await retrieveUser(userData.phoneNumber);
      setUser(storedUser);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync("userToken");
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
