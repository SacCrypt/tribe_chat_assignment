import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, PersistStorage, StateStorage } from "zustand/middleware";
import type { User } from "../types/user";
type ParticipantStore = {
  participants: Record<string, User>;
  setParticipants: (participants: User[]) => void;
  updateParticipant: (participant: User) => void;
  clearParticipants: () => void;
};

const customStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    const value = await AsyncStorage.getItem(name);
    return value ?? null; // ensure it's string | null
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await AsyncStorage.setItem(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await AsyncStorage.removeItem(name);
  },
};

// Wrap AsyncStorage with proper parsing
const jsonStorage: PersistStorage<ParticipantStore> = {
  getItem: async (name) => {
    const value = await customStorage.getItem(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: async (name, value) => {
    await customStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: async (name) => {
    await customStorage.removeItem(name);
  },
};

export const useParticipantStore = create<ParticipantStore>()(
  persist(
    (set) => ({
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
      storage: jsonStorage,
    }
  )
);
