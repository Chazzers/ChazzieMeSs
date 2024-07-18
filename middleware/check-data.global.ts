import { useCmsData } from "~/stores/cms-data";

export default defineNuxtRouteMiddleware(async (to) => {
	const cmsData = useCmsData();
	if (!cmsData.data[0].id) {
		await useFetch("/api/content/get-all-brand-data");
	}
	return;
});
