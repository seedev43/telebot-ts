import { Bot } from "../system/bot";
import { serializeMsg } from "./serialize";
import path from "path";
import fs from "fs";
import * as helpers from "../helpers/helpers";
import { Command, SerializedData } from "./types";

let commands = new Map<string, Command>();

export async function commandExecute(bot: Bot, m: SerializedData) {
  const dir = path.join(__dirname, "..", "cmd");
  const dirs = fs.readdirSync(dir);

  commands.clear();

  dirs
    .filter((a) => a !== "function")
    .map(async (res) => {
      let files = fs
        .readdirSync(`${dir}/${res}`)
        .filter((file) => file.endsWith(".js"));
      for (const file of files) {
        const cmd: Command = await import(`../cmd/${res}/${file}`);
        commands.set(cmd.name, cmd);
      }
    });

  const cmd =
    m?.text
      ?.slice(m?.prefix?.length)
      ?.trim()
      ?.split(/ +/)
      ?.shift()
      ?.toLowerCase() || "";

  const command =
    commands.get(cmd) ||
    (() => {
      let foundCommand = null;
      commands.forEach((val) => {
        if (val.aliases && val.aliases.includes(cmd)) {
          foundCommand = val;
        }
      });
      return foundCommand;
    })();

  if (command && !m?.isBot) {
    if (
      (m.prefix !== undefined && command.noPrefix && m.prefix === "") ||
      (m.prefix !== undefined &&
        !command.noPrefix &&
        m.prefix !== "" &&
        m.text.startsWith(m.prefix))
    ) {
      if (command.isOwner && !m.isOwner) {
        return m.reply(helpers.notOwner);
      }

      if (command.isGroup && !m.isGroup) {
        return m.reply(helpers.notGroup);
      }

      if (command.isBotAdmin && !m.isBotAdmin) {
        return m.reply(helpers.botNotAdmin);
      }

      if (command.isAdmin && !m.isAdmin) {
        return m.reply(helpers.notAdmin);
      }

      command
        .run(bot, m)
        .then((exec: any) => exec)
        .catch((err: unknown) => console.log(err));
    }
  }
}
