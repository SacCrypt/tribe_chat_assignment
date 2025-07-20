import UserCard from "@/components/UserCard";
import { allStylesObject } from "@/css/allStyles";
import { useMessageStore } from "@/store/useMessageStore";
import React, { useEffect } from "react";
import { View } from "react-native";
import {
  fetchAllParticipants,
  fetchRecentMessages,
} from "../services/participantService";
import { useParticipantStore } from "../store/useParticipantStore";

const ChatScreen = () => {
  const participants = useParticipantStore((s) => s.participants);
  const rMessages = useMessageStore((s) => s.messages);
  useEffect(() => {
    const loadParticipants = async () => {
      const participants = await fetchAllParticipants();
      useParticipantStore.getState().setParticipants(participants);
    };

    const loadRecentMessages = async () => {
      const recentMessages = await fetchRecentMessages();
      useMessageStore.getState().setMessages(recentMessages);
    };

    loadParticipants();
    loadRecentMessages();
  }, []);

  let prevUserObject = null;
  return (
    <View style={allStylesObject.container}>
      {Object.values(rMessages).map((message, index) => {
        const userObject = Object.values(participants).find(
          (obj) => obj.uuid != message.authorUuid
        );

        const authorName = userObject?.name;
        if (authorName === prevUserObject?.name) {
          return (
            <UserCard
              key={index}
              user={userObject}
              prevMatch={true}
              prevObj={prevUserObject}
              messageObj={message}
            />
          );
        } else {
          prevUserObject = userObject;
          return (
            <UserCard
              key={index}
              user={userObject}
              prevMatch={false}
              prevObj={null}
              messageObj={message}
            />
          );
        }
      })}
    </View>
  );
};

export default ChatScreen;
