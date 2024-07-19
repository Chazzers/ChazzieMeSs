<script setup lang="ts">
import { useCmsData } from "~/stores/cms-data";
import AddButton from "~/components/buttons/AddButton.vue";
import camelize from "~/utils/camelize";
import {
	FormComponent,
	FormContainer,
	FormTitle,
	Methods,
	TextInputField,
	HiddenInputField,
	ImageUploadField,
	TextAreaInputField,
	SelectInputField,
	RadioInputField,
	CheckboxInputField,
	WYSIWYGInputField,
} from "~/components/form/FormExport";

const cmsData = useCmsData();
const inputType = ref("text");
const newInputName = ref("");

const reactivePageFormData = ref([
	{
		name: "title",
		type: "text",
		title: "Title",
		placeholder: "Page Title",
		isContentName: false,
		value: "",
		options: [""],
	},
]);

const formFields: any = {
	text: TextInputField,
	textarea: TextAreaInputField,
	hidden: HiddenInputField,
	image: ImageUploadField,
	select: SelectInputField,
};

const emptyFormField: any = ref(null);
const fieldTitle = ref(null);

onMounted(() => {
	emptyFormField.value = null;
});

function addFormFieldHandler() {
	emptyFormField.value = {
		name: "new",
		type: "text",
		title: "New",
		placeholder: "New",
		isContentName: false,
		value: "",
		options: [""],
	};
}

const inputsWithPlaceholders = ["text", "textarea"];
const inputsWithOptions = ["checkbox", "radio", "select"];

function changeHandler(event: Event) {
	const el = event.target as HTMLInputElement;
	inputType.value = el.value;
}
interface FormValues {
	title: FormDataEntryValue | FormDataEntryValue[] | string;
	placeholder?: FormDataEntryValue | FormDataEntryValue[] | string;
	options?: FormDataEntryValue | FormDataEntryValue[];
	name: FormDataEntryValue | FormDataEntryValue[];
}
function addFieldToPageHandler(event: Event) {
	const el = event.target as HTMLFormElement;
	const formData = new FormData(el);
	const allValues: FormValues = {
		title: "",
		name: "",
	};
	for (const pair of formData.entries()) {
		allValues[pair[0] as keyof typeof allValues] =
			formData.getAll(pair[0]).length === 1
				? pair[1]
				: formData.getAll(pair[0]);
	}
	if (!allValues.title) {
		console.log(fieldTitle.value);
	}
	emptyFormField.value = { ...emptyFormField.value, ...allValues };
	reactivePageFormData.value.push(emptyFormField.value);
	emptyFormField.value = null;
	inputType.value = "text";
}

function addOption() {
	emptyFormField.value.options.push("");
}
</script>

<template>
	<section class="w-full p-4">
		<FormContainer>
			<FormTitle>Add page</FormTitle>
			<FormComponent :method="Methods.post" action="/api/create-page">
				<component
					:is="formFields[formField.type]"
					v-for="(formField, index) in reactivePageFormData"
					:key="index"
					:name="formField.name"
					:placeholder="formField.placeholder"
					:title="formField.title"
					:options="formField.options"
				></component>

				<WYSIWYGInputField
					name="wysiwyg"
					title="wysiwyg"
					value=""
					placeholder="wysiwyg"
				/>

				<FormComponent
					v-if="emptyFormField"
					:method="Methods.POST"
					action="/"
					@submit.prevent="addFieldToPageHandler"
				>
					<div class="flex items-end gap-2">
						<SelectInputField
							name="type"
							:options="Object.keys(formFields)"
							@change-select="(event) => changeHandler(event)"
						/>
						<TextInputField
							ref="fieldTitle"
							name="title"
							title="Title"
							placeholder="Title"
							:is-slug="true"
							:index="0"
							@changed-slug-name="
								(payload: string) => {
									newInputName = camelize(payload);
								}
							"
						/>
						<HiddenInputField name="name" :value="newInputName" />
						<TextInputField
							v-if="inputsWithPlaceholders.includes(inputType)"
							name="placeholder"
							title="Placeholder"
							placeholder="Placeholder"
							:index="0"
						/>
						<div
							v-if="inputsWithOptions.includes(inputType)"
							class="flex w-full items-end gap-2"
						>
							<div class="flex flex-col">
								<TextInputField
									v-for="(
										option, index
									) in emptyFormField.options"
									:key="index"
									name="options"
									title="Options"
									placeholder="Option"
									:index="index"
								/>
							</div>
							<AddButton
								class="my-2"
								button-type="button"
								@click="addOption"
							></AddButton>
						</div>

						<AddButton class="my-2" button-type="submit"
							>Add field</AddButton
						>
					</div>
				</FormComponent>

				<AddButton button-type="button" @click="addFormFieldHandler">
					Add field
				</AddButton>
			</FormComponent>
		</FormContainer>
	</section>
</template>
