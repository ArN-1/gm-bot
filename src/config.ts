import fs from "fs";
import path from "path";
import parse from "csv-parse/sync";

const CONFIG_FILE = path.resolve(__dirname, "../src/config.csv");

let configs: Record<string, string>[] = [];

try {
  const content = fs.readFileSync(CONFIG_FILE, "utf-8");
  configs = parse.parse(content, {
    columns: true,
    skip_empty_lines: true,
    delimiter: ",",
    trim: true,
  });

  if (configs.length === 0) {
    throw new Error("File config.csv kosong");
  }
} catch (err: any) {
  console.error(`❌ Gagal memuat konfigurasi: ${err.message}`);
  process.exit(1);
}

export function getAllConfigs() {
  return configs.map((row, i) => ({
    SIGNER_UUID: row["SIGNER_UUID"] || "",
    NEYNAR_API_KEY: row["NEYNAR_API_KEY"] || "",
    PUBLISH_CAST_TIME: row["PUBLISH_CAST_TIME"] || "09:00",
    TIME_ZONE: row["TIME_ZONE"] || "UTC",
  }));
}
