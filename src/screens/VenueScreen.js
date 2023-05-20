import React, { useContext, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Button } from "@rneui/themed";
import { GREY_INFO_ICON_COLOR, PRIMARY_BLUE } from "../constants";
import useCustomFont from "../hooks/useCustomFont";
import { FontAwesome } from "@expo/vector-icons";
import ReviewCard from "../components/ReviewCard";
import DishCard from "../components/DishCard";
import { Overlay } from "@rneui/themed";
import { useState } from "react";
import BookingLogistics from "../components/BookingLogistics";
import AuthContext from "../context/AuthContext";
import server from "../api/server";

const MARGINBETWEEN = 5;

const ListTitle = ({ title, screen = null, type, params = null }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.listTitleView}
      onPress={screen ? () => navigation.navigate(screen, params) : null}
    >
      <Text style={styles.listTitle}>{title}</Text>
      <FontAwesome
        name={"angle-right"}
        size={27}
        color={GREY_INFO_ICON_COLOR}
      />
    </TouchableOpacity>
  );
};

const VenueScreen = ({ route, navigation }) => {
  const { userToken } = useContext(AuthContext);

  const [isVisible, setIsVisible] = useState(false);
  const [venue, setVenue] = useState(null);
  const [dates_and_times, setDatesAndTimes] = useState(null);

  const isFontLoaded = useCustomFont();

  const { id } = route.params;
  console.error = (error) => {
    if (error == `[SyntaxError: Expected "(" or [ \t\r\n] but "3" found.]`)
      return error.apply;
  };

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await server.get("/venues/get_by_id", {
          params: {
            venue_id: id,
          },
        });
        setVenue(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchVenue();
  }, []);

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const dates_response = await server.get("/venues/get_date_time", {
          params: { venue_id: id },
        });
        setDatesAndTimes(dates_response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDates();
  }, [venue]);

  if (!isFontLoaded) {
    return null;
  }

  if (venue) {
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
                uri: "data:image/png;base64," + venue.images[0],
              }}
              style={styles.mainImage}
            />
            <View style={styles.infoView}>
              <Text style={styles.titleName}>{venue.name}</Text>
            </View>
          </View>

          <View style={styles.listView}>
            <ListTitle title="Images" />

            <FlatList
              data={venue.images}
              horizontal
              renderItem={({ item }) => (
                <Image
                  source={{ uri: "data:image/png;base64," + item }}
                  style={styles.image}
                />
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <View style={styles.listView}>
            <ListTitle
              title="Reviews"
              screen={"Reviews"}
              params={{
                image: venue.images[0],
                venue_id: id,
              }}
            />

            <FlatList
              data={venue.reviews}
              horizontal
              renderItem={({ item }) => (
                <ReviewCard
                  user={
                    item.customer.first_name + " " + item.customer.last_name
                  }
                  review={item.comment}
                  rating={item.rating}
                />
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <View style={styles.listView}>
            <ListTitle title="Menu Items" />

            <FlatList
              data={venue.dishes}
              horizontal
              renderItem={({ item }) => <DishCard item={item} />}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </ScrollView>

        <>
          <View style={styles.buttonView}>
            <Button
              title="Place a Reservation"
              buttonStyle={styles.button}
              onPress={() => setIsVisible(true)}
            />
          </View>

          <Overlay
            isVisible={isVisible}
            onBackdropPress={() => setIsVisible(!isVisible)}
            overlayStyle={{ borderRadius: 15, width: "98%" }}
          >
            <BookingLogistics
              dates_and_times={dates_and_times}
              current_week={dates_and_times.current_date}
              user_id={userToken.id}
              venue_id={venue.venue_id}
            />
          </Overlay>
        </>
      </>
    );
  }
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
  },

  image: {
    width: 200,
    height: 150,
    borderRadius: 10,
    marginHorizontal: 10,
  },

  titleName: {
    fontSize: 50,
    color: PRIMARY_BLUE,
    fontFamily: "SummerBold",
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
  noRestaurantText: {
    alignSelf: "center",
  },
});
export default VenueScreen;
