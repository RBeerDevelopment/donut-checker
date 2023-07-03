import crypto from "crypto";
import { kv } from "@vercel/kv";
import { env } from "@/env.mjs";

export async function GET() {
  await refreshDonutData();
  return new Response("", { status: 200 });
}

export async function POST() {
  await refreshDonutData();
  return new Response("", { status: 200 });
}

async function refreshDonutData() {
  const res = await fetch(env.WEBSITE_URL);

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
  if (!env.WEBHOOK_URL) return;
  fetch(env.WEBHOOK_URL, { method: "POST" });
}
