import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import RatingStars from "./RatingStars";
import { LIGHT_TEXT, PRIMARY_BLUE } from "../constants";

const BookingCard = ({ item, status, type }) => {
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
            {
              <Text>
                {item.venue.category.map((element, index, arr) => {
                  if (index != arr.length - 1) {
                    return element + ", ";
                  } else {
                    return element;
                  }
                })}
              </Text>
            }
          </View>
          {
            <View style={styles.ratingView}>
              <RatingStars rating={item.venue.review_rate} />
            </View>
          }
        </View>
        <View style={styles.lineView} />
        <View style={styles.timeView}>
          <Text style={styles.timeText}>{item.booking_date}</Text>
          <Text style={styles.timeText}>{status}</Text>
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
    marginHorizontal: 20,
    marginVertical: 10,
  },

  mainViewStaff: {
    borderRadius: 25,
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: "row",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

  image: {
    width: "100%",
    height: 150,
    alignSelf: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginBottom: 10,
  },

  imageStaff: {
    width: "40%",
    height: 130,
    borderRadius: 25,
    alignSelf: "center",
    marginRight: 5,
  },

  textView: {
    marginHorizontal: "5%",
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },

  textViewStaff: {
    marginHorizontal: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  ratingView: {
    marginTop: 7,
  },

  lineView: {
    height: 1,
    backgroundColor: "#EFEFEF",
    margin: 15,
  },

  lineViewStaff: {
    height: 1,
    backgroundColor: "#EFEFEF",
    marginVertical: 5,
    marginHorizontal: 10,
  },

  timeView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: "5%",
  },

  timeViewStaff: {
    marginHorizontal: "5%",
    flex: 1,
    justifyContent: "space-around",
  },

  timeText: {
    fontWeight: "bold",
    fontSize: 16,
    color: PRIMARY_BLUE,
  },

  tableText: {
    color: LIGHT_TEXT,
  },
});

export default BookingCard;
