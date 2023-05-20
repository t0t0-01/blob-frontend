import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import server from "../api/server";
import { Button } from "@rneui/themed";
import {
  BACKGROUND_COLOR,
  CARD_COLOR,
  GREY_INFO_ICON_COLOR,
  PRIMARY_BLUE,
} from "../constants";
import { StackActions } from "@react-navigation/native";

const SelectInterestsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [interests, setInterests] = useState(null);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const getListOfInterests = async () => {
      try {
        const response = await server.get("/get_list_of_interests");
        setInterests(response.data.data);
        setSelected(Array(80).fill(false));
      } catch (error) {
        console.log(error);
      }
    };

    getListOfInterests();
  }, []);

  if (!interests) return null;

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        backgroundColor: "white",
      }}
    >
      <ScrollView
        style={{
          ...styles.mainView,
        }}
      >
        <Text style={styles.instructionsText}>
          Please select at least 5 interests so that we can better determine who
          to introduce you to.
        </Text>

        {interests.map((category, index) => (
          <>
            <View key={index} style={styles.mainSectionCard}>
              <Text style={styles.categoryTitle}>{category.title}</Text>
              <View>
                {category.topics.map((topic, i) => (
                  <View key={i}>
                    <Text style={styles.topic}>{topic.title}</Text>

                    <View style={styles.interestsContainer}>
                      {topic.interests.map((interest, index2) => (
                        <TouchableOpacity
                          style={
                            selected[interest.id - 1]
                              ? styles.interestSelected
                              : styles.interest
                          }
                          onPress={() => {
                            setSelected([
                              ...selected.slice(0, interest.id - 1),
                              !selected[interest.id - 1],
                              ...selected.slice(interest.id),
                            ]);
                          }}
                        >
                          <Image
                            source={{
                              uri:
                                "data:image/png;base64," + interest.thumbnail,
                            }}
                            style={styles.icon}
                          />
                          <Text
                            style={
                              selected[interest.id - 1]
                                ? styles.interestTextSelected
                                : styles.interestText
                            }
                          >
                            {interest.title}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.lineView} />
          </>
        ))}
      </ScrollView>
      {selected.reduce((acc, current) => acc + current, 0) >= 5 ? (
        <Button
          title="Sign Up"
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          onPress={() => navigation.dispatch(StackActions.popToTop())}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    paddingHorizontal: 15,
  },

  categoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: PRIMARY_BLUE,
    marginTop: 30,
  },
  topic: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  interest: {
    backgroundColor: CARD_COLOR,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
  },

  interestSelected: {
    backgroundColor: PRIMARY_BLUE,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
  },

  interestText: {
    fontSize: 14,
    marginRight: 4,
  },

  interestTextSelected: {
    fontSize: 14,
    marginRight: 4,
    color: "white",
  },
  icon: {
    width: 16,
    height: 16,
    resizeMode: "contain",
    marginRight: 8,
  },
  button: {
    backgroundColor: PRIMARY_BLUE,
    borderRadius: 30,
    height: 50,
    marginHorizontal: 50,
  },
  instructionsText: {
    color: GREY_INFO_ICON_COLOR,
    marginTop: 20,
  },

  lineView: {
    height: 3,
    backgroundColor: BACKGROUND_COLOR,
    marginHorizontal: -100,
    marginTop: 20,
  },
});

export default SelectInterestsScreen;
