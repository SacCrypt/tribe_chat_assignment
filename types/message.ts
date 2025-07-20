export type TMessageJSON = {
  uuid: string;
  text: string;
  attachments: TAttachment[]; // can include images
  authorUuid: string;
  reactions: TReaction[];
  sentAt: number; // timestamp (ms)
  updatedAt: number; // timestamp (ms)
  replyToMessage?: string; // optional UUID of the original message
};

export type TAttachment = {
  type: "image"; // more types could be added later
  url: string;
};

export type TReaction = {
  participantUuid: string;
  emoji: string;
};
