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
}

const CountryPicker: React.FC<CountryPickerProps> = ({
  isVisible,
  onClose,
  onSelectCountry,
  countries,
}) => {
  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <FlatList
          data={countries}
          keyExtractor={(item) => item.code}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.countryItem}
              onPress={() => {
                onSelectCountry(item);
                onClose();
              }}
            >
              <Image source={item.flag} style={styles.flag} />
              <CustomText>{item.name}</CustomText>
              <CustomText>{item.code}</CustomText>
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
    backgroundColor: "white",
    marginTop: 50,
  },
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  flag: {
    width: 30,
    height: 20,
    marginRight: 10,
  },
});

export default CountryPicker;
