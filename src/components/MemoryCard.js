import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import RatingStars from "./RatingStars";
import { CARD_COLOR, LIGHT_TEXT, PRIMARY_BLUE } from "../constants";

const MemoryCard = ({ item }) => {
  return (
    <View style={styles.mainView}>
      <Image
        source={{
          uri: "data:image/png;base64," + item.venue.images,
        }}
        style={styles.image}
      />
      <View>
        <View style={styles.textView}>
          <View>
            <Text style={styles.title}>{item.venue.name}</Text>

            <Text style={styles.dateText}>{item.booking_date}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    borderRadius: 25,
    backgroundColor: "white",
    paddingBottom: 20,
    marginHorizontal: 15,
    marginVertical: 10,
    width: 200,
    backgroundColor: CARD_COLOR,
  },

  title: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 5,
  },

  image: {
    width: "100%",
    height: 60,
    alignSelf: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginBottom: 5,
  },

  textView: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    marginHorizontal: 7,
  },

  dateText: { color: PRIMARY_BLUE, fontWeight: "bold" },
});

export default MemoryCard;
