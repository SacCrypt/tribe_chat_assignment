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
