import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getProductsByCategory } from "../api/apiService";

const ProductDetail = ({ route }) => {
  const { productid, handleAddToCart } = route.params;
  const navigation = useNavigation();
  const handleAddToCartPress = () => {
    handleAddToCart(productid);
    navigation.goBack();
  };

  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        // Fetch products with the same category
        const categoryProducts = await getProductsByCategory(
          productid.category
        );

        // Exclude the current product from the list
        const filteredProducts = categoryProducts.filter(
          (item) => item.id !== productid.id
        );

        setRelatedProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    fetchRelatedProducts();
  }, [productid]);
  const renderRelatedProductItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleRelatedProductPress(item)}
      style={styles.relatedProductItem}>
      <Image source={{ uri: item.image }} style={styles.relatedProductImage} />
      <Text style={styles.relatedProductName} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.relatedProductPrice}>{`$${item.price}`}</Text>
    </TouchableOpacity>
  );
  const handleRelatedProductPress = (relatedProduct) => {
    // Navigate to the related product detail screen
    navigation.navigate("ProductDetail", {
      productid: relatedProduct,
      handleAddToCart,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={{ uri: productid.image }} style={styles.image} />
        <Text style={styles.productName}>{productid.title}</Text>
        <Text style={styles.productCategory}>{productid.category}</Text>
        <Text style={styles.productPrice}>{`$${productid.price}`}</Text>
        <Text style={styles.productDescription}>{productid.description}</Text>
        <TouchableOpacity
          onPress={handleAddToCartPress}
          style={styles.addToCartButton}>
          <Text style={styles.addToCartButtonText}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.relatedProductsTitle}>Sản phẩm liên quan</Text>
          <FlatList
            data={relatedProducts}
            renderItem={renderRelatedProductItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
          />
        </View>
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
  relatedProductItem: {
    width: 120,
    marginRight: 10,
  },
  relatedProductImage: {
    width: 120,
    height: 150,
    marginBottom: 5,
    borderRadius: 5,
  },
  relatedProductName: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
  },
  relatedProductPrice: {
    fontSize: 14,
    color: "green",
    marginTop: 5,
    textAlign: "center",
  },
  relatedProductsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
});

export default ProductDetail;
