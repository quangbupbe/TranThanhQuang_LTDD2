import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const navigation = useNavigation();

const PaymentScreen = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleNameChange = (text) => {
    setName(text);
  };

  const handleAddressChange = (text) => {
    setAddress(text);
  };

  const handlePaymentMethodChange = (text) => {
    setPaymentMethod(text);
  };

  const handleCheckout = () => {
    // Xử lý khi người dùng nhấn vào nút thanh toán
    // Ví dụ: gửi thông tin thanh toán lên server
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin thanh toán</Text>
      <TextInput
        style={styles.input}
        placeholder="Họ và tên"
        value={name}
        onChangeText={handleNameChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Địa chỉ"
        value={address}
        onChangeText={handleAddressChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Phương thức thanh toán"
        value={paymentMethod}
        onChangeText={handlePaymentMethodChange}
      />
      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutButtonText}>Thanh toán</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  checkoutButton: {
    backgroundColor: "blue",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
  },
  checkoutButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});

export default PaymentScreen;
