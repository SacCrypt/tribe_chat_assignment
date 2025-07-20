import { StyleSheet } from "react-native";

export const allStylesObject = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  avatarContainer: {
    position: "relative",
    marginRight: 12,
  },

  info: {
    flexDirection: "column",
    fontSize: 12,
  },
  username: {
    flexDirection: "row",
    alignItems: "center",
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "#36393f",
    padding: 12,
  },

  text: {
    color: "#e0d4d3",
    flexDirection: "row",
    alignItems: "flex-end",
  },
});
