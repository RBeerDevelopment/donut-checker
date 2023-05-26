import crypto from "crypto";

import { kv } from "@vercel/kv";

export async function GET() {
  const res = await fetch(
    "https://www.brammibalsdonuts.de/wp-content/uploads/2023"
  );

  const lastHash = await kv.get("lastHash");

  const html = await res.text();

  const hashedHtml = createHash(html);

  if (!lastHash || lastHash !== hashedHtml) {
    await kv.set("lastHash", hashedHtml);
    await kv.set("lastChange", new Date());

    callWebhook();
  }

  await kv.set("lastCheck", new Date());
  return new Response("", { status: 200 });
}

function createHash(text: string) {
  const hash = crypto.createHash("sha256");
  hash.update(text);
  return hash.digest("hex");
}

function callWebhook() {
  if (!process.env.WEBHOOK_URL) return console.log("No webhook url set");
  fetch(process.env.WEBHOOK_URL, { method: "POST" });
}
