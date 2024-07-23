<script setup lang="ts">
import TextInputField from "~/components/form/form-input/TextInputField.vue";
import ImageUploadField from "~/components/form/form-input/ImageUploadField.vue";
import TextAreaInputField from "~/components/form/form-input/TextAreaInputField.vue";
import FormComponent from "~/components/form/FormComponent.vue";
import { AddButton, CancelLink } from "~/components/buttons/export";
import FormContainer from "~/components/form/FormContainer.vue";
import FormTitle from "~/components/FormTitle.vue";
import HiddenInputField from "~/components/form/form-input/HiddenInputField.vue";
import AddCancelContainer from "~/components/AddCancelContainer.vue";
import { Methods } from "~/components/form/MethodTypes";
import { useCmsData } from "~/stores/cms-data";

const cmsData = useCmsData();

const slugName = ref("");

async function addBrand(event: SubmitEvent) {
	const element = event.target as HTMLFormElement;

	const formData = new FormData(element);

	const jsonData = formDataToJSON(formData);

	const res = await useFetch("/api/add-brand", {
		method: "POST",
		body: jsonData,
	});

	if (res.data.value) {
		cmsData.data.push(res.data.value.brand);
		await navigateTo(`/brands/`);
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
	<FormContainer>
		<FormTitle>Add brand</FormTitle>
		<FormComponent
			@submit.prevent="addBrand"
			:method="Methods.POST"
			action="/api/add-brand"
		>
			<TextInputField
				placeholder="HIGH"
				name="name"
				title="Brand name"
				:is-slug="true"
				@changed-slug-name="
					(payload: string) => {
						slugName = payload;
					}
				"
			/>
			<ImageUploadField title="Brand image" />
			<TextAreaInputField
				name="description"
				placeholder="Wit"
				title="Brand introduction"
			/>
			<HiddenInputField
				v-if="slugName"
				id="slug"
				class="rounded-sm border border-solid border-pink-400 focus:outline-none focus:ring-1 focus:ring-pink-700"
				type="hidden"
				name="slug"
				placeholder="Wit"
				:value="slugName"
			/>
			<AddCancelContainer>
				<CancelLink url="/brands">Cancel</CancelLink>
				<AddButton button-type="submit">Add brand</AddButton>
			</AddCancelContainer>
		</FormComponent>
	</FormContainer>
</template>
