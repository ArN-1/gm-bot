# gm_bot

**gm_bot** is an automated messaging bot designed to cast a friendly `'gm 🪐'` message on [Warpcast](https://warpcast.com) every day at a scheduled time. It is built using the [@neynar/nodejs-sdk](https://www.npmjs.com/package/@neynar/nodejs-sdk) and powered by the [Neynar API](https://docs.neynar.com/). The bot reads a list of Farcaster accounts and posting schedules from a CSV file, then posts automatically using cron-based scheduling.

---

## ✨ Features

- Supports multiple accounts from a single `config.csv` file
- Daily scheduled cast per account with timezone awareness
- Fully automated operation (runs continuously)
- Built using TypeScript and the Neynar Node.js SDK
- Clear logging of scheduled and posted messages

---

## 📁 Project Structure

```js
gm-bot/
├── src/
│ ├── app.ts # Entry point of the bot
│ ├── config.ts # CSV config loader and accessor
│ ├── neynarClient.ts # Function to create Neynar API clients
│ └── utils.ts # Message template and logging
├── config.production.csv # Sample config file with multiple bots
├── tsconfig.json # TypeScript configuration
├── package.json # Project dependencies and scripts
└── README.md # Project documentation
```
```js
| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run build` | Compile TypeScript to JavaScript     |
| `npm start`     | Run the built app (must build first) |
| `npm run dev`   | Run with `ts-node` for development   |
```

---

## 🛠️ Installation

1. **Clone the repo:**

```bash
git clone https://github.com/ArN-1/gm-bot
cd gm-bot
```

```js
npm install

```
Run the bot

```js
npx tsx src/app.ts
```

## CSV Configuration Format

```
FARCASTER_BOT_MNEMONIC,SIGNER_UUID,NEYNAR_API_KEY,PUBLISH_CAST_TIME,TIME_ZONE
mnemonic-1,uuid-1,key-1,09:00,UTC
mnemonic-2,uuid-2,key-2,10:00,Asia/Jakarta
...

# How It Works
---

On startup, the bot:

- Reads the CSV file

- Schedules a cron job for each account at the specified time and timezone

- Publishes a "gm 🪐" cast automatically every day

