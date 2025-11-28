import { PrismaClient } from "@prisma/client";

declare global {
  // وقتی از declare global استفاده می‌کنی، باید export نکرده باشد
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}
