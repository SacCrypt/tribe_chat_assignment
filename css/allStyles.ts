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
    padding: 20,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: "#f08f35",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: 75,
    justifyContent: "center",
    alignItems: "center",
  },

  sendText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  textContainer: {
    width: "100%",
    backgroundColor: "#36393f",
    padding: 8,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  reactionRow: {
    flexDirection: "row",
    marginTop: 6,
  },
  reaction: {
    marginRight: 6,
    fontSize: 16,
    backgroundColor: "#32568f",
    padding: 4,
    borderRadius: 12,
  },
  text: {
    color: "#e0d4d3",
    flexDirection: "row",
    alignItems: "flex-end",
  },
});
