import { env } from "@/env.mjs";
import "./globals.css";

export const metadata = {
  title: env.NEXT_PUBLIC_SITE_NAME,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
