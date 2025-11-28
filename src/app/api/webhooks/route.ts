import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { User } from "../../../generated/prisma"

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    if (evt.type === "user.created" || evt.type === "user.updated") {
      const data = evt.data;

      // ساخت داده از Clerk
      const userData : Partial<User> = {
        id: data.id,
        name: `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim(),
        email: data.email_addresses[0]?.email_address ?? null,
        picture: data.image_url ?? null,
      };

      // ذخیره یا آپدیت در دیتابیس
      const dbUser = await db.user.upsert({
        where: {
          email: userData.email,
        },
        update: userData,
        create: {
           id : userData.id!,
           name : userData.name!,
           email : userData.email!,
           picture : userData.picture!,
           role : userData.role || "USER"

        },
      });
      
      if(!userData) return

      console.log("User synced:", dbUser);



    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
