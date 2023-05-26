import { kv } from "@vercel/kv";

export async function TimeSection() {
  const [lastChange, lastCheck] = (await Promise.all([
    kv.get("lastChange"),
    kv.get("lastCheck"),
  ])) as [string | null, string | null];

  const formatterWithTime = new Intl.DateTimeFormat("de", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const formatterDateOnly = new Intl.DateTimeFormat("de", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  return (
    <>
      <p className="text-2xl font-bold">
        Last change:{" "}
        {lastChange ? formatterDateOnly.format(new Date(lastChange)) : ""}
      </p>

      <p className="italic">
        (Updated:{" "}
        {lastCheck ? formatterWithTime.format(new Date(lastCheck)) : ""})
      </p>
    </>
  );
}
