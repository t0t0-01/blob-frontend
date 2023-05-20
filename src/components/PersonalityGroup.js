import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { SvgUri } from "react-native-svg";
import { BACKGROUND_COLOR, PRIMARY_BLUE } from "../constants";
import useCustomFont from "../hooks/useCustomFont";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function SvgRow({ data, startIndex, color, selected, setSelected, group }) {
  const navigation = useNavigation();

  const sliceData = Object.keys(data).slice(startIndex, startIndex + 2);

  const isFontLoaded = useCustomFont();
  if (!isFontLoaded) return null;

  return (
    <View style={styles.personalitiesRow}>
      {sliceData.map((item, index) => {
        try {
          return (
            <View
              style={
                selected == item
                  ? styles.selectedOption
                  : styles.nonSelectedOption
              }
              key={index}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("PersDescription", {
                    pers: item,
                    group: group,
                  })
                }
              >
                <Ionicons
                  name="information-circle-outline"
                  size={24}
                  color={PRIMARY_BLUE}
                  style={{ alignSelf: "flex-end" }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.persView}
                onPress={() =>
                  item == selected ? setSelected(null) : setSelected(item)
                }
                onLongPress={() => console.log("long")}
              >
                <SvgUri
                  key={item}
                  width={175}
                  height={175}
                  uri={data[item].image}
                />

                <Text style={{ ...styles.typeText, color: color }}>
                  {data[item].type}
                </Text>
                <Text style={styles.personalityText}>{item}</Text>
                <Text style={styles.phraseText}>{data[item].phrase}</Text>
              </TouchableOpacity>
            </View>
          );
        } catch (error) {}
      })}
    </View>
  );
}

const PersonalityGroup = ({
  groupTitle,
  data,
  color,
  selected,
  setSelected,
}) => {
  return (
    <View style={styles.mainView}>
      <Text style={{ ...styles.titleText, color: color }}>
        {groupTitle.charAt(0).toUpperCase() + groupTitle.slice(1)}
      </Text>
      <View style={styles.personalitiesView}>
        <SvgRow
          data={data}
          startIndex={0}
          color={color}
          selected={selected}
          setSelected={setSelected}
          group={groupTitle.charAt(0).toUpperCase() + groupTitle.slice(1)}
        />
        <SvgRow
          data={data}
          startIndex={2}
          color={color}
          selected={selected}
          setSelected={setSelected}
          group={groupTitle.charAt(0).toUpperCase() + groupTitle.slice(1)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },

  titleText: {
    fontWeight: "bold",
    fontSize: 70,
    fontFamily: "SummerBold",
  },

  personalitiesView: {
    alignSelf: "stretch",
    marginTop: 10,
  },

  personalitiesRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 5,
  },

  typeText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 2,
  },

  selectedOption: {
    backgroundColor: BACKGROUND_COLOR,
    borderRadius: 15,
    paddingHorizontal: 2,

    justifyContent: "center",
    paddingVertical: 10,
  },

  nonSelectedOption: {
    paddingVertical: 10,
    paddingHorizontal: 2,
    justifyContent: "center",
  },

  persView: {
    alignItems: "center",
    justifyContent: "center",
  },

  personalityText: {
    fontWeight: "bold",
    color: "#4a4a4a",
    marginBottom: 8,
    fontSize: 16,
  },

  phraseText: {
    width: 150,
    textAlign: "center",
    color: "#696969",
  },
});

export default PersonalityGroup;
