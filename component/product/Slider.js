import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const Slider = () => {
  const slides = [
    {
      id: 1,
      imageUrl: require("../../assets/slider/slider_1.webp"),
      text: "Slide 1",
    },
    { id: 2, imageUrl: require('../../assets/slider/slider_2.webp'), text: 'Slide 2' },
    // Add more slides here with corresponding image paths
  ];

  const renderItem = ({ item }) => (
      <Image source={item.imageUrl} style={styles.image} />
  );

  return (
    <View style={styles.sliderContainer}>
      <Carousel
        data={slides}
        renderItem={renderItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width} // Adjusted width to leave some margin
        sliderHeight={200} // Adjusted height
        layout={'default'}
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
    sliderContainer: {
        flex:1,
        justifyContent: 'flex-start',
        width: '100%',
        height: 136,
        backgroundColor: '#e0e0e0',
        marginTop:2,
      },
      slide: {
        width: Dimensions.get('window').width-20, // Adjusted width to match the screen width
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        overflow: 'hidden',
      },
      image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
      },
});

export default Slider;
