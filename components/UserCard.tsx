import { allStylesObject } from "@/css/allStyles";
import React from "react";
import { Dimensions, Image, Text, View } from "react-native";

const screenWidth = Dimensions.get("window").width;
const avatarSize = 48;
const padding = 12;
const indent = avatarSize + padding;

const UserCard = ({ user, prevMatch, prevObj, messageObj }) => {
  const { avatarUrl, name } = user;
  const date = new Date(messageObj.sentAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return prevMatch ? (
    <View style={{ marginLeft: indent }}>
      <Text style={allStylesObject.text}>{messageObj.text}</Text>
    </View>
  ) : (
    <View
      style={{ flexDirection: "row", alignItems: "center", paddingVertical: 2 }}
    >
      <Image
        source={{ uri: avatarUrl }}
        style={{
          width: avatarSize,
          height: avatarSize,
          borderRadius: avatarSize / 2,
          backgroundColor: "#ccc",
        }}
      />
      <View style={{ marginLeft: padding, flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Text
            style={{
              color: "#ffffff",
              marginRight: 8,
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            {name}
          </Text>
          <Text style={{ color: "#aaa" }}>{date}</Text>
        </View>
        <Text style={allStylesObject.text}>{messageObj.text}</Text>
      </View>
    </View>
  );
};

export default UserCard;
