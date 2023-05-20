import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Overlay, Button } from "@rneui/themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  CARD_COLOR,
  GREY_INFO_ICON_COLOR,
  LIGHT_TEXT,
  PRIMARY_BLUE,
} from "../constants";
import server from "../api/server";
import { TouchableOpacity } from "react-native";
import {
  Ionicons,
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { StackActions } from "@react-navigation/native";

const GiveComplimentScreen = ({ navigation }) => {
  const [compliment, setCompliment] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [positive, setPositive] = useState(false);

  const insets = useSafeAreaInsets();

  const submitForSentiment = async () => {
    try {
      const response = await server.post("/sentiment", {
        sentence: compliment,
      });
      setPositive(response.data.prediction == 1);
      console.log(response.data.prediction);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          submitForSentiment();
        }}
      >
        <View
          style={{
            ...styles.mainView,
            paddingLeft: insets.left,
            paddingRight: insets.right,
          }}
        >
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={styles.titleText}>
              What did you enjoy most in this conversation?
            </Text>
            <Text style={styles.instructionText}>
              A well-intentioned compliment can brighten someone's day, boost
              their confidence, and foster a positive atmosphere. Let's create a
              space where everyone feels valued and appreciated!
            </Text>

            <TouchableOpacity
              style={{ alignSelf: "flex-end" }}
              onPress={() => setIsVisible(true)}
            >
              <Text style={styles.examplePromptText}>What can I say?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.overallInputView}>
            <TextInput
              placeholder="Tell us more about it..."
              value={compliment}
              onChangeText={(value) => setCompliment(value)}
              style={styles.inputView}
              onSubmitEditing={submitForSentiment}
              multiline
            />
          </View>
          <View>
            <Button
              title="Submit"
              buttonStyle={styles.button}
              disabled={!positive}
              onPress={() => navigation.dispatch(StackActions.popToTop())}
              disabledStyle={{ backgroundColor: "#d1d1d1" }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <Overlay
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(!isVisible)}
        overlayStyle={{
          borderRadius: 15,
          width: "85%",
          height: 470,
          alignItems: "center",
          padding: 20,
        }}
      >
        <Text style={{ ...styles.instructionText, marginBottom: 15 }}>
          When giving a compliment based on your conversation, it's important to
          be considerate and respectful. Remember, your words can have a
          powerful impact on others, so let's create a positive and uplifting
          environment together!
        </Text>
        <View style={styles.exampleView}>
          <FontAwesome5
            style={styles.icon}
            name="laugh-squint"
            size={21}
            color={PRIMARY_BLUE}
          />
          <Text style={styles.exampleText}>
            You have an amazing sense of humor!
          </Text>
        </View>

        <View style={styles.exampleView}>
          <MaterialCommunityIcons
            style={styles.icon}
            name="head-cog-outline"
            size={22}
            color={PRIMARY_BLUE}
          />
          <Text style={styles.exampleText}>
            I was really inspired by your insightful contributions to our
            conversation :)
          </Text>
        </View>

        <View style={styles.exampleView}>
          <Ionicons
            style={styles.icon}
            name="md-happy-outline"
            size={21}
            color={PRIMARY_BLUE}
          />
          <Text style={styles.exampleText}>
            The positivity you have really brightened my day. Thanks!
          </Text>
        </View>

        <View style={styles.exampleView}>
          <AntDesign
            style={styles.icon}
            name="hearto"
            size={21}
            color={PRIMARY_BLUE}
          />
          <Text style={styles.exampleText}>
            I felt that you were ralling listening and genuinely cared for my
            problem, which means a lot to me.
          </Text>
        </View>

        <View style={styles.exampleView}>
          <MaterialCommunityIcons
            style={styles.icon}
            name="face-man-shimmer-outline"
            size={21}
            color={PRIMARY_BLUE}
          />
          <Text style={styles.exampleText}>
            You have such a stunning and unique sense of style!
          </Text>
        </View>

        <View style={styles.exampleView}>
          <MaterialCommunityIcons
            style={styles.icon}
            name="hand-coin-outline"
            size={21}
            color={PRIMARY_BLUE}
          />
          <Text style={styles.exampleText}>
            There was no need for you to pay for our lunch... Really appreciate
            your generosity, thanks!
          </Text>
        </View>
      </Overlay>
    </>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 40,
    justifyContent: "space-around",
  },

  titleText: {
    fontWeight: "bold",
    color: PRIMARY_BLUE,
    fontSize: 24,
    marginBottom: 10,
  },

  inputView: {
    width: 300,
    flex: 1,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: LIGHT_TEXT,
    backgroundColor: CARD_COLOR,
    padding: 10,
  },

  button: {
    borderRadius: 10,
    backgroundColor: PRIMARY_BLUE,
    width: 150,
  },

  instructionText: {
    color: GREY_INFO_ICON_COLOR,
  },

  examplePromptText: {
    color: GREY_INFO_ICON_COLOR,
    fontWeight: "bold",
    marginTop: 10,
  },

  overallInputView: {
    height: 400,
  },

  exampleView: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 7,
    justifyContent: "space-between",
    width: "100%",
  },

  exampleText: {
    color: GREY_INFO_ICON_COLOR,
    width: 250,
  },

  icon: {},
});

export default GiveComplimentScreen;
