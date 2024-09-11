import { Link, router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

// Import custom files
import Profile from "@/assets/images/profile.svg";
import CustomText from "@/components/CustomText";
import { theme } from "@/constants/Colors";
import LoginForm from "@/components/LoginForm";
import { sendOTP, checkIfUserExists } from "@/app/utils/auth";

const CreateAccount = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [errorMessage, setErrorMessage] = useState("");
  const [name, SetName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneNumberChange = (text: string) => {
    // Only allow numeric input for phone number
    if (/^\d*$/.test(text)) {
      setPhoneNumber(text);
      setErrorMessage("");
    } else {
      setErrorMessage("Please enter only numbers");
    }
  };

  const handleNameChange = (text: string) => {
    // Example name validation: Only allows letters and spaces
    if (/^[A-Za-z\s]*$/.test(text)) {
      SetName(text);
      setErrorMessage("");
    } else {
      setErrorMessage("Please enter a valid name (letters and spaces only)");
    }
  };

  const handleCountryCodeChange = (newCode: string) => {
    setCountryCode(newCode);
  };

  const handleSubmit = async () => {
    // Validate phone number and send OTP to the user
    if (phoneNumber.length < 10) {
      setErrorMessage("Please enter a valid phone number");
      setIsLoading(false);
      return;
    }

    if (name.length < 3) {
      setErrorMessage("Please enter a valid name with at least 3 characters");
      setIsLoading(false);
      return;
    }

    const fullNumber = countryCode + phoneNumber;

    try {
      setIsLoading(true);

      // Check if the user exists
      const userExists = await checkIfUserExists(fullNumber);

      if (userExists) {
        // User exists, display error message
        setErrorMessage("An account with this phone number already exists.");
        setIsLoading(false);
        return;
      } else {
        // User does not exist, proceed with sending OTP
        const otpSent = await sendOTP(fullNumber);

        if (otpSent) {
          // Navigate to VerifyOTPScreen with phoneNumber and name
          router.push({
            pathname: "/logging/VerifyOTPScreen",
            params: { phoneNumber: fullNumber, flow: "signUp", name: name },
          });
          setPhoneNumber("");
          SetName("");
        } else {
          setErrorMessage("Failed to send OTP. Please try again.");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require("@/assets/images/name-page.jpg")}
            alt="Name Page Image"
            style={styles.nameImage}
          />
        </View>
        <View style={styles.infoContainer}>
          <CustomText style={styles.title}>Enter Your Information</CustomText>
          <CustomText style={styles.subTitle}>
            Enter your full name for your account.
          </CustomText>
          <View style={styles.textInputContainer}>
            <Profile style={styles.profileIcon} />
            <TextInput
              style={styles.inputText}
              value={name}
              onChangeText={handleNameChange}
            />
          </View>
          <View style={styles.phoneNumberContainer}>
            <CustomText
              style={[styles.subTitle, { marginTop: 20, marginBottom: 14 }]}
            >
              Enter Your Phone Number
            </CustomText>
            <LoginForm
              phoneNumber={phoneNumber}
              onChangePhoneNumber={handlePhoneNumberChange}
              countryCode={countryCode}
              onChangeCountryCode={handleCountryCodeChange}
            />
            {errorMessage ? (
              <CustomText style={styles.errorMessage}>
                {errorMessage}
              </CustomText>
            ) : null}
          </View>
        </View>
        {/* InfoContainer */}
      </View>
      {/* ContentContainer */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <CustomText style={styles.submitButtonText}>
          {isLoading ? "Processing..." : "Submit"}
        </CustomText>
      </TouchableOpacity>
      <CustomText>
        Already have an account{" "}
        <Link href="/logging/LoginScreen" style={styles.loginText}>
          Log in
        </Link>
      </CustomText>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#fff",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    marginTop: -60,
    marginBottom: 70,
    overflow: "hidden",
  },
  nameImage: {
    width: "50%",
    height: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
  },
  infoContainer: {
    width: "100%",
    marginTop: -30,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },
  subTitle: {
    textAlign: "center",
    fontSize: 15,
    marginBottom: 10,
    color: theme.colors.grey5,
  },
  textInputContainer: {
    width: "100%",
    height: 55,
    backgroundColor: theme.colors.grey3,
    borderRadius: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 3,
  },
  profileIcon: {
    width: 30,
    height: 30,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  inputText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: theme.colors.black2,
    paddingVertical: 8,
    paddingHorizontal: 5,
    backgroundColor: "transparent",
  },
  phoneNumberContainer: {
    width: "100%",
  },
  submitButton: {
    backgroundColor: theme.colors.violet2,
    paddingVertical: 18,
    paddingHorizontal: 25,
    borderRadius: 8,
    width: "100%",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 3,
  },
  submitButtonText: {
    fontWeight: "600",
    fontSize: 17,
    color: theme.colors.buttonText,
  },
  loginText: {
    color: theme.colors.violet2,
    fontSize: 15,
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginTop: 10,
    marginBottom: 20,
  },
  errorMessage: {
    color: theme.colors.red,
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
    padding: 5,
    marginBottom: -10,
  },
});

export default CreateAccount;
