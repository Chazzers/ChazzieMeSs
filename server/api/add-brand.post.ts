import type { AddBrandBody } from "./types";
import { prisma } from "../index";
import { useCmsData } from "~/stores/cms-data";

export default defineEventHandler(async (event) => {
	const body: AddBrandBody = await readBody(event);

	const brand = await prisma.brand.create({
		data: {
			image: body.image,
			description: body.description,
			name: body.name,
			slug: body.slug,
		},
	});

	return { brand };
});
