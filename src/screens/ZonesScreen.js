import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import VenueCard from "../components/VenueCard";
import useCustomFont from "../hooks/useCustomFont";
import { PRIMARY_BLUE, GREY_INFO_ICON_COLOR, LIGHT_BLUE } from "../constants";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import server from "../api/server";

const ListTitle = ({ title, screen = null }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.listTitleView}
      onPress={screen ? () => navigation.navigate(screen) : null}
    >
      <Text style={styles.listTitle}>{title}</Text>
      <FontAwesome name={"angle-right"} size={27} color={"#91b6ff"} />
    </TouchableOpacity>
  );
};

const TypeSection = ({ title, venue_data }) => {
  return (
    <View style={styles.mainView}>
      <ListTitle title={title} />
      <FlatList
        data={venue_data}
        renderItem={({ item }) => <VenueCard item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const ZonesScreen = () => {
  const insets = useSafeAreaInsets();

  const isFontLoaded = useCustomFont();

  const [venues, setVenues] = useState(null);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await server.get("/venues/get_all");

        setVenues(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchVenues();
  }, []);

  const sections = ["Grab a Bite", "Chill and Thrill", "Go on an Adventure"];

  if (!venues) return null;

  if (!isFontLoaded) {
    return null;
  }

  return (
    <View
      style={{
        ...styles.masterView,
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        paddingBottom: insets.bottom,
      }}
    >
      <Text style={styles.title}>Discover the Community</Text>

      <FlatList
        data={[venues.slice(0, 5), venues.slice(5, 10), venues.slice(10)]}
        renderItem={({ item, index }) => {
          return <TypeSection title={sections[index]} venue_data={item} />;
        }}
        style={{ flex: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  masterView: {
    justifyContent: "center",
    flex: 1,
  },
  title: {
    color: PRIMARY_BLUE,
    fontFamily: "SummerBold",
    alignSelf: "center",
    fontSize: 50,
    marginTop: 15,
    marginBottom: 10,
  },

  mainView: {
    marginVertical: 15,
  },

  listTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#91b6ff",
  },

  listTitleView: {
    marginHorizontal: 12,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default ZonesScreen;
