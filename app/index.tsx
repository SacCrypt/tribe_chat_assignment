import HomeScreenCard from "@/components/homeScreenCard";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

const HomeScreen = () => {
  const router = useRouter();

  const handleCardPress = () => {
    router.push("/chatScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to Tribe Chat 👋</Text>
      <HomeScreenCard onPress={handleCardPress} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1f22",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
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
