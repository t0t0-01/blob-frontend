import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import {
  CARD_COLOR,
  GREY_INFO_ICON_COLOR,
  LIGHT_TEXT,
  PRIMARY_GREEN,
} from "../constants";

const BlobTipCard = ({ item }) => {
  return (
    <View style={styles.mainView}>
      <Image
        source={{
          uri: "data:image/png;base64," + item.image,
        }}
        style={styles.image}
      />
      <View style={styles.textView}>
        <Text style={styles.title}>{item["issue_title "]}</Text>
        <Text style={styles.description}>{item.message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    borderRadius: 25,
    backgroundColor: CARD_COLOR,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: "row",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ed7474",
    marginBottom: 5,
  },

  image: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginRight: 15,
    marginLeft: 5,
  },

  textView: {
    flex: 5,
  },
  description: {
    color: LIGHT_TEXT,
  },
});

export default BlobTipCard;
