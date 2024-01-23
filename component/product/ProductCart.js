import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import Footer from "../Footer";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
const ProductCart = () => {
  const [cart, setCartItems] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      const fetchCart = async () => {
        try {
          const storedCart = await AsyncStorage.getItem("cart");
          const parsedCart = storedCart ? JSON.parse(storedCart) : [];
          setCartItems(parsedCart);
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu giỏ hàng:", error);
        }
      };
      fetchCart();
    }, []) // [] đảm bảo rằng hàm callback chỉ chạy khi component được mount và unmount
  );
  const navigation = useNavigation();
  const removeItemFromCart = async (itemId) => {
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc muốn xóa sản phẩm khỏi giỏ hàng?",
      [
        {
          text: "Có",
          onPress: async () => {
            try {
              const updatedCart = cart.filter((item) => item.id !== itemId);
              setCartItems(updatedCart);
              await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
            } catch (error) {
              console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng:", error);
            }
          },
        },
        {
          text: "Không",
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };
  const ClearCart = () => {
    setCart([]);
    AsyncStorage.removeItem("cart");
  };
  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItemFromCart(itemId);
    } else {
      const updatedCart = cart.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedCart);
      try {

        await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
      } catch (error) {
        console.error("Lỗi khi cập nhật AsyncStorage:", error);
      }
    }
  };
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.title}</Text>
        <Text style={styles.productPrice}>{`$${item.price}`}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          onPress={() => updateQuantity(item.id, item.quantity - 1)}
          style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity
          onPress={() => updateQuantity(item.id, item.quantity + 1)}
          style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => removeItemFromCart(item.id)}
        style={styles.removeButton}>
        <Text style={styles.removeButtonText}>Xóa</Text>
      </TouchableOpacity>
    </View>
  );
  const handleCheckout = () => {
     navigation.navigate("PaymentScreen");
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {cart.length > 0 ? (
          <FlatList
            data={cart}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.toString()}
          />
        ) : (
          <Text style={styles.emptyText}>Giỏ hàng trống</Text>
        )}
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Tổng tiền:</Text>
          <Text style={styles.totalAmount}>${totalAmount}</Text>
        </View>
        <TouchableOpacity
          onPress={handleCheckout}
          style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Thanh toán</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center", // Thêm dòng này để căn giữa theo chiều ngang
    alignItems: "center", // Thêm dòng này để căn giữa theo chiều dọc
    margin: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cartItem: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 10,
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "cover",
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "blue",
    borderRadius: 4,
    marginRight: 5,
  },
  quantityButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  quantityText: {
    fontSize: 16,
    marginRight: 5,
  },
  removeButton: {
    marginLeft: "auto",
  },
  removeButtonText: {
    color: "red",
    fontWeight: "bold",
  },

  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bottomContainer: {
    borderTopWidth: 1,
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#f5f5f5",
  },
  totalContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 8,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: "blue",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  checkoutButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textTransform: "uppercase",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 20,
    marginTop: 10,
    alignItems: "center", // Thêm dòng này để căn giữa theo chiều dọc
  },
});

export default ProductCart;
