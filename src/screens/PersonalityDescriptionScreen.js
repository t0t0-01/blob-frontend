import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import { SvgUri } from "react-native-svg";
import { Tab, TabView } from "@rneui/themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { INPUT_TEXT_COLOR, TYPES_COLORS } from "../constants";
import useCustomFont from "../hooks/useCustomFont";
import server from "../api/server";
import WeaknessStrengthCard from "../components/WeaknessStrengthCard";

const SectionText = ({ color, texts, title }) => {
  return (
    <View>
      <Text style={{ ...styles.sectionTitle, color: color }}>{title}</Text>

      {texts.map((item, index) => {
        return (
          <Text style={styles.sectionText} key={index}>
            {item}
            {"\n"}
          </Text>
        );
      })}
    </View>
  );
};

const PersonalityDescriptionScreen = ({ route }) => {
  console.error = (error) => {
    if (error == `[SyntaxError: Expected "(" or [ \t\r\n] but "3" found.]`)
      return error.apply;
  };

  const insets = useSafeAreaInsets();
  const isFontLoaded = useCustomFont();

  const [details, setDetails] = useState(null);
  const [selection, setSelection] = useState(0);

  const { pers, group } = route.params;
  console.log(group);

  useEffect(() => {
    const getPersonalities = async () => {
      try {
        const response = await server.get("/get_personalities_data", {
          params: { personality: pers },
        });
        setDetails(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getPersonalities();
  }, []);

  if (!isFontLoaded) return null;

  if (!details) return null;

  return (
    <View
      style={{
        ...styles.mainView,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <View style={styles.headerView}>
        <SvgUri width={175} height={175} uri={details.data.image} />
        <Text style={{ ...styles.typeText, color: TYPES_COLORS[group] }}>
          {details.data.type}
        </Text>
        <Text style={styles.personalityText}>{pers}</Text>

        <Tab
          value={selection}
          onChange={(e) => setSelection(e)}
          indicatorStyle={{
            backgroundColor: TYPES_COLORS[group],
          }}
          titleStyle={(active) =>
            active
              ? {
                  ...styles.tabTextStyleSelected,
                  color: TYPES_COLORS[group],
                  width: 85,
                }
              : {
                  ...styles.tabTextStyle,
                  color: TYPES_COLORS[group],
                  width: 85,
                }
          }
        >
          <Tab.Item title="Intro" />
          <Tab.Item title="Strength" />

          <Tab.Item
            title="Weaknesses"
            titleStyle={(active) =>
              active
                ? {
                    ...styles.tabTextStyleSelected,
                    color: TYPES_COLORS[group],
                    width: 110,
                  }
                : {
                    ...styles.tabTextStyle,
                    color: TYPES_COLORS[group],
                    width: 110,
                  }
            }
          />
          <Tab.Item title="Friends" />
        </Tab>
      </View>

      <TabView animationType="timing" containerStyle={{ flex: 1 }}>
        <ScrollView>
          {selection == 0 ? (
            <View style={styles.mainIntroView}>
              <View style={styles.textView}>
                {Object.keys(details.intro_sections).map((item, index) => {
                  return (
                    <SectionText
                      color={TYPES_COLORS[group]}
                      texts={details.intro_sections[item]}
                      title={item}
                    />
                  );
                })}
              </View>
              <View style={styles.celebritiesView}>
                <Text
                  style={{ ...styles.sectionTitle, color: TYPES_COLORS[group] }}
                >
                  Celebrities
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <FlatList
                    data={details.celebrities}
                    renderItem={({ item }) => {
                      return (
                        <View style={styles.celebrityCardView}>
                          <Image
                            source={{
                              uri: "data:image/png;base64," + item.avatar,
                            }}
                            style={styles.celebrityImage}
                          />
                          <Text style={styles.sectionText}>{item.name}</Text>
                        </View>
                      );
                    }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
              </View>
            </View>
          ) : selection == 1 ? (
            <FlatList
              data={Object.keys(details.strengths.strengths)}
              renderItem={({ item }) => {
                return (
                  <WeaknessStrengthCard
                    title={item}
                    text={details.strengths.strengths[item]["description"]}
                    image={details.strengths.strengths[item]["image"]}
                  />
                );
              }}
            />
          ) : selection == 2 ? (
            <FlatList
              data={Object.keys(details.strengths.weaknesses)}
              renderItem={({ item }) => {
                return (
                  <WeaknessStrengthCard
                    title={item}
                    text={details.strengths.weaknesses[item]["description"]}
                    titleColor={"#cc0000"}
                    image={details.strengths.weaknesses[item]["image"]}
                  />
                );
              }}
            />
          ) : (
            <View style={styles.mainIntroView}>
              <View style={styles.textView}>
                {Object.keys(details.friendships_sections).map(
                  (item, index) => {
                    return (
                      <SectionText
                        color={TYPES_COLORS[group]}
                        texts={details.friendships_sections[item]}
                        title={item}
                      />
                    );
                  }
                )}
              </View>
            </View>
          )}
        </ScrollView>
      </TabView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },

  headerView: { alignItems: "center", marginTop: 10 },

  typeText: {
    fontSize: 35,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 2,
  },
  personalityText: {
    fontWeight: "bold",
    color: "#4a4a4a",
    marginBottom: 8,
    fontSize: 16,
  },

  mainIntroView: {
    paddingHorizontal: 15,
  },

  textView: {},

  sectionTitle: {
    fontSize: 35,
    fontWeight: "bold",
    fontFamily: "SummerBold",
    marginVertical: 15,
  },

  sectionText: {
    color: INPUT_TEXT_COLOR,
  },

  celebrityImage: {
    height: 110,
    width: 110,
  },

  tabTextStyle: {
    fontSize: 16,
    paddingHorizontal: 0,
    marginHorizontal: 0,
  },

  tabTextStyleSelected: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 0,
    marginHorizontal: 0,
  },

  celebrityCardView: {
    alignItems: "center",
    marginHorizontal: 10,
  },
});

export default PersonalityDescriptionScreen;
