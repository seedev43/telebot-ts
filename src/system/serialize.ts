import { Bot, Context } from "grammy";
import { config } from "../config/config";
import { SerializedData } from "./types";
import { Message } from "grammy/types";

export async function serializeMsg(
  bot: Bot,
  ctx: Context
): Promise<SerializedData> {
  let text: string = "";
  if (ctx.message?.caption) {
    text = ctx.message?.caption;
  } else if (ctx.message?.text) {
    text = ctx.message?.text;
  }

  const regexPrefix = new RegExp("^[" + config.prefix + "]", "i");
  const matchPrefix = regexPrefix.test(text)
    ? text?.match(regexPrefix)?.[0]
    : "";

  const serializedData: SerializedData = {
    idBot: ctx.me.id,
    usernameBot: ctx.me.username,
    botName:
      ctx.me.first_name + (ctx.me.last_name ? " " + ctx.me.last_name : ""),
    date: ctx.message?.date,
    chatId: ctx.message?.chat.id,
    sender: ctx.message?.from.id,
    messageId: ctx.message?.message_id,
    text: text,
    firstName: ctx.message?.from.first_name,
    lastName: ctx.message?.from.last_name,
    pushname:
      ctx.message?.from.first_name +
      (ctx.message?.from.last_name ? " " + ctx.message.from.last_name : ""),
    isBot: ctx.message?.from.is_bot,
    username: ctx.message?.from.username,
    chatType: ctx.message?.chat.type,
    groupTitle:
      ctx.message?.chat.type == "group" ||
      ctx.message?.chat.type == "supergroup"
        ? ctx.message.chat.title
        : undefined,
    isOwner:
      ctx.message?.from.id !== undefined
        ? config.owners.includes(ctx.message?.from.id)
        : false,

    isChannel:
      ctx.message?.chat.type !== undefined
        ? ctx.message.chat.type !== "private" &&
          ctx.message.chat.type !== "group" &&
          ctx.message.chat.type !== "supergroup"
        : false,
    isGroup:
      ctx.message?.chat.type !== undefined
        ? ctx.message.chat.type === "group" ||
          ctx.message.chat.type === "supergroup"
        : false,
    isPrivate:
      ctx.message?.chat.type !== undefined
        ? ctx.message.chat.type !== "private"
        : false,

    isAdmin: await (async () => {
      try {
        let admins = await bot.api.getChatAdministrators(
          ctx.message?.chat.id || 0
        );
        let checkAdmin = admins.some(
          (admin) => admin.user.id === ctx.message?.from.id
        );
        return checkAdmin;
      } catch (err) {
        return false;
      }
    })(),
    isBotAdmin: await (async () => {
      try {
        let admins = await bot.api.getChatAdministrators(
          ctx.message?.chat.id || 0
        );
        let checkAdmin = admins.some((admin) => admin.user.id === ctx.me.id);
        return checkAdmin;
      } catch (err) {
        return false;
      }
    })(),
    msg: ctx.message,
    from: ctx.message?.from,
    chat: ctx.message?.chat,

    prefix: matchPrefix,
    query: text.split(" ").slice(1).join(" "),

    // custom function
    reply: (text: string, options: object) => {
      return bot.api.sendMessage(ctx.message?.chat.id || 0, text, {
        reply_parameters: {
          message_id: ctx.message?.message_id || 0,
        },
      });
    },
  };
  return serializedData;
}
