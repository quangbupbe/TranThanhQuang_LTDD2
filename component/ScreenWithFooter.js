import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import Iconnn from "react-native-vector-icons/AntDesign";

const ScreenWithFooter = ({ setSelectedCategory }) => {
  const navigation = useNavigation();
  const [reloadApp, setReloadApp] = useState(false);
  useEffect(() => {
    if (reloadApp) {
      setReloadApp(false);
    }
  }, [reloadApp]);

  const handleHomePress = () => {
    setReloadApp(true);
    setSelectedCategory(null);
    navigation.navigate("Home");
  };

  const handleMailPress = () => {
    setReloadApp(true);
    setSelectedCategory(null);
    navigation.navigate("Mail");
  };

  const handleLivePress = () => {
    setReloadApp(true);
    setSelectedCategory(null);
    navigation.navigate("Live");
  };

  const handleAdvPress = () => {
    setReloadApp(true);
    setSelectedCategory(null);
    navigation.navigate("Notifications");
  };

  const handleProfilePress = () => {
    navigation.navigate("Profile");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Đây là phần nội dung của màn hình */}
        {/* ... */}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footer1} onPress={handleHomePress}>
          <Icon name="home" size={20} color="#000000" />
          <Text>Trang Chủ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footer1} onPress={handleMailPress}>
          <Iconnn name="mail" size={20} color="#000000" />
          <Text>Mail</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footer1} onPress={handleLivePress}>
          <Icon name="video" size={20} color="#000000" />
          <Text>Live</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footer1} onPress={handleAdvPress}>
          <Icon name="bell" size={20} color="#000000" />
          <Text>Thông Báo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footer1} onPress={handleProfilePress}>
          <Icon name="grid" size={20} color="#000000" />
          <Text>Tôi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    // Kiểu dáng phần nội dung
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "auto",
    // Kiểu dáng phần footer
  },
  footer1: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-center",
  },
});

export default ScreenWithFooter;
