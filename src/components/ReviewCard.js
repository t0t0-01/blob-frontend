import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { AirbnbRating } from "@rneui/themed";
import {
  CARD_COLOR,
  LIGHT_TEXT,
  PRIMARY_GREEN,
  BAD_REVIEW,
} from "../constants";

import {
  Ionicons,
  AntDesign,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";

const ReviewCard = ({
  rating,
  user,
  review,
  classes = null,
  horizontal = true,
}) => {
  const ICONSIZE = 16;

  return (
    <View style={horizontal ? styles.mainView : styles.mainViewVertical}>
      <View style={styles.headerView}>
        <Text numberOfLines={2} style={styles.user}>
          {user}
        </Text>
        <AirbnbRating
          defaultRating={rating}
          isDisabled
          selectedColor="grey"
          showRating={false}
          size={12}
        />
        {classes ? (
          <View style={styles.classIconsView}>
            <Ionicons
              style={styles.icon}
              name="ios-restaurant-sharp"
              size={ICONSIZE}
              color={
                classes.food == 1
                  ? PRIMARY_GREEN
                  : classes.food == -1
                  ? BAD_REVIEW
                  : LIGHT_TEXT
              }
            />
            <Ionicons
              style={styles.icon}
              name="pricetag"
              size={ICONSIZE}
              color={
                classes.price == 1
                  ? PRIMARY_GREEN
                  : classes.price == -1
                  ? BAD_REVIEW
                  : LIGHT_TEXT
              }
            />
            <AntDesign
              style={styles.icon}
              name="clockcircle"
              size={ICONSIZE - 1}
              color={
                classes.service == 1
                  ? PRIMARY_GREEN
                  : classes.service == -1
                  ? BAD_REVIEW
                  : LIGHT_TEXT
              }
            />
            <FontAwesome5
              style={styles.icon}
              name="laugh-squint"
              size={ICONSIZE}
              color={
                classes.ambiance == 1
                  ? PRIMARY_GREEN
                  : classes.ambiance == -1
                  ? BAD_REVIEW
                  : LIGHT_TEXT
              }
            />
            <MaterialIcons
              style={styles.icon}
              name="place"
              size={ICONSIZE}
              color={
                classes.location == 1
                  ? PRIMARY_GREEN
                  : classes.ambiance == -1
                  ? BAD_REVIEW
                  : LIGHT_TEXT
              }
            />
          </View>
        ) : null}
      </View>

      <Text style={styles.review} numberOfLines={horizontal ? 4 : null}>
        {review}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: CARD_COLOR,
    width: 220,
    height: 150,
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 10,
  },

  mainViewVertical: {
    backgroundColor: CARD_COLOR,
    width: "90%",
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: LIGHT_TEXT,
    alignSelf: "center",
  },

  headerView: {
    flexDirection: "row",
    marginBottom: 15,
    justifyContent: "space-between",
  },

  user: {
    marginRight: 10,
    fontWeight: "bold",
  },

  review: {
    color: LIGHT_TEXT,
  },

  classIconsView: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end",
  },

  icon: {
    marginHorizontal: 2,
  },
});

export default ReviewCard;
