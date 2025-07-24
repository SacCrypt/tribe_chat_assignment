// utils/session.ts
import { useMessageStore } from "@/store/useMessageStore";
import { useParticipantStore } from "@/store/useParticipantStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const hydrateApp = async () => {
  const res = await fetch("https://dummy-chat-server.tribechat.com/api/info");
  const { sessionUuid } = await res.json();

  const previous = await AsyncStorage.getItem("sessionUuid");
  if (previous !== sessionUuid) {
    // Reset state
    useMessageStore.getState().clearMessages?.();
    useParticipantStore.getState().clearParticipants?.();
    await AsyncStorage.setItem("sessionUuid", sessionUuid);
  }

  // Fetch initial data
  const participants = await fetchAllParticipants();
  const messages = await fetchRecentMessages();
  useParticipantStore.getState().setParticipants(participants);
  useMessageStore.getState().setMessages(messages);
};
