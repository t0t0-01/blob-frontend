import { useState, useEffect } from "react";
import * as Font from "expo-font";

const useCustomFont = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        SummerBold: require("../../assets/fonts/summer-font-bold.ttf"),
        SummerLight: require("../../assets/fonts/Summer-Font-Light.ttf"),
      });
      setFontLoaded(true);
    };

    loadFont();
  }, []);

  return fontLoaded;
};

export default useCustomFont;
