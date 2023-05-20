import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const RatingStars = ({ rating }) => {
  return (
    <View style={styles.mainView}>
      <FontAwesome name="star" size={15} color="#e8e8e8" />

      <Text style={styles.text}>{rating}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#a3a3a3",
    alignSelf: "flex-start",
    borderRadius: 5,
    padding: 3,
    paddingHorizontal: 8,
  },
  text: {
    color: "#e8e8e8",
    fontWeight: "bold",
    marginLeft: 3,
  },
});

export default RatingStars;
