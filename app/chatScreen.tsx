import LoadingScreen from "@/components/loadingScreen";
import MessageInput from "@/components/messageInput";
import UserCard from "@/components/UserCard";
import { allStylesObject } from "@/css/allStyles";
import { fetchAllParticipants } from "@/services/participantService";

import {
  fetchOlderMessages,
  fetchRecentMessages,
} from "@/services/messageService";
import { useMessageStore } from "@/store/useMessageStore";
import { useParticipantStore } from "@/store/useParticipantStore";
import React, { useEffect, useMemo, useState } from "react";
import { FlatList, Text, View } from "react-native";

const ChatScreen = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const addMessages = useMessageStore((s) => s.appendMessages);
  const participants = useParticipantStore((s) => s.participants);
  const setParticipants = useParticipantStore((s) => s.setParticipants);
  const messages = useMessageStore((s) => s.messages);
  const setMessages = useMessageStore((s) => s.setMessages);

  const loadOlderMessages = async () => {
    if (loadingMore || !hasMore || sortedMessages.length === 0) return;

    setLoadingMore(true);
    try {
      console.log("-->", sortedMessages);
      const last = sortedMessages[sortedMessages.length - 1];

      const older = await fetchOlderMessages(last.uuid);

      if (older.length === 0) {
        setHasMore(false);
      } else {
        addMessages(older);
      }
    } catch (err) {
      console.error("Failed to load older messages", err);
    } finally {
      setLoadingMore(false);
    }
  };

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

  const renderItem = ({ item, index }) => {
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
      <View style={[allStylesObject.container]}>
        <LoadingScreen loading={loading} />
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
    <View style={[allStylesObject.container]}>
      <FlatList
        onEndReached={loadOlderMessages}
        onEndReachedThreshold={0.1}
        data={sortedMessages}
        keyExtractor={(item) => item.uuid}
        inverted
        renderItem={renderItem}
        ListEmptyComponent={
          <Text
            style={{
              color: "#aaa",
              textAlign: "center",
              marginTop: 20,
            }}
          >
            No messages yet.
          </Text>
        }
        keyboardShouldPersistTaps="handled"
      />

      <MessageInput />
    </View>
  );
};

export default ChatScreen;
