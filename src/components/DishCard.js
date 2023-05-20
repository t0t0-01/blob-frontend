import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { LIGHT_TEXT } from "../constants";

const DishCard = ({ item }) => {
  return (
    <View style={styles.item}>
      <Image
        source={{
          uri: "data:image/png;base64," + item.picture,
        }}
        style={styles.image}
      />
      <View style={styles.textView}>
        <View style={styles.headerView}>
          <Text style={styles.title}>{item.name}</Text>
          <Text>{`$${item.price}`}</Text>
        </View>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 10,
    borderRadius: 25,
    width: 200,
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: 200,
    height: 150,
    borderRadius: 25,
  },
  textView: {
    margin: 5,
    marginBottom: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    color: LIGHT_TEXT,
  },
});

export default DishCard;
