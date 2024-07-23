import type { EditProductBody } from "./types";
import { prisma } from "../index";
import { useCmsData } from "~/stores/cms-data";

export default defineEventHandler(async (event) => {
	const body: EditProductBody = await readBody(event);
	const cmsData = useCmsData();
	const currentProduct = cmsData.data
		.find((item) => item.slug === body.brand)
		?.products?.find((item) => item.id === body.id);

	if (!currentProduct) return;

	body.image = body.image ? `/assets/images/${body.image}` : body.image;

	const newData = {
		name: body.name,
		productType: body.productType,
		image: body.image ? body.image : currentProduct.image,
		color: body.color,
		size: body.size,
		price: body.price,
		slug: body.slug,
	};

	const product = await prisma.product.update({
		where: { id: body.id },
		data: newData,
	});

	currentProduct.name = product.name;
	currentProduct.productType = product.productType;
	currentProduct.image = product.image;
	currentProduct.color = product.color;
	currentProduct.size = product.size;
	currentProduct.price = product.price;
	currentProduct.slug = product.slug;

	return await sendRedirect(event, `/brands/${body.brand}`);
});
