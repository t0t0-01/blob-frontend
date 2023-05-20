import React, { useState, useContext, useEffect } from "react";
import { Text, View, StyleSheet, FlatList, Image } from "react-native";
import { Button, Overlay } from "@rneui/themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ReviewCard from "../components/ReviewCard";
import { PRIMARY_BLUE, PRIMARY_GREEN } from "../constants";
import AddReview from "../components/AddReview";
import AuthContext from "../context/AuthContext";
import server from "../api/server";

const ReviewsScreen = ({ route }) => {
  const insets = useSafeAreaInsets();
  const [isShownOverlay, setIsShownOverlay] = useState(false);
  const { image, venue_id } = route.params;
  const { userToken } = useContext(AuthContext);
  const [reviews, setReviews] = useState(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await server.get("/venues/get_review", {
          params: {
            venue_id: venue_id,
          },
        });

        setReviews(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReviews();
  }, [refresh]);

  if (!reviews) return null;

  return (
    <View
      style={{
        ...styles.mainView,
        paddingBottom: insets.bottom,
        paddingRight: insets.right,
        paddingLeft: insets.left,
      }}
    >
      <Image
        source={{
          uri: "data:image/png;base64," + image,
        }}
        style={styles.mainImage}
      />

      <FlatList
        data={reviews}
        renderItem={({ item }) => (
          <ReviewCard
            rating={item.rating}
            user={item.customer.first_name + " " + item.customer.last_name}
            review={item.comment}
            horizontal={false}
          />
        )}
      />

      <Button
        title="Add Review"
        buttonStyle={styles.button}
        onPress={() => setIsShownOverlay(true)}
      />

      <Overlay
        isVisible={isShownOverlay}
        onBackdropPress={() => setIsShownOverlay(false)}
        overlayStyle={{
          height: "50%",
          width: "90%",
          paddingVertical: 0,
          borderRadius: 15,
        }}
      >
        <AddReview
          customer_id={userToken.id}
          venue_id={venue_id}
          setParentOverlay={setIsShownOverlay}
          updateRefresh={setRefresh}
          refresh={refresh}
        />
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: { flex: 1, backgroundColor: "white", justifyContent: "center" },

  mainImage: {
    height: 250,
    width: "100%",
    alignSelf: "center",
    marginBottom: 10,
  },

  button: {
    borderRadius: 10,
    backgroundColor: PRIMARY_BLUE,
    marginHorizontal: 15,
    height: 45,
    marginTop: 20,
  },
});

export default ReviewsScreen;
