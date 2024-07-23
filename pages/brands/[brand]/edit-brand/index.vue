<script setup lang="ts">
import { useCmsData } from "~/stores/cms-data";
import TextInputField from "~/components/form/form-input/TextInputField.vue";
import ImageUploadField from "~/components/form/form-input/ImageUploadField.vue";
import TextAreaInputField from "~/components/form/form-input/TextAreaInputField.vue";
import FormComponent from "~/components/form/FormComponent.vue";
import { AddButton, CancelLink } from "~/components/buttons/export";
import FormContainer from "~/components/form/FormContainer.vue";
import FormTitle from "~/components/FormTitle.vue";
import HiddenInputFieldVue from "~/components/form/form-input/HiddenInputField.vue";
import AddCancelContainer from "~/components/AddCancelContainer.vue";
import { Methods } from "~/components/form/MethodTypes";
const route = useRoute();
const cmsData = useCmsData();

const currentBrand = cmsData.data.find(
	(item) => item.slug === route.params.brand,
);
if (!currentBrand) {
	await navigateTo("/brands");
}

const slugName = ref("");
if (currentBrand && currentBrand.slug) {
	slugName.value = currentBrand.slug;
}

async function editBrand(event: SubmitEvent) {
	const element = event.target as HTMLFormElement;

	const formData = new FormData(element);

	const jsonData = formDataToJSON(formData);

	const res = await useFetch("/api/edit-brand", {
		method: "POST",
		body: jsonData,
	});

	if (res.data.value && currentBrand) {
		const brand = res.data.value.brand;
		currentBrand.description = brand.description;
		currentBrand.image = brand.image;
		currentBrand.name = brand.name;
		currentBrand.slug = brand.slug;
		await navigateTo(`/brands/${currentBrand.slug}`);
	}
}

function formDataToJSON(formData: FormData): string {
	const jsonObject: {
		[key: string]: string | string[];
	} = {};

	formData.forEach((value, key) => {
		if (typeof value !== "string") return;

		// Check if the key already exists
		if (jsonObject[key]) {
			// If it's an array, push the value, otherwise, create an array
			if (Array.isArray(jsonObject[key])) {
				(jsonObject[key] as string[]).push(value);
			} else {
				jsonObject[key] = [jsonObject[key] as string, value];
			}
		} else {
			jsonObject[key] = value;
		}
	});

	return JSON.stringify(jsonObject);
}
</script>

<template>
	<FormContainer v-if="currentBrand">
		<FormTitle>Edit brand</FormTitle>
		<FormComponent
			@submit.prevent="editBrand"
			:method="Methods.POST"
			action="/api/edit-brand"
		>
			<TextInputField
				placeholder="HIGH"
				name="name"
				title="Merk naam"
				:is-slug="true"
				:value="currentBrand.name"
				@changed-slug-name="
					(payload: string) => {
						slugName = payload;
					}
				"
			/>
			<ImageUploadField
				title="Merk afbeelding"
				:value="currentBrand.image"
			/>
			<TextAreaInputField
				name="description"
				placeholder="Wit"
				title="Merk introductie tekst"
				:value="currentBrand.description"
			/>
			<HiddenInputFieldVue
				id="slug"
				class="rounded-sm border border-solid border-pink-400 focus:outline-none focus:ring-1 focus:ring-pink-700"
				type="hidden"
				name="slug"
				placeholder="Wit"
				:value="slugName ? slugName : currentBrand.slug"
			/>
			<HiddenInputFieldVue name="id" :value="currentBrand.id" />
			<AddCancelContainer>
				<CancelLink :url="`/brands/${$route.params.brand}`" />
				<AddButton button-type="submit">Merk bewerken</AddButton>
			</AddCancelContainer>
		</FormComponent>
	</FormContainer>
</template>
