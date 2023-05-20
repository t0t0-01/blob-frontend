import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { Tab, TabView } from "@rneui/themed";
import { PRIMARY_BLUE } from "../constants";
import BookingCard from "../components/BookingCard";
import AuthContext from "../context/AuthContext";
import server from "../api/server";

const BookingsScreen = () => {
  const insets = useSafeAreaInsets();
  const [index, setIndex] = useState(0);
  const { userToken } = useContext(AuthContext);

  const [BOOKINGS, setBOOKINGS] = useState(null);

  useFocusEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await server.get("/user/all_booking", {
          params: { user_id: userToken.id },
        });
        setBOOKINGS(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBookings();
  });

  if (!BOOKINGS) return null;

  const PAST = BOOKINGS.passed_bookings;

  const UPCOMING = BOOKINGS.upcoming_bookings;

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
          title="Upcoming"
          titleStyle={(active) =>
            active ? styles.tabTextStyleSelected : styles.tabTextStyle
          }
        />
        <Tab.Item
          title="Past"
          titleStyle={(active) =>
            active ? styles.tabTextStyleSelected : styles.tabTextStyle
          }
        />
      </Tab>

      <TabView animationType="spring" containerStyle={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={index == 0 ? UPCOMING : PAST}
            renderItem={({ item }) => (
              <BookingCard status="Confirmed" item={item} />
            )}
          />
        </View>
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
});

export default BookingsScreen;
