import fs from "fs";
import path from "path";

const LOG_FILE = path.join("logs", `gm-bot-${new Date().toISOString().split("T")[0]}.log`);
fs.mkdirSync("logs", { recursive: true });

export function log(message: string) {
  const time = new Date().toISOString();
  const fullMessage = `[${time}] ${message}\n`;
  fs.appendFileSync(LOG_FILE, fullMessage);
  console.log(fullMessage.trim());
}
