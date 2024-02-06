import { Bot } from "../system/bot";
import { SerializedData } from "./types";
import { commandExecute } from "./command";
import chalk from "chalk";
import moment from "moment-timezone";

export async function message(bot: Bot, m: SerializedData) {
  let date = m?.date || new Date().getTime();
  let chatType = m?.chatType || "Unknown";
  let ok = new Date(date * 1000);
  let log = `${chalk.red("------------------------------")}
${
  m.isGroup
    ? `${chalk.magenta(chatType.toUpperCase() + " CHAT")}
${chalk.blueBright("CHAT ID: " + m.chatId)}
${chalk.blueBright("GROUP NAME: " + m.groupTitle)}
${chalk.blueBright("USER ID: " + m.sender)}
${chalk.blueBright("PUSHNAME: " + m.pushname)}
${chalk.blueBright("MESSAGE ID: " + m.messageId)}
${chalk.blueBright("MESSAGE:\n" + m.text)}`
    : `${chalk.magenta(chatType.toUpperCase() + " CHAT")}
${chalk.cyan("USER ID: " + m.sender)}
${chalk.cyan("PUSHNAME: " + m.pushname)}
${chalk.cyan("MESSAGE ID: " + m.messageId)}
${chalk.cyan("MESSAGE:\n" + m.text)}`
}
${chalk.yellow("SENDING AT: " + moment(ok).format("DD-MM-YYYY HH:mm:ss"))}
${chalk.red("------------------------------")}
`;
  console.log(log);

  await commandExecute(bot, m);
}
