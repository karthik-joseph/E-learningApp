import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { theme } from "@/constants/Colors";

interface CustomAlertProps {
  visible: boolean;
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  title,
  message,
  onCancel,
  onConfirm,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalText}>{message}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={onConfirm}
            >
              <Text style={styles.confirmButtonText}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: Dimensions.get("window").width * 0.8,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.darkBlue,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16,
    color: theme.colors.black2,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    minWidth: 100,
  },
  cancelButton: {
    backgroundColor: theme.colors.disabled,
    marginRight: 16,
  },
  confirmButton: {
    backgroundColor: theme.colors.violet2,
  },
  cancelButtonText: {
    color: theme.colors.buttonText,
    fontWeight: "bold",
    textAlign: "center",
  },
  confirmButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CustomAlert;
