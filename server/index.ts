import { PrismaClient, Prisma } from "@prisma/client";
import type { Brand, Product } from "@prisma/client";

export type BrandWithProducts = Brand & {
  products?: Product[];
};
export const prisma = new PrismaClient();
