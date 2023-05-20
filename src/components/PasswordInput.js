import React, { useState } from "react";
import { Input } from "@rneui/themed";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";
import {
  INFO_ICON_COLOR,
  INPUT_TEXT_COLOR,
  LABEL_COLOR,
  PRIMARY_BLUE,
} from "../constants";

const PasswordInput = ({ value, onChangeText, label, err }) => {
  const [isSecure, setIsSecure] = useState(true);

  return (
    <Input
      label={label}
      value={value}
      onChangeText={onChangeText}
      placeholder="123456"
      leftIcon={<AntDesign name="key" size={24} style={styles.iconStyle} />}
      labelStyle={styles.labelStyle}
      secureTextEntry={isSecure}
      rightIcon={
        value ? (
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() => setIsSecure(!isSecure)}
          >
            <Entypo
              name={isSecure ? "eye-with-line" : "eye"}
              size={24}
              color={PRIMARY_BLUE}
            />
          </TouchableOpacity>
        ) : null
      }
      inputStyle={styles.inputStyle}
      errorMessage={err}
    />
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    marginRight: 3,
    color: INFO_ICON_COLOR,
  },

  labelStyle: {
    color: LABEL_COLOR,
  },
  inputStyle: {
    color: INPUT_TEXT_COLOR,
  },
});

export default PasswordInput;
