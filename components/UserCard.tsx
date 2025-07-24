import { allStylesObject } from "@/css/allStyles";
import React from "react";
import { Dimensions, Image, Text, View } from "react-native";

const screenWidth = Dimensions.get("window").width;
const avatarSize = 48;
const padding = 12;
const indent = avatarSize + padding;

const UserCard = ({ user, prevMatch, prevObj, messageObj }) => {
  if (!user) return null;

  const { avatarUrl, name } = user;

  const date = new Date(messageObj.sentAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const EditedLabel = () =>
    messageObj.sentAt !== messageObj.updatedAt && (
      <Text
        style={{
          color: "orange",
          fontStyle: "italic",
          fontSize: 12,
          marginTop: 4,
        }}
      >
        (edited)
      </Text>
    );

  const Reactions = () =>
    messageObj.reactions?.length > 0 && (
      <View style={allStylesObject.reactionRow}>
        {messageObj.reactions.map((reactionObj, index) => (
          <Text key={index} style={allStylesObject.reaction}>
            {reactionObj.value} <Text style={{ color: "white" }}>1</Text>
          </Text>
        ))}
      </View>
    );

  const Attachment = () =>
    messageObj.attachments?.url && (
      <Image
        source={{ uri: messageObj.attachments.url }}
        style={{
          width: 200,
          height: 200,
          borderRadius: 8,
          marginTop: 8,
          backgroundColor: "#ccc",
        }}
        resizeMode="cover"
      />
    );

  return prevMatch ? (
    <View style={{ marginLeft: indent }}>
      <View>
        <Text style={allStylesObject.text}>{messageObj.text}</Text>
        <EditedLabel />
        <Attachment />
        <Reactions />
      </View>
    </View>
  ) : (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        paddingVertical: 2,
      }}
    >
      <Image
        source={
          avatarUrl
            ? { uri: avatarUrl }
            : require("../assets/images/default.jpg")
        }
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
            marginBottom: 2,
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
          <Text style={{ color: "#aaa", fontSize: 12 }}>{date}</Text>
        </View>

        <Text style={allStylesObject.text}>{messageObj.text}</Text>
        <EditedLabel />
        <Attachment />
        <Reactions />
      </View>
    </View>
  );
};

export default UserCard;
