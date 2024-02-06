import { Bot as _Bot } from "grammy";
import { File } from "grammy/types";

interface NewFile extends File {
  link?: string;
}

export class Bot extends _Bot {
  async getFileLink(file_id: string): Promise<NewFile> {
    let getFile = await this.api.getFile(file_id);
    const link = `https://api.telegram.org/file/bot${this.token}/${getFile.file_path}`;
    return { ...getFile, link };
  }
}
