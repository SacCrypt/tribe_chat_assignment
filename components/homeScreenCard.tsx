import { StyleSheet, Text, TouchableOpacity } from "react-native";

const HomeScreenCard = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Text style={styles.cardText}>Go to Chat Room</Text>
  </TouchableOpacity>
);

export default HomeScreenCard;

const styles = StyleSheet.create({
  card: {
    marginTop: 30,
    backgroundColor: "#c77a16",
    padding: 20,
    borderRadius: 16,
  },
  cardText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
