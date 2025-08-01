import { getConfigByRow } from "./config";

const total = 10; // misal kamu punya 10 baris config

for (let i = 0; i < total; i++) {
  const config = getConfigByRow(i);
  if (!config) continue;

  console.log(`\n=== Config Row ${i} ===`);
  console.log("FARCASTER_BOT_MNEMONIC:", config.FARCASTER_BOT_MNEMONIC);
  console.log("SIGNER_UUID:", config.SIGNER_UUID);
  console.log("NEYNAR_API_KEY:", config.NEYNAR_API_KEY);
  console.log("PUBLISH_CAST_TIME:", config.PUBLISH_CAST_TIME);
  console.log("TIME_ZONE:", config.TIME_ZONE);
}
