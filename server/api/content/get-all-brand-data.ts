import { prisma } from "../../index";
import { useCmsData } from "~/stores/cms-data";

export default defineEventHandler(async (event) => {
  const data = await prisma.brand.findMany({ include: { products: true } });
  const cmsData = useCmsData();
  cmsData.data = data[0] && data[0].id ? data : cmsData.data;

  return data;
});
