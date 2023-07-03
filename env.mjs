import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
 
export const env = createEnv({
  server: {
    WEBSITE_URL: z.string().url(),
    WEBHOOK_URL: z.string().url().optional()
  },
  client: {
   NEXT_PUBLIC_SITE_NAME: z.string().min(1).max(50)
  },

  experimental__runtimeEnv: {
    NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
  }
});
