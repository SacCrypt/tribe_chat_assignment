import MessageInput from "@/components/messageInput";
import UserCard from "@/components/UserCard";
import { allStylesObject } from "@/css/allStyles";
import {
  fetchOlderMessages,
  fetchRecentMessages,
} from "@/services/messageService";
import { fetchAllParticipants } from "@/services/participantService";
import { useMessageStore } from "@/store/useMessageStore";
import { useParticipantStore } from "@/store/useParticipantStore";
import { TMessageJSON } from "@/types/message";
//import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
import UserInfoModal from "@/components/userModal";
import LoadingScreen from "./loadingScreen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ChatScreen = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const [loadingMore, setLoadingMore] = useState(false);
  const [errorImages, setErrorImages] = useState(new Set<string>());
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
    if (!participants || typeof participants !== "object") {
      console.warn("No participants or invalid format");
      return;
    }

    const urls = Object.values(participants)
      .map((p) => p?.avatarUrl)
      .filter((url) => typeof url === "string" && url.startsWith("http"));

    urls.forEach((uri) => {
      Image.prefetch(uri)
        .then((success) => {})
        .catch((err) => {
          setErrorImages((prevSet) => {
            const newSet = new Set(prevSet);
            newSet.add(uri);
            return newSet;
          });
        });
    });
  }, [participants]);

  useEffect(() => {
    const hydrate = async () => {
      try {
        setLoading(true);
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

  //const navigation = useNavigation();
  // const insets = useSafeAreaInsets();
  // useEffect(() => {
  //   if (loading) {
  //     navigation.setOptions({
  //       headerShown: false,
  //     });
  //   } else {
  //     navigation.setOptions({
  //       headerShown: true,
  //     });
  //   }
  // }, [navigation, loading]);
  const sortedMessages = useMemo(() => {
    return Object.values(messages).sort(
      (a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()
    );
  }, [messages]);

  const participantsMap = useMemo(() => {
    return participants || {};
  }, [participants]);

  const renderItem = ({
    item,
    index,
  }: {
    item: TMessageJSON;
    index: number;
  }) => {
    const user = participantsMap[item.authorUuid];
    const prevItem = sortedMessages[index + 1];
    const prevUser = prevItem ? participantsMap[prevItem.authorUuid] : null;
    const isSameUserAsPrevious = user?.uuid === prevUser?.uuid;
    return (
      <UserCard
        user={user}
        prevMatch={isSameUserAsPrevious}
        messageObj={item}
        setIsModalVisible={setIsModalVisible}
        setModalData={setModalData}
        errorImages={errorImages}
      />
    );
  };

  if (loading) {
    return (
      <View style={[allStylesObject.container]}>
        <LoadingScreen />
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
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 120}
        style={allStylesObject.container}
      >
        {isModalVisible ? (
          <UserInfoModal
            visible={isModalVisible}
            user={modalData}
            onClose={() => setIsModalVisible(false)}
          />
        ) : (
          ""
        )}
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
