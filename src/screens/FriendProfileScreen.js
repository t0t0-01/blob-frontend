import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import server from "../api/server";
import { PRIMARY_BLUE, GREY_INFO_ICON_COLOR } from "../constants";
import useCustomFont from "../hooks/useCustomFont";
import { SvgUri } from "react-native-svg";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import InterestDescriptionCard from "../components/InterestDescriptionCard";
import AuthContext from "../context/AuthContext";
import MemoryCard from "../components/MemoryCard";

/*
Phone number
*/

const MARGINBETWEEN = 5;

const ListTitle = ({ title, screen = null, params = null }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.listTitleView}
      onPress={screen ? () => navigation.navigate(screen, params) : null}
    >
      <Text style={styles.listTitle}>{title}</Text>
      <FontAwesome name={"angle-right"} size={27} color={PRIMARY_BLUE} />
    </TouchableOpacity>
  );
};

const FriendProfileScreen = ({ route, navigation }) => {
  const { user_id } = route.params;
  const [profile, setProfile] = useState(null);
  const [pastTrips, setPastTrips] = useState(null);
  const { userToken } = useContext(AuthContext);

  const isFontLoaded = useCustomFont();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await server.get("/user/get_by_id", {
          params: {
            user_id: user_id,
          },
        });
        setProfile(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCommonTrips = async () => {
      try {
        const response = await server.get("/user/get_past_common_trips", {
          params: {
            user_id: userToken.id,
            friend_id: user_id,
          },
        });

        setPastTrips(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
    fetchCommonTrips();
  }, []);

  if (!isFontLoaded) return null;

  if (!profile) return null;

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          ...styles.mainView,
        }}
      >
        <View style={styles.titleContainer}>
          <Image
            source={{
              uri: "data:image/png;base64," + profile.picture,
            }}
            style={styles.mainImage}
          />
          <Text style={styles.titleName}>
            {profile.first_name} {profile.last_name}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.infoView}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <SvgUri
                  width={50}
                  height={50}
                  uri={profile.personality.image}
                />
                <View style={styles.personalityTextView}>
                  <Text style={styles.personalityText}>
                    {profile.personality.type}
                  </Text>
                  <Text style={styles.personalityText}>
                    {profile.personality.name}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("PersDescription", {
                      pers: profile.personality.name,
                      group: profile.personality.group,
                    })
                  }
                  style={{ alignSelf: "flex-start" }}
                >
                  <Ionicons
                    name="information-circle-outline"
                    size={15}
                    color={PRIMARY_BLUE}
                    style={{ alignSelf: "flex-end" }}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.infoEntryView}>
              <FontAwesome
                name="phone"
                size={24}
                color={PRIMARY_BLUE}
                style={styles.icon}
              />
              <Text
                onPress={() =>
                  Linking.openURL(
                    `tel:${profile.phone_nb.replace(/-|\s/g, "")}`
                  )
                }
              >
                {profile.phone_nb}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.listView}>
          <ListTitle title="Interests and Hobbies" />

          <FlatList
            data={profile.interests}
            horizontal
            renderItem={({ item }) => <InterestDescriptionCard item={item} />}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={styles.listView}>
          <ListTitle title="Trip Down Memory Lane..." />

          <FlatList
            data={pastTrips}
            horizontal
            renderItem={({ item }) => <MemoryCard item={item} />}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  mainView: {},

  titleContainer: {
    backgroundColor: "white",
    padding: 0,
    marginBottom: MARGINBETWEEN,
  },
  mainImage: {
    width: "100%",
    paddingTop: 350,
  },

  infoView: {
    marginHorizontal: 10,
    paddingVertical: 10,
    marginRight: 30,
  },

  image: {
    width: 200,
    height: 150,
    borderRadius: 10,
    marginHorizontal: 10,
  },

  titleName: {
    fontSize: 55,
    color: PRIMARY_BLUE,
    fontFamily: "SummerBold",
    marginLeft: 15,
  },

  listView: {
    width: "100%",
    backgroundColor: "white",
    marginVertical: MARGINBETWEEN,
    paddingBottom: 20,
  },

  listTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: PRIMARY_BLUE,
  },

  listTitleView: {
    marginHorizontal: 12,
    marginVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  buttonView: {
    backgroundColor: "white",
  },

  button: {
    borderRadius: 10,
    backgroundColor: PRIMARY_BLUE,
    margin: 15,
    height: 45,
  },

  personalityText: {
    color: PRIMARY_BLUE,
    fontSize: 15,
    fontWeight: "bold",
  },

  personalityTextView: {
    alignItems: "center",
  },

  infoEntryView: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },

  icon: {
    marginRight: 4,
  },
});
export default FriendProfileScreen;
