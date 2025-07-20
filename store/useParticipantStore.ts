import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TParticipant } from "../types/participant";

type ParticipantStore = {
  participants: Record<string, TParticipant>;
  setParticipants: (participants: TParticipant[]) => void;
  updateParticipant: (participant: TParticipant) => void;
  clearParticipants: () => void;
};

const customStorage = {
  getItem: async (name: string): Promise<string | null> => {
    const value = await AsyncStorage.getItem(name);
    return value;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await AsyncStorage.setItem(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await AsyncStorage.removeItem(name);
  },
};

export const useParticipantStore = create<ParticipantStore>()(
  persist(
    (set, get) => ({
      participants: {},

      setParticipants: (list) => {
        const map = Object.fromEntries(list.map((p) => [p.uuid, p]));
        set({ participants: map });
      },

      updateParticipant: (participant) => {
        set((state) => ({
          participants: {
            ...state.participants,
            [participant.uuid]: participant,
          },
        }));
      },

      clearParticipants: () => set({ participants: {} }),
    }),
    {
      name: "participants-storage",
      storage: customStorage,
    }
  )
);
