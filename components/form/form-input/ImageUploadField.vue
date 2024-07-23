<script setup lang="ts">
import { buttonStyles } from "~/components/component-styles/button-styles";
import { buttonTransparentStyles } from "~/components/component-styles/button-styles";
import HiddenInputField from "./HiddenInputField.vue";

const { title, value } = defineProps<{ title: string; value?: string }>();

const file = ref<File | string>("");
const newlyUploadedFile = ref<string>("");
const fileName = ref<string>("");

const handleFileChange = async (fileData: Event) => {
	const fileInputData = fileData.target as HTMLInputElement;
	if (fileInputData.files && fileInputData.files?.length > 0) {
		file.value = fileInputData.files[0];
	}
	await handleFileUpload();
};

const handleFileUpload = async () => {
	const body = new FormData();
	const cloudName = "djbxfueac";
	body.append("file", file.value);
	body.append("upload_preset", "jowlsui9");

	const res = await fetch(
		`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
		{
			body: body,
			method: "POST",
		},
	);

	if (!res.ok) return;

	const uploadResult = await res.json();

	newlyUploadedFile.value = uploadResult.secure_url;
	fileName.value = uploadResult.original_filename;
};

if (value) {
	newlyUploadedFile.value = value;
}
</script>

<template>
	<div class="my-2 flex w-full flex-row items-center justify-start gap-4">
		<div
			:class="`h-32 w-32 overflow-clip rounded-full border border-solid ${
				newlyUploadedFile || value
					? 'border-hibiscus-700'
					: 'border-slate-400'
			}`"
		>
			<img
				class="h-full w-full object-cover"
				:src="newlyUploadedFile"
				alt=""
				v-if="newlyUploadedFile"
			/>
		</div>
		<label
			:class="`${buttonStyles} ${buttonTransparentStyles} border-hibiscus-700 text-hibiscus-700 hover:bg-hibiscus-700`"
			for="image"
		>
			{{ title }} <span>+</span>
		</label>

		<input
			id="image"
			type="file"
			placeholder="Wit"
			class="hidden w-full"
			@change="handleFileChange"
		/>
		<HiddenInputField
			name="image"
			:value="newlyUploadedFile"
		></HiddenInputField>
	</div>
</template>
