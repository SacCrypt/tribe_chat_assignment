import MessageInput from "@/components/messageInput";
import UserCard from "@/components/UserCard";
import { allStylesObject } from "@/css/allStyles";
import {
  fetchAllParticipants,
  fetchRecentMessages,
} from "@/services/participantService";
import { useMessageStore } from "@/store/useMessageStore";
import { useParticipantStore } from "@/store/useParticipantStore";
import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

const ChatScreen = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const participants = useParticipantStore((s) => s.participants);
  const setParticipants = useParticipantStore((s) => s.setParticipants);

  const messages = useMessageStore((s) => s.messages);
  const setMessages = useMessageStore((s) => s.setMessages);

  useEffect(() => {
    const hydrate = async () => {
      try {
        const [participantList, recentMessages] = await Promise.all([
          fetchAllParticipants(),
          fetchRecentMessages(),
        ]);

        setParticipants(participantList);
        setMessages(recentMessages);
      } catch (err) {
        console.error("Failed to load data", err);
        setError("Failed to load chat data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    hydrate();
  }, []);

  const sortedMessages = useMemo(() => {
    return Object.values(messages).sort(
      (a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()
    );
  }, [messages]);

  const participantsMap = useMemo(() => {
    return participants || {};
  }, [participants]);

  const renderItem = ({ item, index }: any) => {
    const user = participantsMap[item.authorUuid];
    const prevItem = sortedMessages[index + 1];
    const prevUser = prevItem ? participantsMap[prevItem.authorUuid] : null;

    const isSameUserAsPrevious = user?.uuid === prevUser?.uuid;

    return (
      <UserCard
        user={user}
        prevMatch={isSameUserAsPrevious}
        prevObj={prevUser}
        messageObj={item}
      />
    );
  };

  if (loading) {
    return (
      <View
        style={[
          allStylesObject.container,
          { flex: 1, justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[
          allStylesObject.container,
          { flex: 1, justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text style={{ color: "white" }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={[allStylesObject.container, { flex: 1 }]}>
      <FlatList
        data={sortedMessages}
        keyExtractor={(item) => item.uuid}
        inverted
        renderItem={renderItem}
        contentContainerStyle={{ paddingTop: 10 }}
        ListEmptyComponent={
          <Text style={{ color: "#aaa", textAlign: "center", marginTop: 20 }}>
            No messages yet.
          </Text>
        }
      />
      <MessageInput />
    </View>
  );
};

export default ChatScreen;
