import { Bot } from "../../system/bot";
import moment, { Moment } from "moment-timezone";
import { SerializedData } from "../../system/types";

const processTime = (timestamp: number | undefined, now: Moment) => {
  if (timestamp === undefined) {
    return 0;
  }
  return moment.duration(now.diff(moment(timestamp * 1000))).asSeconds();
};
export = {
  name: "ping",
  aliases: ["pung"],
  description: "ping bot",
  tags: "main",
  run: async (bot: Bot, m: SerializedData) => {
    return m.reply(`Pong!\n🏎️ ${processTime(m.date, moment())} seconds`);
  },
};
