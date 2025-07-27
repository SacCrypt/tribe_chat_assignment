import { Stack } from "expo-router";
import { Image, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider
      style={{
        flex: 1,
      }}
    >
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#2a2f36",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerTitle: () => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={require("@/assets/images/tribechat.png")}
                  style={{
                    width: 35,
                    height: 35,
                    marginRight: 8,
                    marginLeft: 5,
                  }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: "#ffffff",
                    fontSize: 22,
                    fontWeight: "bold",
                  }}
                >
                  Tribe
                </Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="chatScreen"
          options={{
            headerTitle: "Chat Room",
            headerStyle: {
              backgroundColor: "#2a2f36",
            },
            headerTintColor: "#ffffff",
          }}
        />
        <Stack.Screen options={{}} name="loadingScreen" />
      </Stack>
    </SafeAreaProvider>
  );
}
