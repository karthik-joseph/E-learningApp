import React from "react";
import {
  Modal,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import CustomText from "./CustomText";
import { theme } from "@/constants/Colors";

interface Country {
  name: string;
  code: string;
  flag: any;
}

interface CountryPickerProps {
  isVisible: boolean;
  onClose: () => void;
  onSelectCountry: (country: Country) => void;
  countries: Country[];
  selectedCountry: Country;
}

const CountryPicker: React.FC<CountryPickerProps> = ({
  isVisible,
  onClose,
  onSelectCountry,
  countries,
  selectedCountry,
}) => {
  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={countries}
          keyExtractor={(item) => item.code}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.countryItem,
                item.code === selectedCountry.code &&
                  styles.selectedCountryItem,
              ]}
              onPress={() => {
                onSelectCountry(item);
                onClose();
              }}
            >
              <Image source={item.flag} style={styles.flag} />
              <CustomText style={styles.text}>{item.name}</CustomText>
              <CustomText style={styles.text}>{item.code}</CustomText>
            </TouchableOpacity>
          )}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: theme.colors.black2,
    paddingHorizontal: 16,
    justifyContent: "center",
    width: "80%",
    height: 300,
    borderWidth: 1,
    borderColor: theme.colors.lightBlue,
    marginHorizontal: "auto",
    borderRadius: 8,
    marginBottom: 100,
    marginTop: "100%",
    paddingVertical: 20,
  },
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: theme.colors.lightBlue,
    borderRadius: 25,
    marginBottom: 10,
  },
  selectedCountryItem: {
    backgroundColor: theme.colors.violet,
  },
  flag: {
    width: 30,
    height: 20,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    color: theme.colors.white,
  },
});

export default CountryPicker;
