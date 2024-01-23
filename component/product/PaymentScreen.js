import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

const PaymentScreen = () => {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState(""); // State variable for displaying messages
  const navigation = useNavigation();

  const handleCashOnDelivery = () => {
    // Validate input fields
    if (fullName === "" || address === "" || phoneNumber === "") {
      setMessage("Xin vui lòng điền đầy đủ vào những ô trống!");
      return;
    }

    // Handle cash on delivery payment
    setMessage("Payment by cash on delivery");
    clearCartAndNavigate();
  };

  const handleCreditCardPayment = () => {
    // Handle credit card payment
    setMessage("Payment by credit card");
    clearCartAndNavigate();
  };

  const handleMoMoPayment = () => {
    // Handle MoMo payment
    setMessage("Payment by MoMo");
    clearCartAndNavigate();
  };

  const clearCartAndNavigate = () => {
    // Clear the shopping cart and navigate back to the home screen
    // Replace this with your actual code to clear the cart
    setMessage("Clearing the shopping cart");

    navigation.navigate("Home"); // Replace "Home" with the actual name of your home screen component
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Icon name="person" size={20} color="#777" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Họ và tên"
          value={fullName}
          onChangeText={setFullName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="location" size={20} color="#777" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Địa chỉ"
          value={address}
          onChangeText={setAddress}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="call" size={20} color="#777" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>

      {message !== "" && <Text style={styles.message}>{message}</Text>}

      <TouchableOpacity style={styles.button1} onPress={handleCashOnDelivery}>
        <FontAwesomeIcon
          name="money"
          size={20}
          color="#fff"
          style={styles.buttonIcon}
        />
        <Text style={styles.buttonText}>Thanh toán khi nhận hàng</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button2}
        onPress={handleCreditCardPayment}>
        <Icon name="card" size={20} color="#fff" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Thanh toán bằng thẻ</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button3} onPress={handleMoMoPayment}>
        <FontAwesomeIcon
          name="mobile"
          size={20}
          color="#fff"
          style={styles.buttonIcon}
        />
        <Text style={styles.buttonText}>Thanh toán bằng MoMo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#777",
    paddingBottom: 4,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
  },
  button1: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1ab30c",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 8,
  },
  button2: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3745de",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 8,
  },
  button3: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f525e0",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 8,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  message: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
    color: "#ff0000",
  },
});

export default PaymentScreen;
