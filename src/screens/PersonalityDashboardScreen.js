import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Tab, TabView, Overlay } from "@rneui/themed";
import { GREY_INFO_ICON_COLOR, PRIMARY_BLUE } from "../constants";
import server from "../api/server";
import AuthContext from "../context/AuthContext";
import BlobTipCard from "../components/BlobTipCard";
import {
  Ionicons,
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import UserComplimentCard from "../components/UserComplimentCard";
import { TouchableOpacity } from "react-native";

const PersonalityDashboardScreen = () => {
  const insets = useSafeAreaInsets();
  const [index, setIndex] = useState(0);
  const [data, setData] = useState(null);
  const { userToken } = useContext(AuthContext);
  const [overlayShown, setOverlayShown] = useState(false);
  const ICONSIZE = 22;

  console.error = (error) => {
    if (error == `[SyntaxError: Expected "(" or [ \t\r\n] but "3" found.]`)
      return error.apply;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await server.get("/user/get_personality_dashboard", {
          params: { user_id: userToken.id },
        });
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (!data) return null;

  const BLOB_TIPS = data.blob_tips;

  const USER_COMPLIMENTS = data.user_compliments;

  return (
    <View
      style={{
        ...styles.mainView,
        paddingTop: insets.top,
        paddingRight: insets.right,
        paddingLeft: insets.left,
      }}
    >
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: PRIMARY_BLUE,
        }}
      >
        <Tab.Item
          title="Blob Tips"
          titleStyle={(active) =>
            active ? styles.tabTextStyleSelected : styles.tabTextStyle
          }
        />
        <Tab.Item
          title="Memorable Traits"
          titleStyle={(active) =>
            active ? styles.tabTextStyleSelected : styles.tabTextStyle
          }
        />
      </Tab>

      <TabView animationType="spring" containerStyle={{ flex: 1 }}>
        <ScrollView containerStyle={{ flex: 1 }}>
          {index == 0 ? (
            <>
              <View style={styles.disclaimerView}>
                <FontAwesome5 name="question" size={40} color={PRIMARY_BLUE} />
                <Text style={styles.disclaimerText}>
                  Below you'll find some things we noticed in your
                  conversations. We believe that working on these would allow
                  you to cultivate more deep, meaningful, and happy
                  relationships.
                </Text>
              </View>
              <View style={styles.lineView} />

              {BLOB_TIPS.map((item) => {
                return <BlobTipCard item={item} />;
              })}
            </>
          ) : (
            <>
              <View style={styles.disclaimerView}>
                <FontAwesome5 name="question" size={40} color={PRIMARY_BLUE} />
                <Text style={styles.disclaimerText}>
                  Curious to know what made you stand out in conversations? Read
                  on and celebrate your strengths!
                </Text>
              </View>
              <View style={styles.lineView} />

              <TouchableOpacity onPress={() => setOverlayShown(true)}>
                <Text style={styles.iconDisclaimerText}>
                  What do the icons mean?
                </Text>
              </TouchableOpacity>
              {USER_COMPLIMENTS.map((item) => {
                return <UserComplimentCard item={item} />;
              })}
            </>
          )}
        </ScrollView>

        <Overlay
          isVisible={overlayShown}
          onBackdropPress={() => setOverlayShown(!overlayShown)}
          overlayStyle={{
            borderRadius: 15,
            width: "80%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={styles.overlayText}>
            The icons represent what we believe the compliment is about. Refer
            to them to help you indentify your strengths.
          </Text>
          <View style={styles.overallIconView}>
            <View style={styles.classIconsViewRow}>
              <View style={styles.traitView}>
                <FontAwesome5
                  style={styles.icon}
                  name="laugh-squint"
                  size={21}
                  color={PRIMARY_BLUE}
                />
                <Text style={styles.iconName}>Humor</Text>
              </View>
              <View style={styles.traitView}>
                <MaterialCommunityIcons
                  style={styles.icon}
                  name="head-cog-outline"
                  size={ICONSIZE}
                  color={PRIMARY_BLUE}
                />
                <Text style={styles.iconName}>Intelligence</Text>
              </View>
            </View>
            <View style={styles.classIconsViewRow}>
              <View style={styles.traitView}>
                <Ionicons
                  style={styles.icon}
                  name="md-happy-outline"
                  size={ICONSIZE}
                  color={PRIMARY_BLUE}
                />
                <Text style={styles.iconName}>Positivity</Text>
              </View>

              <View style={styles.traitView}>
                <AntDesign
                  style={styles.icon}
                  name="hearto"
                  size={ICONSIZE}
                  color={PRIMARY_BLUE}
                />
                <Text style={styles.iconName}>Empathy</Text>
              </View>
            </View>

            <View style={styles.classIconsViewRow}>
              <View style={styles.traitView}>
                <MaterialCommunityIcons
                  style={styles.icon}
                  name="face-man-shimmer-outline"
                  size={ICONSIZE}
                  color={PRIMARY_BLUE}
                />
                <Text style={{ ...styles.iconName }}>Appearance</Text>
              </View>

              <View style={styles.traitView}>
                <MaterialCommunityIcons
                  style={styles.icon}
                  name="hand-coin-outline"
                  size={ICONSIZE}
                  color={PRIMARY_BLUE}
                />
                <Text style={styles.iconName}>Generosity</Text>
              </View>
            </View>

            <View
              style={{
                ...styles.classIconsViewRow,
                justifyContent: "flex-start",
              }}
            >
              <View style={styles.traitView}>
                <Ionicons
                  style={styles.icon}
                  name="chatbubble-ellipses-outline"
                  size={ICONSIZE}
                  color={PRIMARY_BLUE}
                />
                <Text style={styles.iconName}>Conversation</Text>
              </View>
            </View>
          </View>
        </Overlay>
      </TabView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: { flex: 1 },

  tabTextStyle: {
    fontSize: 17,
  },

  tabTextStyleSelected: {
    fontSize: 17,
    color: PRIMARY_BLUE,
    fontWeight: "bold",
  },

  disclaimerText: {
    marginVertical: 10,
    marginHorizontal: 20,
    color: "#575757",
    fontSize: 15,
  },

  disclaimerView: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  lineView: {
    height: 1,
    backgroundColor: "#bababa",
    marginHorizontal: 30,
    marginVertical: 10,
  },

  classIconsViewRow: {
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
    marginVertical: 10,
    justifyContent: "space-between",
    width: 300,
  },

  iconName: {
    color: GREY_INFO_ICON_COLOR,
  },

  overallIconView: {
    marginVertical: 10,
  },

  iconDisclaimerText: {
    alignSelf: "flex-end",
    color: PRIMARY_BLUE,
    fontWeight: "bold",
    marginVertical: 5,
    marginHorizontal: 20,
  },

  overlayText: {
    marginTop: 15,
    marginHorizontal: 8,

    alignSelf: "center",
    color: GREY_INFO_ICON_COLOR,
  },

  icon: { marginRight: 8 },

  traitView: {
    flexDirection: "row",
    marginRight: 10,
    width: 120,
  },
});

export default PersonalityDashboardScreen;
