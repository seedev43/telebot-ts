import { Bot } from "../system/bot";
import { Chat, Message, User } from "grammy/types";

export type SerializedData = {
  idBot: number;
  usernameBot: string;
  botName: string;
  date?: number;
  chatId?: number;
  sender?: number;
  messageId?: number;
  text: string;
  firstName?: string;
  lastName?: string;
  pushname: string;
  isBot?: boolean;
  username?: string;
  chatType?: string;
  groupTitle?: string;
  isOwner: boolean;
  isChannel: boolean;
  isPrivate: boolean;
  isGroup: boolean;
  isAdmin: boolean;
  isBotAdmin: boolean;
  msg?: Message;
  from?: User;
  chat?: Chat;
  prefix?: string;
  query?: string;
  reply: any;
};

export type Command = {
  name: string;
  aliases?: string[];
  description?: string;
  tags: string;
  noPrefix?: boolean;
  isOwner?: boolean;
  isGroup?: boolean;
  isAdmin?: boolean;
  isBotAdmin?: boolean;
  run: (bot: Bot, m: SerializedData) => Promise<any>;
};
