import fs from "fs/promises";
import path from "path";

import dotenv from "dotenv";
dotenv.config();

import { formatProjectMetadata } from "./formatProjectMetadata";
import { getProjectMetadata } from "./getProjectMetadata";

async function main() {
  const data = await fs.readFile(path.resolve("data/raw.json"), "utf-8");
  const result = JSON.parse(data);

  // const result = await getProjectMetadata({
  //   org: process.env.ORGANIZATION || "",
  //   projectNumber: process.env.PROJECT_NUMBER || "",
  //   fieldsQty: Number(process.env.FIELDS_QUANTITY) || 1,
  //   itemsQty: Number(process.env.ITEMS_QUANTITY) || 1,
  // });

  await fs.writeFile(path.resolve("data/raw.json"), JSON.stringify(result));

  const formatted = formatProjectMetadata(result);

  await fs.writeFile(
    path.resolve("data/output.json"),
    JSON.stringify(formatted)
  );
}

main();
