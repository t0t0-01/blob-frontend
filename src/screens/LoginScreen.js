import React, { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Input, Button, SocialIcon } from "@rneui/themed";
import { AntDesign } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useCustomFont from "../hooks/useCustomFont";
import PasswordInput from "../components/PasswordInput";
import {
  BACKGROUND_COLOR,
  PRIMARY_BLUE,
  INFO_ICON_COLOR,
  INPUT_TEXT_COLOR,
  LABEL_COLOR,
} from "../constants";
import GradientText from "../components/GradientText";
import AuthContext from "../context/AuthContext";

const LoginScreen = ({ navigation }) => {
  const socialMediaTypes = ["facebook", "google", "linkedin"];

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState(false);
  const errorMessage = "Incorrect Email or Password";

  const insets = useSafeAreaInsets();

  const { setUserToken } = useContext(AuthContext);

  const isFontLoaded = useCustomFont();
  if (!isFontLoaded) {
    return null;
  }

  const submitLogin = async () => {
    setUserToken({ id: 1 });

    /*
    try {
      const response = await server.post("/user/sign_in", {
        email: email,
        password: pass,
      });

      if (response.data.success == true) setUserToken(response.data.data);
      else {
        setErr(errorMessage);
      }
    } catch (error) {
      console.log(error);
    }
    */
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          ...styles.masterView,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }}
      >
        <View style={styles.titleView}>
          <GradientText style={styles.titleText}>blob</GradientText>
        </View>

        <View style={styles.signInView}>
          <View style={styles.inputView}>
            <Input
              label="Email"
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder="johndoe@email.com"
              leftIcon={
                <AntDesign name="user" size={24} style={styles.iconStyle} />
              }
              labelStyle={styles.labelStyle}
              inputStyle={styles.inputStyle}
              errorMessage={err ? errorMessage : null}
            />
            <PasswordInput
              value={pass}
              onChangeText={setPass}
              label="Password"
              err={err ? errorMessage : null}
            />

            <Button
              containerStyle={styles.buttonContainer}
              buttonStyle={styles.loginButton}
              title="Login"
              titleStyle={{ fontWeight: "bold" }}
              onPress={submitLogin}
            ></Button>
          </View>

          <View style={styles.alternateView}>
            <Text style={{ color: "#999999" }}>
              ---------- Or Sign in Using ----------
            </Text>

            <View style={styles.socialIconsView}>
              {socialMediaTypes.map((type) => (
                <TouchableOpacity key={type}>
                  <SocialIcon type={type} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.signupView}>
          <Text>
            Don't have an account?
            <TouchableOpacity
              style={{ paddingTop: -5 }}
              onPress={() => navigation.navigate("Signup")}
            >
              <Text style={styles.innerText}> Sign Up</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  masterView: {
    backgroundColor: BACKGROUND_COLOR,
    flex: 1,
    alignItems: "center",
  },

  signInView: {
    flex: 4,
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "space-between",
  },

  inputView: {
    padding: "5%",
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "space-around",
    flex: 4,
  },

  socialIconsView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  loginButton: {
    backgroundColor: PRIMARY_BLUE,
    borderRadius: 30,
    height: 50,
  },

  buttonContainer: {
    width: "95%",
  },

  titleText: {
    fontFamily: "SummerBold",
    fontSize: 130,
  },

  innerText: {
    color: PRIMARY_BLUE,
    fontWeight: "bold",
  },

  alternateView: {
    alignItems: "center",
    alignSelf: "stretch",
    flex: 2,
    justifyContent: "space-around",
  },

  titleView: {
    flex: 2,
    justifyContent: "center",
    marginBottom: "-13%",
  },

  signupView: {
    flex: 1,
  },

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

export default LoginScreen;
