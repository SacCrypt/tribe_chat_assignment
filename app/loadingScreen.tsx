import LottieView from "lottie-react-native";
import React, { useEffect, useRef } from "react";
import { View } from "react-native";

export default function LoadingScreen() {
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    animationRef.current?.play();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <LottieView
        ref={animationRef}
        source={require("@/assets/animations/bonfire.json")}
        autoPlay
        loop
        style={{ width: 150, height: 150 }}
      />
    </View>
  );
}
