import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { AuthContext } from "@/app/utils/authContext";
import { SafeAreaView } from "react-native-safe-area-context";

// Import custom components/Files
import CustomText from "@/components/CustomText";
import { theme } from "@/constants/Colors";
import PasswordIcon from "@/assets/images/password-lock.svg";
import { validatePassword, registerUser } from "@/app/utils/auth";

const SetPasswordScreen: React.FC = () => {
  const { phoneNumber, name } = useLocalSearchParams();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handlePasswordChange = (text: string) => {
    setPassword(text);

    if (!validatePassword(text)) {
      if (text.length < 8) {
        setErrorMessage("Password should be at least 8 characters long.");
      } else if (!/[a-z]/.test(text)) {
        setErrorMessage(
          "Password should contain at least one lowercase letter."
        );
      } else if (!/[A-Z]/.test(text)) {
        setErrorMessage(
          "Password should contain at least one uppercase letter."
        );
      } else if (!/[$@#%!?&]/.test(text)) {
        setErrorMessage(
          "Password should contain at least one special character."
        );
      } else {
        setErrorMessage("Password does not meet requirements.");
      }
    } else {
      setErrorMessage("");
    }
  };

  const handleSubmitPassword = async () => {
    if (validatePassword(password)) {
      setIsLoading(true);

      try {
        const newUser = await registerUser(name!, phoneNumber!, password);
        login(newUser);

        router.push({
          pathname: "/(Home)",
          params: { name: name!, phoneNumber: phoneNumber! },
        });
      } catch (error) {
        console.error("Error registering user:", error);
        setErrorMessage("An error occurred. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
  };
  const requirements = [
    { text: "Should contain at least 8 characters", met: password.length >= 8 },
    {
      text: "Should contain a lowercase (small) letter (a-z)",
      met: /[a-z]/.test(password),
    },
    {
      text: "Should contain a uppercase (capital) letter (A-Z)",
      met: /[A-Z]/.test(password),
    },
    {
      text: "Should contain at least one number (0-9)",
      met: /[0-9]/.test(password),
    },
    {
      text: "Should contain at least one symbol ($,@,#,%,!,?,&)",
      met: /[$@#%!?&]/.test(password),
    },
  ];

  const allRequirementsMet = requirements.every((req) => req.met);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={require("@/assets/images/password-page.jpg")}
          alt="Password page"
        />
      </View>
      <View>
        <View style={{ alignItems: "center" }}>
          <CustomText style={styles.title}>Set a Strong Password</CustomText>
          <CustomText style={styles.subtitle}>
            Set a strong password for your account.
          </CustomText>

          <View style={styles.inputContainer}>
            <PasswordIcon style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={handlePasswordChange}
              placeholder="Enter password"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Feather
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="#666"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ paddingHorizontal: 22, width: "100%" }}>
          {errorMessage !== "" && (
            <CustomText style={styles.errorText}>{errorMessage}</CustomText>
          )}

          {requirements.map((req, index) => (
            <View key={index} style={styles.requirementRow}>
              <View
                style={[styles.checkbox, req.met && styles.checkboxChecked]}
              >
                {req.met && <Feather name="check" size={16} color="white" />}
              </View>
              <CustomText
                style={[
                  styles.requirementText,
                  req.met && styles.requirementMetText,
                ]}
              >
                {req.text}
              </CustomText>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.submitButton,
          !validatePassword(password) && styles.submitButtonDisabled,
        ]}
        onPress={handleSubmitPassword}
        disabled={!validatePassword(password) || isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>Submit</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: undefined,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: "90%",
  },
  inputIcon: {
    marginRight: 10,
    width: 20,
    height: undefined,
    aspectRatio: 1,
  },
  input: {
    flex: 1,
    height: 50,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  requirementRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
    width: "100%",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: "#7C5BFF",
    borderColor: "#7C5BFF",
  },
  requirementText: {
    color: theme.colors.grey2,
    fontSize: 14,
  },
  requirementMetText: {
    color: "#000 ",
  },
  submitButton: {
    backgroundColor: theme.colors.violet2,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  submitButtonDisabled: {
    backgroundColor: theme.colors.grey3,
  },
  submitButtonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SetPasswordScreen;
