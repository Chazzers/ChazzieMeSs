import type { AddProductBody } from "./types";
import { prisma } from "../index";
import { Prisma } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const body: AddProductBody = await readBody(event);

  const currentBrand = await prisma.brand.findFirst({
    where: { slug: body.brand },
  });

  if (!currentBrand) return;

  body.image = `${body.image}`;

  const data: Prisma.ProductCreateInput = {
    name: body.name,
    productType: body.productType,
    image: body.image,
    color: body.color,
    size: body.size,
    price: body.price,
    brand: { connect: currentBrand },
  };
  await prisma.product.create({
    data: data,
  });
  return await sendRedirect(event, `/brands/${body.brand}`);
});
