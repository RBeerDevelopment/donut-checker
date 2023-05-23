import crypto from "crypto";

export async function GET(request: Request) {
  const res = await fetch(
    "https://www.brammibalsdonuts.de/wp-content/uploads/2023"
  );

  const html = await res.text();

  const hashedHtml = createHash(html);

  return new Response(String(html.length));
}

function createHash(text: string) {
  const hash = crypto.createHash("sha256");
  hash.update(text);
  return hash.digest("hex");
}
