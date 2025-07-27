import HomeScreenCard from "@/components/homeScreenCard";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const router = useRouter();

  const handleCardPress = () => {
    router.navigate("/chatScreen");
  };

  return (
    <SafeAreaView style={styles.safecontainer}>
      <Text style={styles.title}>Welcome to Tribe Chat 👋</Text>
      <HomeScreenCard onPress={handleCardPress} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safecontainer: {
    flex: 1,
    backgroundColor: "#1e1f22",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#ccc",
  },
});
