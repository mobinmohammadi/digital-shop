import "dotenv/config";
import { db } from "./db";
import { verifyWebhook } from "@clerk/clerk-sdk-node";
import { serve } from "bun";

serve({
  port: 3000,
  async fetch(req) {
    try {
      const body = await req.text();

      const evt = verifyWebhook({
        rawBody: body,
        secret: process.env.CLERK_WEBHOOK_SECRET!,
      });

      if (evt.type === "user.created" || evt.type === "user.updated") {
        const data = evt.data;

        const userData = {
          id: data.id,
          name: `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim(),
          email: data.email_addresses[0]?.email_address ?? null,
          picture: data.image_url ?? null,
          role: (data.public_metadata?.role as string) ?? "USER",
        };

        await db.user.upsert({
          where: { email: userData.email },
          update: userData,
          create: userData,
        });
      }

      return new Response("Webhook received", { status: 200 });
    } catch (err) {
      console.error(err);
      return new Response("Error verifying webhook", { status: 400 });
    }
  },
});
