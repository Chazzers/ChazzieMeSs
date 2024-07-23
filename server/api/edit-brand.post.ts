import type { EditBrandBody } from "./types";
import { prisma } from "../index";
import { useCmsData } from "~/stores/cms-data";

export default defineEventHandler(async (event) => {
	const body: EditBrandBody = await readBody(event);
	const cmsData = useCmsData();

	const currentBrand = cmsData.data.find((brand) => brand.id === body.id);

	if (!currentBrand) return;

	body.image = body.image ? `/assets/images/${body.image}` : body.image;

	const brand = await prisma.brand.update({
		where: { id: body.id },
		data: {
			image: body.image,
			description: body.description,
			name: body.name,
			slug: body.slug,
		},
	});

	currentBrand.description = brand.description;
	currentBrand.name = brand.name;
	currentBrand.image = brand.image;
	currentBrand.slug = brand.slug;

	return await sendRedirect(event, `/brands/${brand.slug}`);
});
