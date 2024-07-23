import { prisma } from "../../index";

export default defineEventHandler(async (event) => {
	const data = await prisma.page.findMany();

	return data;
});
