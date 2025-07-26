import { TParticipant } from "../types/participant";

const rootUrl = "https://dummy-chat-server.tribechat.com/api";

export const fetchAllParticipants = async (): Promise<TParticipant[]> => {
  const response = await fetch(`${rootUrl}/participants/all`);
  if (!response.ok) throw new Error("Failed to fetch participants");
  return await response.json();
};
