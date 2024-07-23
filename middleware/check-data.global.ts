import { useCmsData } from "~/stores/cms-data";

export default defineNuxtRouteMiddleware(async (to) => {
	const cmsData = useCmsData();
	if (!cmsData.data[0].id) {
		const { data } = await useFetch("/api/content/get-all-brand-data");

		if (data.value) {
			cmsData.data =
				data.value[0] && data.value[0].id ? data.value : cmsData.data;
		}
	}
	return;
});
