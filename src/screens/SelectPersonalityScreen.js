import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import { SvgUri } from "react-native-svg";
import PersonalityGroup from "../components/PersonalityGroup";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useCustomFont from "../hooks/useCustomFont";
import { Button } from "@rneui/themed";
import { PRIMARY_BLUE } from "../constants";
import { FontAwesome5 } from "@expo/vector-icons";
import { StackActions } from "@react-navigation/native";

const SelectPersonalityScreen = ({ navigation }) => {
  const DATA = {
    analysts: {
      INTJ: {
        image:
          "https://www.16personalities.com/static/images/personality-types/avatars/intj-architect.svg?v=2",
        phrase:
          "Imaginative and strategic thinkers, with a plan for everything.",
        animation:
          "https://www.16personalities.com/static/animations/avatars/defaults/architect.json",
        type: "Architect",
      },
      INTP: {
        image:
          "https://www.16personalities.com/static/images/personality-types/avatars/intp-logician.svg?v=2",
        phrase:
          "Innovative inventors with an unquenchable thirst for knowledge.",
        animation:
          "https://www.16personalities.com/static/animations/avatars/defaults/logician.json",
        type: "Logician",
      },
      ENTJ: {
        image:
          "https://www.16personalities.com/static/images/personality-types/avatars/entj-commander.svg?v=2",
        phrase:
          "Bold, imaginative and strong-willed leaders, always finding a way \u2013 or making one.",
        animation:
          "https://www.16personalities.com/static/animations/avatars/defaults/commander.json",
        type: "Commander",
      },
      ENTP: {
        image:
          "https://www.16personalities.com/static/images/personality-types/avatars/entp-debater.svg?v=2",
        phrase:
          "Smart and curious thinkers who cannot resist an intellectual challenge.",
        animation:
          "https://www.16personalities.com/static/animations/avatars/defaults/debater.json",
        type: "Debater",
      },
    },
    diplomats: {
      INFJ: {
        image:
          "https://www.16personalities.com/static/images/personality-types/avatars/infj-advocate.svg?v=2",
        phrase:
          "Quiet and mystical, yet very inspiring and tireless idealists.",
        animation:
          "https://www.16personalities.com/static/animations/avatars/defaults/advocate.json",
        type: "Advocate",
      },
      INFP: {
        image:
          "https://www.16personalities.com/static/images/personality-types/avatars/infp-mediator.svg?v=2",
        phrase:
          "Poetic, kind and altruistic people, always eager to help a good cause.",
        animation:
          "https://www.16personalities.com/static/animations/avatars/defaults/mediator.json",
        type: "Mediator",
      },
      ENFJ: {
        image:
          "https://www.16personalities.com/static/images/personality-types/avatars/enfj-protagonist.svg?v=2",
        phrase:
          "Charismatic and inspiring leaders, able to mesmerize their listeners.",
        animation:
          "https://www.16personalities.com/static/animations/avatars/defaults/protagonist.json",
        type: "Protagonist",
      },
      ENFP: {
        image:
          "https://www.16personalities.com/static/images/personality-types/avatars/enfp-campaigner.svg?v=2",
        phrase:
          "Enthusiastic, creative and sociable free spirits, who can always find a reason to smile.",
        animation:
          "https://www.16personalities.com/static/animations/avatars/defaults/campaigner.json",
        type: "Campaigner",
      },
    },
    sentinels: {
      ISTJ: {
        image:
          "https://www.16personalities.com/static/images/personality-types/avatars/istj-logistician.svg?v=2",
        phrase:
          "Practical and fact-minded individuals, whose reliability cannot be doubted.",
        animation:
          "https://www.16personalities.com/static/animations/avatars/defaults/logistician.json",
        type: "Logistician",
      },
      ISFJ: {
        image:
          "https://www.16personalities.com/static/images/personality-types/avatars/isfj-defender.svg?v=2",
        phrase:
          "Very dedicated and warm protectors, always ready to defend their loved ones.",
        animation:
          "https://www.16personalities.com/static/animations/avatars/defaults/defender.json",
        type: "Defender",
      },
      ESTJ: {
        image:
          "https://www.16personalities.com/static/images/personality-types/avatars/estj-executive.svg?v=2",
        phrase:
          "Excellent administrators, unsurpassed at managing things \u2013 or people.",
        animation:
          "https://www.16personalities.com/static/animations/avatars/defaults/executive.json",
        type: "Executive",
      },
      ESFJ: {
        image:
          "https://www.16personalities.com/static/images/personality-types/avatars/esfj-consul.svg?v=2",
        phrase:
          "Extraordinarily caring, social and popular people, always eager to help.",
        animation:
          "https://www.16personalities.com/static/animations/avatars/defaults/consul.json",
        type: "Consul",
      },
    },
    explorers: {
      ISTP: {
        image:
          "https://www.16personalities.com/static/images/personality-types/avatars/istp-virtuoso.svg?v=2",
        phrase:
          "Bold and practical experimenters, masters of all kinds of tools.",
        animation:
          "https://www.16personalities.com/static/animations/avatars/defaults/virtuoso.json",
        type: "Virtuoso",
      },
      ISFP: {
        image:
          "https://www.16personalities.com/static/images/personality-types/avatars/isfp-adventurer.svg?v=2",
        phrase:
          "Flexible and charming artists, always ready to explore and experience something new.",
        animation:
          "https://www.16personalities.com/static/animations/avatars/defaults/adventurer.json",
        type: "Adventurer",
      },
      ESTP: {
        image:
          "https://www.16personalities.com/static/images/personality-types/avatars/estp-entrepreneur.svg?v=2",
        phrase:
          "Smart, energetic and very perceptive people, who truly enjoy living on the edge.",
        animation:
          "https://www.16personalities.com/static/animations/avatars/defaults/entrepreneur.json",
        type: "Entrepreneur",
      },
      ESFP: {
        image:
          "https://www.16personalities.com/static/images/personality-types/avatars/esfp-entertainer.svg?v=2",
        phrase:
          "Spontaneous, energetic and enthusiastic people \u2013 life is never boring around them.",
        animation:
          "https://www.16personalities.com/static/animations/avatars/defaults/entertainer.json",
        type: "Entertainer",
      },
    },
  };
  const COLORS = ["#847898", "#a0c46c", "#78cccc", "#e4c728"];
  const insets = useSafeAreaInsets();
  const [selectedPersonality, setSelectedPersonality] = useState(null);

  const isFontLoaded = useCustomFont();
  if (!isFontLoaded) return null;

  console.error = (error) => {
    if (error == `[SyntaxError: Expected "(" or [ \t\r\n] but "3" found.]`)
      return error.apply;
  };

  return (
    <View
      style={{
        ...styles.mainView,
        paddingTop: insets.top,
        paddingBottom: 20,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false} directionalLockEnabled>
        {Object.keys(DATA).map((val, index) => {
          return (
            <View key={index}>
              <PersonalityGroup
                data={DATA[val]}
                groupTitle={val}
                color={COLORS[index]}
                selected={selectedPersonality}
                setSelected={setSelectedPersonality}
              />
            </View>
          );
        })}
      </ScrollView>

      {selectedPersonality ? (
        <Button
          title="Next"
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          onPress={() => navigation.navigate("Interests")}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: { flex: 1, alignItems: "center" },

  button: {
    backgroundColor: PRIMARY_BLUE,
    borderRadius: 30,
    height: 50,
  },

  buttonContainer: {
    alignSelf: "stretch",
    marginHorizontal: "20%",
  },

  disclaimerText: {
    marginVertical: 10,

    color: "#575757",
    fontSize: 15,
  },

  disclaimerView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 50,
  },
});

export default SelectPersonalityScreen;
