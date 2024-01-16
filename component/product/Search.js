import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Search = ({ searchText, onSearchTextChange, onSearchPress }) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm..."
        value={searchText}
        onChangeText={onSearchTextChange}
      />
      <TouchableOpacity onPress={onSearchPress} style={styles.searchButton}>
        <Icon name="search" size={20} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    margin: 3,
    padding: 1,
    width: "100%",
  },
  searchInput: {
    flex: 1,
  },
  searchButton: {
    backgroundColor: "#000000",
    padding: 8,
    borderRadius: 8,
    marginLeft: 4,
  },
});

export default Search;
