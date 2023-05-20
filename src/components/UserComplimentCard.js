import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { CARD_COLOR, LIGHT_BLUE, LIGHT_TEXT, PRIMARY_BLUE } from "../constants";

import {
  Ionicons,
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const UserComplimentCard = ({ item }) => {
  const ICONSIZE = 20;

  return (
    <View style={styles.mainViewVertical}>
      <View style={styles.imageView}>
        <Image
          style={styles.image}
          source={{ uri: "data:image/png;base64," + item.user.image }}
        />
      </View>
      <View style={styles.textView}>
        <View style={styles.headerView}>
          <Text numberOfLines={2} style={styles.user}>
            {item.user.name}
          </Text>
          <View style={styles.classIconsView}>
            {item.classes.humor == 1 ? (
              <FontAwesome5
                style={styles.icon}
                name="laugh-squint"
                size={ICONSIZE}
                color={PRIMARY_BLUE}
              />
            ) : null}
            {item.classes.intelligence == 1 ? (
              <MaterialCommunityIcons
                style={styles.icon}
                name="head-cog-outline"
                size={ICONSIZE}
                color={PRIMARY_BLUE}
              />
            ) : null}
            {item.classes.generosity == 1 ? (
              <MaterialCommunityIcons
                style={styles.icon}
                name="hand-coin-outline"
                size={ICONSIZE}
                color={PRIMARY_BLUE}
              />
            ) : null}
            {item.classes.positivity == 1 ? (
              <Ionicons
                style={styles.icon}
                name="md-happy-outline"
                size={ICONSIZE}
                color={PRIMARY_BLUE}
              />
            ) : null}
            {item.classes.emotional == 1 ? (
              <AntDesign
                style={styles.icon}
                name="hearto"
                size={ICONSIZE}
                color={PRIMARY_BLUE}
              />
            ) : null}
            {item.classes.conversation == 1 ? (
              <Ionicons
                style={styles.icon}
                name="chatbubble-ellipses-outline"
                size={ICONSIZE}
                color={PRIMARY_BLUE}
              />
            ) : null}
            {item.classes.appearance == 1 ? (
              <MaterialCommunityIcons
                style={styles.icon}
                name="face-man-shimmer-outline"
                size={ICONSIZE}
                color={PRIMARY_BLUE}
              />
            ) : null}
          </View>
        </View>
        <Text style={styles.compliment}>{item.compliment}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainViewVertical: {
    backgroundColor: CARD_COLOR,
    width: "90%",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    paddingVertical: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: LIGHT_TEXT,
    alignSelf: "center",
    flexDirection: "row",
  },

  headerView: {
    marginBottom: 15,
  },

  user: {
    marginRight: 10,
    fontWeight: "bold",
    fontSize: 20,
  },

  compliment: {
    color: LIGHT_TEXT,
    fontSize: 13,
  },

  classIconsView: {
    flexDirection: "row",
  },

  icon: {
    marginHorizontal: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: PRIMARY_BLUE,
  },

  imageView: {
    flex: 3,
    justifyContent: "center",
  },

  textView: {
    flex: 6,
  },
});

export default UserComplimentCard;
