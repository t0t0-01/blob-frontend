import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BACKGROUND_COLOR,
  CARD_COLOR,
  GREY_INFO_ICON_COLOR,
  LIGHT_BLUE,
  PRIMARY_BLUE,
} from "../constants";
import { Feather } from "@expo/vector-icons";

import { Button } from "@rneui/themed";

const MeetingChattingScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  const insets = useSafeAreaInsets();

  const handleSend = () => {
    if (inputText.trim() !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: inputText.trim(), isUser: true },
      ]);
      setInputText("");
    }
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.isUser ? styles.userBubble : styles.otherBubble,
      ]}
    >
      <Text style={styles.messageText}>{item.content}</Text>
    </View>
  );

  return (
    <View style={{ backgroundColor: BACKGROUND_COLOR, flex: 1 }}>
      <KeyboardAvoidingView
        style={{
          ...styles.container,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingRight: insets.right,
          paddingLeft: insets.left,
        }}
        behavior="padding"
      >
        <Text style={styles.instructions}>
          Chat with your friend to co-ordinate your meetup point!
        </Text>
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item, index) => index.toString()}
        />

        {messages.length >= 3 ? (
          <Button
            title="Proceed"
            buttonStyle={styles.button}
            onPress={() => navigation.navigate("Record")}
          />
        ) : null}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={(text) => setInputText(text)}
            placeholder="Type a message"
          />

          <TouchableOpacity onPress={handleSend}>
            <Feather name="send" size={28} color={PRIMARY_BLUE} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: BACKGROUND_COLOR,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 20,
  },
  textInput: {
    flex: 1,
    height: 50,
    marginHorizontal: 15,
    paddingHorizontal: 15,
    borderRadius: 30,
    backgroundColor: CARD_COLOR,
  },
  messageBubble: {
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 20,
    marginHorizontal: 15,
    marginVertical: 5,
    maxWidth: "70%",
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: PRIMARY_BLUE,
  },
  otherBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#F0F0F0",
  },
  messageText: {
    fontSize: 16,
    color: "white",
  },

  instructions: {
    marginHorizontal: 15,
    color: GREY_INFO_ICON_COLOR,
    marginBottom: 10,
  },

  button: {
    backgroundColor: LIGHT_BLUE,
    height: 40,
    borderRadius: 25,
    marginBottom: 20,
    width: 200,
    alignSelf: "center",
  },
});

export default MeetingChattingScreen;
