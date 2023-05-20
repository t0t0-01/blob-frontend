import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { AirbnbRating, Button } from "@rneui/themed";
import { CARD_COLOR, LIGHT_TEXT, PRIMARY_BLUE } from "../constants";
import server from "../api/server";

const AddReview = ({
  venue_id,
  customer_id,
  setParentOverlay,
  updateRefresh,
  refresh,
}) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const submitReview = async () => {
    try {
      const response = await server.post("/user/review_venue", {
        venue_id: venue_id,
        customer_id: customer_id,
        rating: rating,
        comment: review,
      });
      setParentOverlay(false);
      updateRefresh(refresh + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.mainView}>
        <View style={{ flex: 1 }}>
          <Text style={styles.titleText}>How was your experience?</Text>
          <AirbnbRating
            selectedColor={PRIMARY_BLUE}
            showRating={false}
            size={30}
            onFinishRating={(nb) => setRating(nb)}
          />
        </View>
        <View style={{ flex: 3, marginTop: 20 }}>
          <TextInput
            placeholder="Tell us more about it..."
            value={review}
            onChangeText={(value) => setReview(value)}
            style={styles.inputView}
            multiline
          />
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Button
            title="Submit"
            buttonStyle={styles.button}
            onPress={submitReview}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
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
});

export default AddReview;
