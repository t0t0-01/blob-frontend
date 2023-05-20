import { Button } from "@rneui/themed";
import React, { useEffect, useCallback, useState } from "react";
import { StyleSheet, View, Animated, Text } from "react-native";

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
    outputRange: [1, 2],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={[
        styles.ripler,
        {
          position: "absolute",
          height: 60,
          width: 60,
          borderRadius: 120,

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

const App = () => {
  const [currentTime, setTime] = useState(0);
  const [currIndex, setIndex] = useState(0);
  const [data, setData] = useState([39]);

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
    <View style={styles.pageContainer}>
      <View style={{ height: 100, width: 100 }}>
        <AppNew currentVolume={currentTime} />
        <View
          style={{
            height: 60,
            width: 60,
            borderRadius: 60,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(125,244,102,0.9)",
            zIndex: 3,
          }}
        >
          <Text>Messi</Text>
        </View>
      </View>
      <Button
        title="Press me"
        onPress={() => {
          setData([Math.floor(Math.random() * 160) - 160]);
          setIndex(0);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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

export default App;
