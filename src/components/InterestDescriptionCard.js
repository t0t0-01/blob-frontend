import React from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { CARD_COLOR, LIGHT_TEXT } from "../constants";

const InterestDescriptionCard = ({ item }) => {
  console.log(item.image);
  return (
    <View style={styles.mainView}>
      <View style={styles.imageView}>
        <Image
          style={styles.image}
          source={{ uri: "data:image/png;base64," + item.image }}
        />
      </View>

      <View style={styles.textView}>
        <Text style={styles.interestTitle}>{item.title}</Text>
        <Text style={styles.descriptionText} numberOfLines={5}>
          {item.description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: CARD_COLOR,
    width: 250,
    height: 150,
    borderRadius: 10,
    paddingRight: 15,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  imageView: { flex: 2 },

  textView: { flex: 4 },

  descriptionText: {
    color: LIGHT_TEXT,
  },

  image: {
    width: 60,
    height: 60,
    alignSelf: "center",
    marginHorizontal: 20,
  },

  interestTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginVertical: 5,
  },
});

export default InterestDescriptionCard;
