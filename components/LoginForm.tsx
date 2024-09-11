import React, { useState, useMemo } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { theme } from "@/constants/Colors";
import CustomText from "./CustomText";
import BlackArrow from "@/assets/images/drop-down.svg";
import Phone from "@/assets/images/phone.svg";
import CountryPicker from "./CountryPicker";

interface Country {
  name: string;
  code: string;
  flag: any;
}

interface LoginFormProps {
  phoneNumber: string;
  onChangePhoneNumber: (text: string) => void;
  countryCode: string;
  onChangeCountryCode: (code: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  phoneNumber,
  onChangePhoneNumber,
  countryCode,
  onChangeCountryCode,
}) => {
  const [isCountryPickerVisible, setIsCountryPickerVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    name: "India",
    code: "+91",
    flag: require("@/assets/images/flags/india.png"),
  });

  const countries: Country[] = useMemo(
    () => [
      {
        name: "India",
        code: "+91",
        flag: require("@/assets/images/flags/india.png"),
      },
      {
        name: "United States",
        code: "+1",
        flag: require("@/assets/images/flags/usa.png"),
      },
      {
        name: "United Kingdom",
        code: "+44",
        flag: require("@/assets/images/flags/uk.png"),
      },
      {
        name: "Canada",
        code: "+11",
        flag: require("@/assets/images/flags/canada.png"),
      },
      {
        name: "Australia",
        code: "+61",
        flag: require("@/assets/images/flags/australia.png"),
      },
      {
        name: "Germany",
        code: "+49",
        flag: require("@/assets/images/flags/germany.png"),
      },
      {
        name: "France",
        code: "+33",
        flag: require("@/assets/images/flags/france.png"),
      },
      {
        name: "Japan",
        code: "+81",
        flag: require("@/assets/images/flags/japan.png"),
      },
      {
        name: "China",
        code: "+86",
        flag: require("@/assets/images/flags/china.png"),
      },
      {
        name: "Brazil",
        code: "+55",
        flag: require("@/assets/images/flags/brazil.png"),
      },
      {
        name: "Mexico",
        code: "+52",
        flag: require("@/assets/images/flags/mexico.png"),
      },
      {
        name: "Spain",
        code: "+34",
        flag: require("@/assets/images/flags/spain.png"),
      },
      {
        name: "Italy",
        code: "+39",
        flag: require("@/assets/images/flags/italy.png"),
      },
      {
        name: "Russia",
        code: "+7",
        flag: require("@/assets/images/flags/russia.png"),
      },
      {
        name: "South Korea",
        code: "+82",
        flag: require("@/assets/images/flags/south-korea.png"),
      },
    ],
    []
  );

  const handlePhoneNumberChange = (text: string) => {
    // Only allow numeric input for phone number
    if (/^\d*$/.test(text)) {
      onChangePhoneNumber(text);
    }
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    onChangeCountryCode(country.code);
    setIsCountryPickerVisible(false);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.countryCode}
        onPress={() => setIsCountryPickerVisible(true)}
      >
        <Image
          source={selectedCountry.flag}
          alt="flag"
          style={styles.countryFlag}
        />
        <BlackArrow style={styles.dropDownArrow} />
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <Phone style={styles.phoneIcon} />
        <CustomText style={styles.countryCodeText}>
          {selectedCountry.code}
        </CustomText>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={onChangePhoneNumber}
          keyboardType="phone-pad"
          maxLength={10}
        />
      </View>

      <CountryPicker
        isVisible={isCountryPickerVisible}
        onClose={() => setIsCountryPickerVisible(false)}
        onSelectCountry={handleCountrySelect}
        countries={countries}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  countryCode: {
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
  },
  countryFlag: {
    width: 42,
    height: undefined,
    aspectRatio: 1,
    resizeMode: "cover",
    borderRadius: 50,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: theme.colors.disabledText,
  },
  dropDownArrow: {
    marginHorizontal: 8,
    width: 5,
    height: undefined,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.8,
    borderColor: theme.colors.black,
    borderRadius: 8,
    overflow: "hidden",
    width: "75%",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  phoneIcon: {
    width: "100%",
    height: undefined,
    aspectRatio: 0.9,
    tintColor: theme.colors.darkBlue,
    padding: 14,
  },
  countryCodeText: {
    fontFamily: "Quantico-Regular",
    color: theme.colors.black2,
    fontSize: 17,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 17,
    color: theme.colors.text,
    width: "100%",
    fontFamily: "Quantico-Regular",
  },
  errorMessage: {
    color: theme.colors.red,
    marginTop: 5,
  },
});

export default LoginForm;
