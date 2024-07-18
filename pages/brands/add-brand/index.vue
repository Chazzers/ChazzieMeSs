<script setup lang="ts">
import TextInputField from "~/components/form/form-input/TextInputField.vue";
import ImageUploadField from "~/components/form/form-input/ImageUploadField.vue";
import TextAreaInputField from "~/components/form/form-input/TextAreaInputField.vue";
import FormComponent from "~/components/form/FormComponent.vue";
import AddButton from "~/components/buttons/AddButton.vue";
import FormContainer from "~/components/form/FormContainer.vue";
import FormTitle from "~/components/FormTitle.vue";
import HiddenInputField from "~/components/form/form-input/HiddenInputField.vue";
import CancelButton from "~/components/buttons/CancelButton.vue";
import AddCancelContainer from "~/components/AddCancelContainer.vue";
import { Methods } from "~/components/form/MethodTypes";

const slugName = ref("");

const { name, description, slug, image } = defineProps<{
	name: string;
	description: string;
	slug: string;
	image: string;
}>();
</script>

<template>
	<FormContainer>
		<FormTitle>Merk toevoegen</FormTitle>
		<FormComponent :method="Methods.post" action="/api/add-brand">
			<TextInputField
				placeholder="HIGH"
				name="name"
				title="Merk naam"
				:is-slug="true"
				:value="name"
				@changed-slug-name="
					(payload: string) => {
						slugName = payload;
					}
				"
			/>
			<ImageUploadField title="Merk afbeelding" :value="image" />
			<TextAreaInputField
				name="description"
				placeholder="Wit"
				title="Merk introductie tekst"
				:value="description"
			/>
			<HiddenInputField
				id="slug"
				class="rounded-sm border border-solid border-pink-400 focus:outline-none focus:ring-1 focus:ring-pink-700"
				type="hidden"
				name="slug"
				placeholder="Wit"
				:value="slugName ? slugName : slug"
			/>
			<AddCancelContainer>
				<CancelButton url="/brands" />
				<AddButton button-type="submit">Merk toevoegen</AddButton>
			</AddCancelContainer>
		</FormComponent>
	</FormContainer>
</template>
