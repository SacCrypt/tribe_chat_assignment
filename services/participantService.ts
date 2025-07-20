import { TMessageJSON } from "@/types/message";
import { TParticipant } from "../types/participant";

const rootUrl = "https://dummy-chat-server.tribechat.com/api";

export const fetchAllParticipants = async (): Promise<TParticipant[]> => {
  const response = await fetch(`${rootUrl}/participants/all`);
  if (!response.ok) throw new Error("Failed to fetch participants");
  return await response.json();
};

export const fetchRecentMessages = async (): Promise<TMessageJSON[]> => {
  const response = await fetch(`${rootUrl}/messages/latest`);
  if (!response.ok) throw new Error("Failed to fetch participants");
  return await response.json();
};
