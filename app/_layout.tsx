import { Stack } from "expo-router";
import { Platform, Text, View } from "react-native";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1e1f22",
          shadowColor: "transparent",
        },
        headerTintColor: "#ffffff",
        headerTitleStyle: {
          fontWeight: "700",
          fontSize: 20,
          letterSpacing: 0.5,
        },
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerStatusBarHeight: Platform.OS === "ios" ? 50 : undefined,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                🔥 Tribe Chat
              </Text>
            </View>
          ),
        }}
      />
    </Stack>
  );
}
