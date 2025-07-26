import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";
import { TMessageJSON } from "../types/message";

type MessageStore = {
  messages: Record<string, TMessageJSON>;
  setMessages: (msgs: TMessageJSON[]) => void;
  addMessage: (msg: TMessageJSON) => void;
  updateMessage: (msg: TMessageJSON) => void;
  appendMessages: (msgs: TMessageJSON[]) => void;
};

// JSON-safe wrapper around AsyncStorage
const storage: PersistStorage<MessageStore> = {
  getItem: async (name) => {
    const value = await AsyncStorage.getItem(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: async (name, value) => {
    await AsyncStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: async (name) => {
    await AsyncStorage.removeItem(name);
  },
};

export const useMessageStore = create<MessageStore>()(
  persist(
    (set, get) => ({
      messages: {},
      setMessages: (msgs) => {
        const map = Object.fromEntries(msgs.map((m) => [m.uuid, m]));
        set({ messages: { ...get().messages, ...map } });
      },
      addMessage: (msg) => {
        set((state) => ({
          messages: { ...state.messages, [msg.uuid]: msg },
        }));
      },
      updateMessage: (msg) => {
        set((state) => ({
          messages: { ...state.messages, [msg.uuid]: msg },
        }));
      },
      appendMessages: (msgs) => {
        const current = get().messages;
        const newEntries = msgs.filter((msg) => !current[msg.uuid]);
        const newMap = Object.fromEntries(newEntries.map((m) => [m.uuid, m]));
        set({ messages: { ...current, ...newMap } });
      },
    }),
    {
      name: "messages-storage",
      storage,
    }
  )
);
