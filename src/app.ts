import cron from "node-cron";
import { MESSAGE } from "./utils";
import { getAllConfigs } from "./config";
import { createNeynarClient } from "./neynarClient";
import { isApiErrorResponse } from "@neynar/nodejs-sdk";
import chalk from "chalk";

const allConfigs = getAllConfigs();

allConfigs.forEach((cfg, index) => {
  const { SIGNER_UUID, NEYNAR_API_KEY, PUBLISH_CAST_TIME, TIME_ZONE } = cfg;

  if (!SIGNER_UUID || !NEYNAR_API_KEY) {
    console.warn(chalk.yellow(`❌ Baris ${index + 1}: SIGNER_UUID / NEYNAR_API_KEY kosong, dilewati.`));
    return;
  }

  const client = createNeynarClient(NEYNAR_API_KEY);
  const [hour, minute] = PUBLISH_CAST_TIME.split(":");

  const publishCast = async () => {
    try {
      const text = MESSAGE;
      await client.publishCast({ signerUuid: SIGNER_UUID, text });
      console.log(chalk.green(`[${TIME_ZONE} | ${PUBLISH_CAST_TIME}] ✅ Sukses kirim cast untuk UUID ${SIGNER_UUID}`));
    } catch (err) {
      if (isApiErrorResponse(err)) {
        console.error(chalk.red(`[${TIME_ZONE} | ${PUBLISH_CAST_TIME}] ❌ Gagal publish UUID ${SIGNER_UUID}: ${JSON.stringify(err.response.data)}`));
      } else {
        console.error(chalk.red(`[${TIME_ZONE} | ${PUBLISH_CAST_TIME}] ❌ Error lain UUID ${SIGNER_UUID}: ${err}`));
      }
    }
  };

  cron.schedule(
    `${minute} ${hour} * * *`,
    publishCast,
    {
      scheduled: true,
      timezone: TIME_ZONE,
    }
  );

  console.log(chalk.blue(`📅 Baris ${index + 1}: Cron dijadwalkan ${PUBLISH_CAST_TIME} (${TIME_ZONE}) untuk UUID ${SIGNER_UUID}`));
});
