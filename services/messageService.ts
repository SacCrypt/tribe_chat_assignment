import { TMessageJSON } from "@/types/message";

const rootUrl = "https://dummy-chat-server.tribechat.com/api";

export const postNewMessage = async (text: string) => {
  const response = await fetch(
    "https://dummy-chat-server.tribechat.com/api/messages/new",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to send message");
  }

  const data = await response.json();
  console.log(data);
  return data;
};

export const fetchRecentMessages = async (): Promise<TMessageJSON[]> => {
  const response = await fetch(`${rootUrl}/messages/latest`);
  if (!response.ok) throw new Error("Failed to fetch latest Messages");
  return await response.json();
};

export const fetchAllMessages = async (): Promise<TMessageJSON[]> => {
  const response = await fetch(`${rootUrl}/messages/all`);
  if (!response.ok) throw new Error("Failed to fetch all Messages");
  return await response.json();
};

export const fetchOlderMessages = async (
  reference_uuid: string
): Promise<TMessageJSON[]> => {
  const response = await fetch(`${rootUrl}/messages/older/${reference_uuid}`);
  if (!response.ok) throw new Error("Failed to fetch latest Messages");
  return await response.json();
};
