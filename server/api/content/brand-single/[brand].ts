import { prisma } from "../../../index";

export default defineEventHandler(async (event) => {
  const brand = getRouterParam(event, "brand");
  const data = await prisma.brand.findFirst({
    where: { slug: brand },
    include: { products: true },
  });
  console.log(data);
  return data;
});
