import React, { useState, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { LIGHT_BLUE, PRIMARY_BLUE } from "../constants";
import { useFocusEffect } from "@react-navigation/native";

const MeetingScreen = ({ navigation }) => {
  const [showTab, setShowTab] = useState("none");
  const [showProgress, setShowProgress] = useState(false);

  useFocusEffect(() => {
    if (showTab == "flex")
      navigation.getParent()?.setOptions({
        tabBarStyle: { display: "flex" },
      });
  });

  // Animation Logic

  const progressAnim = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    const anim = Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    });

    anim.start(({ finished }) => {
      if (finished) navigation.navigate("Loading");
    });
  };

  const handlePressOut = () => {
    Animated.timing(progressAnim).stop();

    Animated.timing(progressAnim).reset();
  };

  const progressValue = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  //

  return (
    <View style={styles.mainView}>
      <TouchableOpacity
        onPressIn={() => {
          setShowProgress(true);
          handlePressIn();
        }}
        onPressOut={() => {
          setShowProgress(false);
          handlePressOut();
        }}
        style={styles.image}
      >
        <Image source={require("../../assets/blob.png")} style={styles.image} />
      </TouchableOpacity>

      {showProgress ? (
        <Animated.View
          style={[
            styles.progress,
            {
              transform: [{ rotate: progressValue }],
            },
          ]}
        />
      ) : null}

      {showTab == "none" ? (
        <TouchableOpacity
          onPress={() => {
            showTab === "none" ? setShowTab("flex") : setShowTab("none");
            navigation.getParent()?.setOptions({
              tabBarStyle: { display: "flex" },
            });
          }}
          style={styles.tabButton}
        >
          <Entypo name="chevron-thin-up" size={30} color={PRIMARY_BLUE} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 200,
    width: 230,
    position: "absolute",
  },

  progress: {
    width: 375,
    height: 375,
    borderRadius: 1000,
    borderWidth: 5,
    borderColor: LIGHT_BLUE,
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },

  tabButton: { marginTop: 750 },
});

export default MeetingScreen;
