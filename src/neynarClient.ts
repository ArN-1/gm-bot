import { NeynarAPIClient, Configuration } from "@neynar/nodejs-sdk";

/**
 * Membuat client per user dengan API key yang berbeda-beda
 */
export function createNeynarClient(apiKey: string) {
  const config = new Configuration({ apiKey });
  return new NeynarAPIClient(config);
}
