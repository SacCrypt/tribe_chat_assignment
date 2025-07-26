import React, { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const UserInfoModal = ({ visible, onClose, user }) => {
  if (!user) return null;
  const [loadError, setLoadError] = useState(false);

  const uri = user.avatarUrl;
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toDateString();
  };
  const imageSource = loadError
    ? uri
    : require("@/assets/images/tribechat.png");

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.backdrop}>
        <View style={styles.modalContent}>
          {/* Close Button */}
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>✕</Text>
          </Pressable>

          {/* Avatar */}
          <Image
            onError={() => setLoadError(true)}
            source={imageSource}
            style={styles.avatar}
          />

          {/* Name and Title */}
          <Text style={styles.username}>{user.name}</Text>
          <Text style={styles.jobTitle}>{user.jobTitle}</Text>

          {/* Bio */}
          <Text style={styles.bio}>{user.bio}</Text>

          {/* Email */}
          <Text style={styles.email}>{user.email}</Text>

          {/* Join Date */}
          <Text style={styles.joined}>
            Joined: {formatDate(user.createdAt)}
          </Text>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.buttonText}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButtonSecondary}>
              <Text style={styles.buttonTextSecondary}>Add Friend</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default UserInfoModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#2f3136",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    elevation: 10,
  },
  closeButton: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 1,
  },
  closeText: {
    fontSize: 22,
    color: "#bbb",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    borderWidth: 2,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 14,
    color: "#b9bbbe",
    marginBottom: 12,
  },
  bio: {
    fontSize: 14,
    color: "#dcddde",
    fontStyle: "italic",
    marginBottom: 12,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  email: {
    fontSize: 13,
    color: "#aaa",
    marginBottom: 6,
  },
  joined: {
    fontSize: 12,
    color: "#777",
    marginBottom: 20,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  actionButton: {
    backgroundColor: "#f08f35",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    flex: 1,
    marginRight: 5,
  },
  actionButtonSecondary: {
    borderWidth: 1,
    borderColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
  buttonTextSecondary: {
    color: "#f08f35",
    fontWeight: "600",
    textAlign: "center",
  },
});
