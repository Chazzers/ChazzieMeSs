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

const slugName = ref("");
</script>

<template>
	<FormContainer>
		<FormTitle>Add brand</FormTitle>
		<FormComponent :method="Methods.POST" action="/api/add-brand">
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
