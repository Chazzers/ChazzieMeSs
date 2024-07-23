import { prisma } from "../../index";
import { useCmsData } from "~/stores/cms-data";

export default defineEventHandler(async (event) => {
	const data = await prisma.brand.findMany({ include: { products: true } });
	// console.log(event);
	// console.log("pre-store-data");
	// // const cmsData = useCmsData();
	// console.log("pre-setting data");
	// // cmsData.data = data[0] && data[0].id ? data : cmsData.data;
	// console.log("post-setting data");
	return data;
});
