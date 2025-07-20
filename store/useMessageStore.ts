import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TMessageJSON } from "../types/message";

type MessageStore = {
  messages: Record<string, TMessageJSON>;
  setMessages: (msgs: TMessageJSON[]) => void;
  addMessage: (msg: TMessageJSON) => void;
  updateMessage: (msg: TMessageJSON) => void;
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
    }),
    {
      name: "messages-storage",
      storage: {
        getItem: AsyncStorage.getItem,
        setItem: AsyncStorage.setItem,
        removeItem: AsyncStorage.removeItem,
      },
    }
  )
);
