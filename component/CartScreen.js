import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CartContext } from "./CartContext";
import { useNavigation } from "@react-navigation/native";

const CartScreen = () => {
  const { cartItems, clearCart } = useContext(CartContext);

  const handlePlaceOrder = () => {
    // Xử lý quy trình đặt mua
    // ...
    // Sau khi đặt mua thành công, bạn có thể xóa giỏ hàng:
    clearCart();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Giỏ hàng</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyCartText}>Giỏ hàng trống</Text>
      ) : (
        <View>
          {cartItems.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <Text style={styles.cartItemName}>{item.title}</Text>
              <Text style={styles.cartItemPrice}>{`$${item.price}`}</Text>
            </View>
          ))}
          <TouchableOpacity
            style={styles.placeOrderButton}
            onPress={handlePlaceOrder}>
            <Text style={styles.placeOrderButtonText}>Đặt mua</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  emptyCartText: {
    fontSize: 18,
    color: "gray",
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cartItemPrice: {
    fontSize: 16,
  },
  placeOrderButton: {
    backgroundColor: "#ff0303",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  placeOrderButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CartScreen;
