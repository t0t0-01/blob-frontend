import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { LIGHT_TEXT, PRIMARY_GREEN } from "../constants";

const WeaknessStrengthCard = ({ title, text, titleColor = "black", image }) => {
  console.log(text);
  return (
    <View style={styles.mainView}>
      <View style={styles.headerView}>
        <Text style={{ ...styles.title, color: titleColor }}>{title}</Text>

        <Image
          source={{
            uri: "data:image/png;base64," + image,
          }}
          style={styles.image}
        />
      </View>

      <View style={styles.lineView} />

      <View style={styles.textView}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    borderRadius: 25,
    backgroundColor: "white",
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },

  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
    marginVertical: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

  image: {
    width: 50,
    height: 50,
  },

  lineView: {
    height: 1,
    backgroundColor: "#EFEFEF",
  },
  textView: { marginVertical: 10 },
  text: {
    color: LIGHT_TEXT,
  },
});

export default WeaknessStrengthCard;

/*

import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { LIGHT_TEXT, TYPES_COLORS } from "../constants";

const WeaknessStrengthCard = ({ title, text }) => {
  return (
    <View style={styles.mainView}>
      <View
        style={{
          ...styles.headerView,
          backgroundColor: TYPES_COLORS["Analysts"],
        }}
      >
        <Text style={styles.attributeText}>{title}</Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          marginTop: 10,
        }}
      >
        <View style={styles.imageView}>
          <Image
            source={{
              uri: "https://th.bing.com/th/id/OIP.XBUdvssr_nrTZQdBjswM_gHaHa?pid=ImgDet&w=84&h=84&c=7&dpr=2.5",
            }}
            style={styles.image}
          />
        </View>

        <View style={styles.textView}>
          <Text style={styles.descriptionText}>{text}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    borderRadius: 25,
    backgroundColor: "white",
    paddingBottom: 15,
    marginHorizontal: 20,
    marginVertical: 10,
  },

  attributeText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    color: "white",
  },

  headerView: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 50,
    justifyContent: "center",
  },

  imageView: {
    flex: 0.75,
    marginRight: 15,
  },

  image: {
    width: 82,
    height: 82,
  },

  descriptionText: {
    color: LIGHT_TEXT,
  },

  textView: {
    flexDirection: "row",
    flex: 2,
  },

  lineView: {
    height: 1,
    backgroundColor: "#EFEFEF",
    marginVertical: 5,
    marginHorizontal: 10,
  },
});

export default WeaknessStrengthCard;
*/
