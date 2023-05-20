import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Button } from "@rneui/themed";
import { Camera, CameraType } from "expo-camera";
import { MaterialIcons, AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { INPUT_TEXT_COLOR, PRIMARY_BLUE } from "../constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useCustomFont from "../hooks/useCustomFont";
import server from "../api/server";

const ScanScreen = ({ navigation, route }) => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [isCameraShown, setIsCameraShown] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const insets = useSafeAreaInsets();

  const isFontLoaded = useCustomFont();
  const cameraRef = useRef(null);

  const { email, pass, phone, dob } = route.params;

  useEffect(() => {
    requestPermission();
  }, []);

  const [type, setType] = useState(CameraType.back);

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const uploadPic = async () => {
    setIsLoading(true);
    cameraRef.current.pausePreview();

    const photo = await cameraRef.current.takePictureAsync({
      base64: true,
    });

    const response = await server.post("/upload_id", {
      image: photo.base64,
    });

    if (response.data.success === true) {
      setIsLoading(false);
      navigation.navigate("Photo", {
        email: email,
        password: pass,
        phone_nb: phone,
        dob: dob,
      });
    }
  };

  if (!isFontLoaded) return null;

  if (isCameraShown) {
    if (!permission) {
      return <View />;
    }
    if (!permission.granted) {
      return <Text>No access to camera</Text>;
    }

    return (
      <View style={styles.container}>
        <Camera style={styles.camera} type={type} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.flipButton}
              onPress={toggleCameraType}
            >
              <MaterialIcons
                name="flip-camera-ios"
                size={30}
                color={PRIMARY_BLUE}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.rectangle} />

          <Button
            title="Submit"
            buttonStyle={styles.loginButton}
            onPress={uploadPic}
          />
        </Camera>
      </View>
    );
  } else {
    return (
      <View
        style={{
          ...styles.mainDisclaimerView,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }}
      >
        <View>
          <Text style={styles.title}>ID Upload</Text>
          <Image
            source={require("../../assets/face_detection.png")}
            style={styles.image}
          />
        </View>

        <View>
          <View>
            <Text style={styles.sectionTitle}>Why do we need this?</Text>

            <View style={styles.descriptionView}>
              <View style={styles.iconView}>
                <AntDesign name="question" size={50} color={PRIMARY_BLUE} />
              </View>

              <Text style={styles.descriptionText}>
                This is part of our efforts to ensure the safety of our users.
                To prevent malicious people from registering on the platform and
                potentially harming others, we require all users to provide an
                institutional email. If that is not possible, users can choose
                to upload a picture of their ID instead.
              </Text>
            </View>
          </View>

          <View>
            <Text style={styles.sectionTitle}>
              What will happen to my data?
            </Text>

            <View style={styles.descriptionView}>
              <View style={styles.iconView}>
                <AntDesign name="Safety" size={50} color={PRIMARY_BLUE} />
              </View>

              <Text style={styles.descriptionText}>
                Your data will be securely stored and encrypted. The information
                on the ID will only be used to cross-check previously submitted
                information. Blob will not access any of your personal data
              </Text>
            </View>
          </View>
        </View>

        <Button
          title="Proceed"
          onPress={() => setIsCameraShown(true)}
          buttonStyle={styles.proceedButton}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },

  camera: {
    flex: 1,
    justifyContent: "space-between",
  },
  rectangle: {
    width: "85%",
    height: "28%",
    backgroundColor: "#c2c2c2",
    borderRadius: 40,
    opacity: 0.4,
    alignSelf: "center",
  },

  loginButton: {
    backgroundColor: PRIMARY_BLUE,
    borderRadius: 30,
    alignSelf: "stretch",
    marginBottom: "15%",
    height: 50,
    marginHorizontal: "10%",
  },

  flipButton: {
    alignSelf: "flex-end",
    marginTop: "15%",
    marginRight: "3%",
  },

  mainDisclaimerView: {
    flex: 1,
    marginHorizontal: 10,
    justifyContent: "space-between",
    marginBottom: 50,
    marginTop: 20,
  },

  title: {
    fontFamily: "SummerBold",
    fontSize: 60,
    color: PRIMARY_BLUE,
    alignSelf: "center",
  },

  image: {
    height: 125,
    width: 125,
    alignSelf: "center",
    marginTop: 20,
  },
  descriptionView: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },

  sectionTitle: {
    color: PRIMARY_BLUE,
    fontWeight: "bold",
    fontSize: 35,
    fontFamily: "SummerBold",
    alignSelf: "flex-start",
    marginHorizontal: 5,
  },

  iconView: {
    marginHorizontal: 15,
  },

  descriptionText: {
    color: INPUT_TEXT_COLOR,
    marginRight: "25%",
  },

  proceedButton: {
    backgroundColor: PRIMARY_BLUE,
    borderRadius: 30,
    height: 50,
    marginHorizontal: "5%",
  },
});

export default ScanScreen;
