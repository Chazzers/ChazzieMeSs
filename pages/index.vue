<script setup lang="ts">
import { useCmsData } from "~/stores/cms-data";
import {
	FormContainer,
	FormComponent,
	ImageUploadField,
	TextAreaInputField,
	HiddenInputField,
	Methods,
	TextInputField,
	FormTitle,
} from "~/components/form/FormExport";

import { AddButton, CancelLink } from "~/components/buttons/export";
import AddCancelContainer from "~/components/AddCancelContainer.vue";

const slug = "/";
const image = "/assets/images/juli-homepage.webp";
const description = `Welkom op de website van Lab Women’s Clothing. De website wordt regelmatig geupdate met nieuwe items, dus hou het in de gaten!

Je kunt de gehele collectie bekijken door op de knop collectie in het menu te klikken, dan ga je naar het merk waarin je geïnteresseerd bent, bijvoorbeeld Drykorn, je klikt op de “lees meer’ knop en vervolgens zie je daar de collectie die we hebben ingekocht met alle informatie.`;
</script>

<template>
	<FormContainer>
		<FormTitle>Home</FormTitle>
		<FormComponent :method="Methods.POST" action="/api/add-brand">
			<TextInputField
				placeholder="Lab Women's Clothing"
				name="name"
				title="Page Title"
				value="Lab Women's Clothing"
			/>
			<ImageUploadField title="Hero image" :value="image" />
			<TextAreaInputField
				title="Introduction text"
				name="description"
				placeholder="Wit"
				:value="description"
			/>
			<HiddenInputField
				id="slug"
				type="hidden"
				name="slug"
				placeholder="Wit"
				:value="slug"
			/>
			<AddCancelContainer>
				<CancelLink url="/brands">Cancel</CancelLink>
				<AddButton button-type="submit">Save changes</AddButton>
			</AddCancelContainer>
		</FormComponent>
	</FormContainer>
</template>
