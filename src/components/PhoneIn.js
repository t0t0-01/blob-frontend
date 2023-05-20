import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { BACKGROUND_COLOR, INPUT_TEXT_COLOR, LABEL_COLOR } from "../constants";

const PhoneIn = ({ phoneNumber, setPhoneNumber }) => {
  const phoneInput = React.useRef(null);

  return (
    <View style={styles.mainView}>
      <Text style={styles.labelStyle}>Phone Number</Text>
      <PhoneInput
        ref={phoneInput}
        defaultValue={phoneNumber}
        containerStyle={styles.phoneContainer}
        textContainerStyle={styles.textInput}
        onChangeFormattedText={(text) => {
          setPhoneNumber(text);
        }}
        defaultCode="LB"
        layout="first"
        textInputStyle={styles.inputStyle}
        codeTextStyle={styles.inputStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "#8e9aa4",
    alignSelf: "stretch",
  },

  phoneContainer: {
    height: 50,
    backgroundColor: "#d9d9d9",
  },

  textInput: {
    paddingVertical: 0,
    backgroundColor: BACKGROUND_COLOR,
  },

  labelStyle: {
    color: "#8e9aa4",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
    color: LABEL_COLOR,
  },

  inputStyle: {
    color: INPUT_TEXT_COLOR,
  },
});

export default PhoneIn;
