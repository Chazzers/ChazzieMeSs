import type { CreatePageBody } from "./types";
import { prisma } from "../index";
import { Prisma } from "@prisma/client";

export default defineEventHandler(async (event) => {
	const body: CreatePageBody = await readBody(event);

	const notIncludedProperties = ["title", "slug"];

	const formFields = { ...body };

	notIncludedProperties.forEach((property) => delete formFields[property]);

	const data: Prisma.PageCreateInput = {
		title: body.title,
		slug: body.slug,
		formFields: JSON.stringify(formFields),
	};

	await prisma.page.create({
		data: data,
	});

	return await sendRedirect(event, `/`);
});
