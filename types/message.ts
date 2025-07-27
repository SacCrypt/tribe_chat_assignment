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
  uuid: string;
  participantUuid: string;
  value: string;
};

export type TAttachment = {
  url: string;
  uuid: string;
  type: "image";
  width: number;
  height: number;
};
