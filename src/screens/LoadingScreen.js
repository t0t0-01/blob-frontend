import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { GREY_INFO_ICON_COLOR, PRIMARY_BLUE } from "../constants";
import { Button, Overlay } from "@rneui/themed";
import { StackActions } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const LoadingScreen = ({ navigation }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: "none" },
    });

    // Execute a function after a delay of 3 seconds
    setTimeout(function () {
      setShowOverlay(true);
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={PRIMARY_BLUE} />
      <Text style={styles.loadingText}>Finding you a Blob mate...</Text>

      <Overlay
        isVisible={showOverlay}
        overlayStyle={{
          borderRadius: 15,
          width: "90%",
          alignItems: "center",
          paddingHorizontal: 20,
          height: 200,
          justifyContent: "space-evenly",
        }}
      >
        <Text style={styles.successText}>
          I know someone you'll have blast with! Shall I introduce you two?
        </Text>
        <View style={styles.buttonsView}>
          <Button
            title="Proceed"
            buttonStyle={styles.acceptButton}
            onPress={() => {
              navigation.navigate("Chatting");
              setShowOverlay(false);
            }}
            icon={
              <MaterialCommunityIcons
                name="emoticon-excited-outline"
                size={22}
                color="white"
              />
            }
            titleStyle={{ marginLeft: 5 }}
          />
          <Button
            title="Cancel"
            buttonStyle={styles.cancelButton}
            onPress={() => navigation.dispatch(StackActions.popToTop())}
            icon={<Entypo name="block" size={22} color="white" />}
            titleStyle={{ marginLeft: 5 }}
          />
        </View>
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: PRIMARY_BLUE,
    fontWeight: "bold",
  },
  acceptButton: {
    backgroundColor: PRIMARY_BLUE,
    borderRadius: 30,
    height: 50,
    width: 150,
  },

  buttonsView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  cancelButton: {
    backgroundColor: "#f01000",
    borderRadius: 30,
    height: 50,
    width: 150,
  },

  successText: {
    fontSize: 16,
    color: GREY_INFO_ICON_COLOR,
    textAlign: "center",
  },
});

export default LoadingScreen;
