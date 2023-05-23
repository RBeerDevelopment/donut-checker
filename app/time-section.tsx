import { kv } from "@vercel/kv";

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

export async function TimeSection() {
  const [lastChange, lastCheck] = (await Promise.all([
    kv.get("lastChange"),
    kv.get("lastCheck"),
  ])) as [string | null, string | null];

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
