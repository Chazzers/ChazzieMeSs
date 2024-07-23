import type { EditBrandBody } from "./types";
import { prisma } from "../index";

export default defineEventHandler(async (event) => {
	const body: EditBrandBody = await readBody(event);

	const brand = await prisma.brand.update({
		where: { id: body.id },
		data: {
			image: body.image,
			description: body.description,
			name: body.name,
			slug: body.slug,
		},
	});

	return { brand };
});
