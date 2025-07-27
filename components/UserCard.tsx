import { allStylesObject } from "@/css/allStyles";
import React, { useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { TMessageJSON } from "../types/message";
import { User } from "../types/user";

const screenWidth = Dimensions.get("window").width;
const avatarSize = 35;
const padding = 12;
const indent = avatarSize + padding;

type UserCardProps = {
  user: User;
  prevMatch: boolean;
  messageObj: TMessageJSON;
  setIsModalVisible: (visible: boolean) => void;
  setModalData: (data: User) => void;
  errorImages: Set<String>;
};

const UserCard = ({
  user: User,
  prevMatch,
  messageObj,
  setIsModalVisible,
  setModalData,
  errorImages,
}: UserCardProps) => {
  if (!User) return null;

  const [loadError, setLoadError] = useState(false);
  const { avatarUrl, name } = User;

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
      <TouchableOpacity
        onPress={() => {
          setIsModalVisible(true);
          setModalData(User);
        }}
      >
        <Image
          source={
            errorImages.has(avatarUrl)
              ? require("@/assets/images/tribechat.png")
              : { uri: avatarUrl }
          }
          style={{
            width: avatarSize,
            height: avatarSize,
            borderRadius: avatarSize / 2,
          }}
        />
      </TouchableOpacity>

      <View style={{ marginLeft: padding, flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
            marginBottom: 2,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setIsModalVisible(true);
              setModalData(User);
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
          </TouchableOpacity>

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
