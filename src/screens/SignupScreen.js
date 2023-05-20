import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Input, Button, CheckBox, Icon } from "@rneui/themed";
import PasswordInput from "../components/PasswordInput";
import { Feather } from "@expo/vector-icons";
import {
  BACKGROUND_COLOR,
  PRIMARY_BLUE,
  INFO_ICON_COLOR,
  INPUT_TEXT_COLOR,
  LABEL_COLOR,
} from "../constants";
import PhoneIn from "../components/PhoneIn";
import BDayPicker from "../components/BDayPicker";
import useCustomFont from "../hooks/useCustomFont";
import axios from "axios";

const SignUpScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const isFontLoaded = useCustomFont();

  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [institutionalValid, setInstitutionalValid] = useState(false);
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [phone, setPhone] = useState("");

  const [month, setMonth] = useState("January");
  const [day, setDay] = useState(1);
  const [year, setYear] = useState(2000);

  const months = {
    January: "01",
    February: "02",
    March: "03",
    April: "04",
    May: "05",
    June: "06",
    July: "07",
    August: "08",
    September: "09",
    October: "10",
    November: "11",
    December: "12",
  };

  if (!isFontLoaded) {
    return null;
  }

  const emailCheck = async (email) => {
    try {
      const response = await axios.get(
        "https://emailverification.whoisxmlapi.com/api/v2",
        {
          params: {
            apiKey: "at_NMOWu6g3MBjR2vhEo7jxrJk8kacXg",
            emailAddress: email,
          },
        }
      );

      const format = response.data.formatCheck;
      const freeCheck = response.data.freeCheck;
      const dnsValidity = response.data.dnsCheck;
      const emailCheck = response.data.smtpCheck;

      if (
        format === "true" &&
        dnsValidity === "true" &&
        emailCheck === "true"
      ) {
        setEmailValid(true);

        if (freeCheck === "false") setInstitutionalValid(true);
        else setInstitutionalValid(false);
      } else {
        setEmailValid(false);
        setInstitutionalValid(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          ...styles.mainView,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }}
      >
        <Text style={styles.titleStyle}>Let's Get Started!</Text>

        <View style={styles.formView}>
          <Input
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="john@email.com"
            leftIcon={
              <Feather name="mail" size={24} style={styles.iconStyle} />
            }
            labelStyle={styles.labelStyle}
            inputStyle={styles.inputStyle}
            onEndEditing={() => emailCheck(email)}
          />
          {email && emailValid && !institutionalValid ? (
            <Text style={styles.errorText}>
              Not a valid Institutional Email. ID will be required.
            </Text>
          ) : email && emailValid && institutionalValid ? (
            <Text style={styles.successText}>Valid Institutional Email</Text>
          ) : email ? (
            <Text style={styles.errorText}>Not a valid Email Format</Text>
          ) : null}
          <PasswordInput value={pass} onChangeText={setPass} label="Password" />
          <PasswordInput
            value={confirmPass}
            onChangeText={setConfirmPass}
            label="Confirm Password"
          />
          {(pass != confirmPass) & (pass !== "") & (confirmPass !== "") ? (
            <Text style={styles.errorText}>Passwords do not match!</Text>
          ) : null}
          {
            // !!! Room for improvement; I think PasswordInput was updated to take an err prop!
          }

          <PhoneIn phoneNumber={phone} setPhoneNumber={setPhone} />

          <View style={styles.dateContainer}>
            <BDayPicker
              month={month}
              year={year}
              day={day}
              setMonth={setMonth}
              setYear={setYear}
              setDay={setDay}
            />
          </View>
        </View>

        <Button
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.loginButton}
          title="Next"
          titleStyle={{ fontWeight: "bold" }}
          onPress={() =>
            institutionalValid
              ? navigation.navigate("Photo", {
                  email: email,
                  password: pass,
                  phone_nb: phone,
                  dob: `${year}-${months[month]}-${day}`,
                })
              : navigation.navigate("ID", {
                  email: email,
                  password: pass,
                  phone_nb: phone,
                  dob: `${year}-${months[month]}-${day}`,
                })
          }
          disabled={pass != confirmPass || pass.length == 0 || !emailValid}
          disabledStyle={{ backgroundColor: "#d1d1d1" }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: "stretch",
    justifyContent: "space-around",
    marginTop: 10,
  },

  formView: {
    marginHorizontal: "3%",
    flex: 5,
    justifyContent: "space-between",
    marginVertical: "5%",
  },

  titleStyle: {
    color: PRIMARY_BLUE,
    fontWeight: "bold",
    fontSize: 70,
    fontFamily: "SummerBold",
    alignSelf: "center",
    marginTop: "5%",
    flex: 1,
  },

  loginButton: {
    backgroundColor: PRIMARY_BLUE,
    borderRadius: 30,
    height: 55,
    marginTop: 10,
  },
  buttonContainer: {
    marginHorizontal: "10%",
    flex: 1,
  },

  dateContainer: {
    margin: 10,
  },

  iconStyle: {
    marginRight: 3,
    color: INFO_ICON_COLOR,
  },

  labelStyle: {
    color: LABEL_COLOR,
    fontWeight: "bold",
    fontSize: 16,
  },

  inputStyle: {
    color: INPUT_TEXT_COLOR,
  },

  errorText: {
    color: "red",
    marginHorizontal: 10,
    marginTop: -20,
    marginBottom: 20,
  },
  successText: {
    color: "#00a105",
    marginHorizontal: 10,
    marginTop: -20,
    marginBottom: 20,
  },
});

export default SignUpScreen;
