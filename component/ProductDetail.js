import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const ProductDetail = ({ route }) => {
  const { product } = route.params;
  const navigation = useNavigation();
const addToCart = () => {
  dispatch(addToCart(product));
};
  const handleAddToCart = () => {
    // Thực hiện xử lý thêm sản phẩm vào giỏ hàng
    console.log("Thêm sản phẩm vào giỏ hàng:", product);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={{ uri: product.image }} style={styles.image} />
        <Text style={styles.productName}>{product.title}</Text>
        <Text style={styles.productCategory}>{product.category}</Text>
        <Text style={styles.productPrice}>{`$${product.price}`}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
        <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
          <Text style={styles.addToCartButtonText}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 510,
    marginBottom: 10,
  },
  productName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  productCategory: {
    fontSize: 15,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 18,
    color: "green",
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    textAlign: "center",
  },
  addToCartButton: {
    backgroundColor: "#ff0303",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    bottom: 10,
  },
  addToCartButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ProductDetail;
