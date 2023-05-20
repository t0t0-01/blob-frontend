import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Button } from "@rneui/themed";
import { PRIMARY_BLUE } from "../constants";
import { Audio } from "expo-av";
import server from "../api/server";

const AppNew = (props = {}) => {
  const currentVolume = props?.currentVolume ?? 0;

  const animationRef = React.useRef(new Animated.Value(0)).current;

  const startAnimations = useCallback(() => {
    Animated.timing(animationRef, {
      toValue: currentVolume,
      useNativeDriver: true,
      duration: 300,
    }).start();
  }, [animationRef, currentVolume]);

  useEffect(() => {
    startAnimations();
  }, [startAnimations]);

  const polAnim = animationRef.interpolate({
    inputRange: [-160, 0],
    outputRange: [0, 2],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={[
        styles.ripler,
        {
          position: "absolute",
          height: 80,
          width: 80,
          borderRadius: 120,
          zIndex: -3,
          left: -14,

          transform: [
            {
              scale: polAnim,
            },
          ],
        },
      ]}
    ></Animated.View>
  );
};

const App = ({ recording, startRecording, data }) => {
  const [currentTime, setTime] = useState(0);
  const [currIndex, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      //const newIndex = currIndex + 1;
      setTime(data[currIndex]);
      //setIndex(newIndex);
    }, 500);
    console.log(data);
    return () => clearInterval(interval);
  }, [currIndex, data]);

  return (
    <View>
      <View style={{ height: 100, width: 100 }}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            zIndex: 3,
          }}
        >
          <TouchableOpacity
            disabled={recording ? true : false}
            onPress={startRecording}
            style={{ zIndex: 3 }}
          >
            <FontAwesome5
              name="microphone-alt"
              size={80}
              color={PRIMARY_BLUE}
            />
            <AppNew currentVolume={currentTime} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const RecordScreen = ({ navigation }) => {
  const [recording, setRecording] = React.useState();
  const [data, setData] = useState([-160]);

  async function startRecording() {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      recording.setOnRecordingStatusUpdate((status) => {
        setData([status.metering]);
        console.log(status.metering);
      });
      recording.setProgressUpdateInterval(550);
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    console.log("Stopping recording..");
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    setData([-160]);
    uploadFile(uri);
  }

  const uploadFile = async (uri) => {
    const file = {
      uri: uri,
      name: "recording.m4a",
      type: "audio/m4a",
    };

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await server.post("/user/upload_recording", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload successful:", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <View style={styles.container}>
      <App recording={recording} startRecording={startRecording} data={data} />

      <Text
        style={{ ...styles.message, color: recording ? PRIMARY_BLUE : "black" }}
      >
        {recording ? "Recording..." : "Press the mic to start recording"}
      </Text>
      {recording ? (
        <Button
          title="Stop Recording"
          onPress={() => {
            stopRecording();
            navigation.navigate("Compliment");
          }}
          buttonStyle={styles.stopButton}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  message: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
  },

  stopButton: {
    backgroundColor: "#de0043",
    borderRadius: 20,
    marginTop: 50,
    paddingVertical: 15,
    width: 250,
  },

  ripler: {
    backgroundColor: "#9cfffc",
    opacity: 0.7,
    zIndex: 2,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    margin: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RecordScreen;
