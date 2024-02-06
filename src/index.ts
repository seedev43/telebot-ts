import * as dotenv from "dotenv";
dotenv.config();
import { Bot } from "./system/bot";
import { serializeMsg } from "./system/serialize";
import { message } from "./system/message";

async function startBot() {
  try {
    const bot = new Bot(process.env.BOT_TOKEN || ""); // <-- put your bot token between the ""

    bot.on("message", async (ctx) => {
      const m = await serializeMsg(bot, ctx);
      await message(bot, m);
    });

    bot.start({
      drop_pending_updates: true,
    });

    console.log("BOT STARTED!");
  } catch (err) {
    console.log(err);
  }
}

startBot();
