// Content.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import Slider from './Slider';
import { useNavigation } from '@react-navigation/native';

const Content = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [visibleSpringItemCount, setVisibleSpringItemCount] = useState(3);
  const [visibleCategoryItemCount, setVisibleCategoryItemCount] = useState(3);

  useEffect(() => {
    // Gọi API để lấy dữ liệu sản phẩm
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const renderProductItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleProductPress(item)}>
      <View style={styles.productItem}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.productName} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.productPrice}>{`$${item.price}`}</Text>
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetail', { product });
  };

  const handleShowMoreSpring = () => {
    setVisibleSpringItemCount(visibleSpringItemCount + 3);
  };

  const handleShowMoreCategory = () => {
    setVisibleCategoryItemCount(visibleCategoryItemCount + 3);
  };

  return (
    <View>
      <Slider />
      <View style={styles.container}>
        <View style={styles.container1}>
          <Text style={styles.sectionTitle}>Spring Collection</Text>
          {visibleSpringItemCount < products.length && (
            <TouchableOpacity onPress={handleShowMoreSpring} style={styles.showMoreButton}>
              <Text style={styles.showMoreButtonText}>Xem thêm</Text>
            </TouchableOpacity>
          )}
        </View>

        <FlatList
          data={products.slice(0, visibleSpringItemCount)}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 3,
  },
  container1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 3,
  },
  sectionTitle: {
    fontSize: 20,
    marginTop: 10,
  },
  image: {
    width: 120,
    height: 150,
  },
  showMoreButton: {
    padding: 10,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    borderRadius: 5,
  },
  showMoreButtonText: {
    fontSize: 16,
  },
  productItem: {
    flex: 1,
    alignItems: "center",
    width: 133,
    margin: 2,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
  },
  productPrice: {
    fontSize: 14,
    color: "green",
    marginTop: 5,
  },
  addToCartButton: {
    backgroundColor: "#ff0303",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  addToCartButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Content;
