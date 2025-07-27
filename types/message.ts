export type TMessageJSON = {
  uuid: string;
  text: string;
  attachments: TAttachment[];
  authorUuid: string;
  reactions: TReaction[];
  sentAt: number;
  updatedAt: number;
  replyToMessage?: string;
};

export type TReaction = {
  participantUuid: string;
  emoji: string;
};

type TAttachment = {
  uuid: string;
  type: "image";
  url: string;
  width: number;
  height: number;
};
