import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router, Link } from "expo-router";
import CustomText from "@/components/CustomText";
import { verifyOTP, sendOTP } from "@/app/utils/auth";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
  MaskSymbol,
  isLastFilledCell,
} from "react-native-confirmation-code-field";
import { theme } from "@/constants/Colors";
import CustomNumberText from "@/components/CustomNumberText";

const CELL_COUNT = 4;
const INITIAL_RESEND_DELAY = 30;

const VerifyOTPScreen: React.FC = () => {
  const { phoneNumber, flow, name } = useLocalSearchParams();
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [timer, setTimer] = useState(INITIAL_RESEND_DELAY);
  const [canResend, setCanResend] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setCanResend(true);
    }, INITIAL_RESEND_DELAY * 1000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!canResend && timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [canResend, timer]);

  const handleResendOTP = async () => {
    console.log("Resending OTP...");

    const otpSend = await sendOTP(phoneNumber);
    if (otpSend) {
      Alert.alert("Success", "OTP sent successfully.");
      setValue("");
      setCanResend(false);
    } else {
      Alert.alert("Error", "Failed to send OTP. Please try again.");
      setValue("");
    }
    setTimer(INITIAL_RESEND_DELAY);
    timerRef.current = setTimeout(() => {
      setCanResend(true);
    }, INITIAL_RESEND_DELAY * 1000);
  };

  const handleVerifyOTP = async () => {
    try {
      setIsLoading(true);
      // If the OTP is empty, display an error message and return
      if (value.length < 4) {
        Alert.alert("Error", "Please enter a valid OTP.");
        return;
      }

      // Verify the OTP
      const isValid = await verifyOTP(phoneNumber, value);

      if (isValid) {
        // OTP is valid, navigate based on 'flow'
        if (flow === "login") {
          router.push("/(Home)");
        } else if (flow === "signUp") {
          router.push({
            pathname: "/logging/SetPasswordScreen",
            params: { name: name, phoneNumber: phoneNumber },
          });
        }
      } else {
        Alert.alert("Error", "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      Alert.alert("Error", "An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderCell = ({ index, symbol, isFocused }) => {
    let textChild = null;

    if (symbol) {
      textChild = (
        <MaskSymbol
          maskSymbol="*"
          isLastFilledCell={isLastFilledCell({ index, value })}
        >
          {symbol}
        </MaskSymbol>
      );
    } else if (isFocused) {
      textChild = <Cursor />;
    }

    return (
      <CustomText
        key={index}
        style={[styles.cell, isFocused && styles.focusCell]}
        onLayout={getCellOnLayoutHandler(index)}
      >
        {textChild}
      </CustomText>
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <Image
        source={require("@/assets/images/otp-page.jpg")}
        alt="OTP Image"
        style={styles.OTPImage}
      />
      <View style={styles.container}>
        <CustomText style={styles.title}>Verify OTP</CustomText>
        <CustomText style={styles.subTitle}>
          Please enter the 4 digit verification code that is send to you at{" "}
          <CustomNumberText style={styles.phoneNumber}>
            {phoneNumber}
          </CustomNumberText>
        </CustomText>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={renderCell}
        />
        <CustomText style={styles.codeNotReceived}>
          Don't receive code?{" "}
          {canResend ? (
            <TouchableOpacity onPress={handleResendOTP}>
              <CustomText style={styles.resendCodeSec}>Resend</CustomText>
            </TouchableOpacity>
          ) : (
            <CustomText style={styles.resendCodeSec}>{timer} sec</CustomText>
          )}
        </CustomText>
      </View>
      <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOTP}>
        <CustomText style={styles.verifyButtonText}>
          {isLoading ? <ActivityIndicator color="#fff" /> : "Verify"}
        </CustomText>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    minHeight: 300,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  OTPImage: {
    height: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
    marginVertical: 12,
    backgroundColor: "#fff",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 17,
    textAlign: "center",
    marginBottom: 20,
    color: theme.colors.grey5,
  },
  phoneNumber: {
    color: theme.colors.darkBlue,
    fontWeight: "700",
    marginBottom: 10,
  },
  codeFieldRoot: {},
  cell: {
    width: 70,
    height: 70,
    lineHeight: 40,
    fontSize: 24,
    borderWidth: 2,
    borderColor: theme.colors.grey,
    textAlign: "center",
    padding: 14,
    marginHorizontal: 8,
    borderRadius: 8,
    fontFamily: "Quantico-Regular",
  },
  focusCell: {
    borderColor: "#000",
  },
  codeNotReceived: {
    flexDirection: "row",
    marginTop: 10,
    fontSize: 14,
    height: 25,
    color: theme.colors.grey2,
    opacity: 0.9,
    alignSelf: "flex-end",
  },
  resendCodeSec: {
    color: theme.colors.darkBlue,
    fontWeight: "700",
    fontSize: 15,
  },
  verifyButton: {
    backgroundColor: theme.colors.violet2,
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  verifyButtonText: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: "700",
  },
});

export default VerifyOTPScreen;
