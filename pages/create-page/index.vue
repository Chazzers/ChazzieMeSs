<script setup lang="ts">
import { useCmsData } from "~/stores/cms-data";
import camelize from "~/utils/camelize";
import PopoverContainer from "~/components/PopoverContainer.vue";
import {
	AddButton,
	CancelButton,
	CancelLink,
} from "~/components/buttons/export";

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
	SlugInputField,
} from "~/components/form/FormExport";

type FormValues = {
	[key: string]:
		| FormDataEntryValue
		| FormDataEntryValue[]
		| string
		| undefined;
	type: string;
	name: string;
	placeholder?: string;
	title?: string;
	options?: any[];
	value?: any;
};

const cmsData = useCmsData();
const inputType = ref("text");
const newInputName = ref("");
type ArrayTypeNow = {
	[key: string]:
		| FormDataEntryValue
		| FormDataEntryValue[]
		| string
		| undefined;
	type: string;
	name: string;
	placeholder?: string;
	title?: string;
	options?: any[];
	value?: any;
};
const reactivePageFormData: Ref<ArrayTypeNow[]> = ref([]);

const formFields = {
	text: TextInputField,
	textarea: TextAreaInputField,
	hidden: HiddenInputField,
	image: ImageUploadField,
	select: SelectInputField,
	slug: SlugInputField,
};

const emptyFormField: Ref<{
	[key: string]:
		| FormDataEntryValue
		| FormDataEntryValue[]
		| string
		| undefined;
	type: string;
	name: string;
	placeholder?: string;
	title?: string;
	options?: any[];
	value?: any;
} | null> = ref(null);

const isPopoverOpen: Ref<boolean> = ref(false);
const fieldTitle = ref(null);
const titleInput = ref("");
const slugName = ref("");

onMounted(() => {
	emptyFormField.value = null;
});

function addFormFieldHandler() {
	emptyFormField.value = {
		name: "new",
		type: "text",
		title: "New",
		placeholder: "New",
		value: "",
		options: [""],
	};
	isPopoverOpen.value = true;
}

const inputsWithPlaceholders = ["text", "textarea"];
const inputsWithOptions = ["checkbox", "radio", "select"];

function changeHandler(event: Event) {
	const el = event.target as HTMLInputElement;
	inputType.value = el.value;
}

function addFieldToPageHandler(event: Event) {
	const el = event.target as HTMLFormElement;
	const formData = new FormData(el);

	const type = formData.get("type") as FormValues["type"];

	console.log(type);

	const allValues: FormValues = {
		title: "",
		name: "",
		type: type,
	};

	for (const pair of formData.entries()) {
		const [key, value] = pair;

		allValues[key as keyof FormValues] =
			formData.getAll(key).length === 1 ? value : formData.getAll(key);
	}

	if (!allValues.title) {
		console.log(fieldTitle.value);
	}

	emptyFormField.value = { ...emptyFormField.value, ...allValues };
	reactivePageFormData.value.push(emptyFormField.value);

	emptyFormField.value = null;
	inputType.value = "text";
	isPopoverOpen.value = false;
}

function addOption() {
	if (emptyFormField.value && Array.isArray(emptyFormField.value.options)) {
		emptyFormField.value.options.push("");
	}
}

function closeAddFieldWindow() {
	isPopoverOpen.value = false;
}
</script>

<template>
	<section class="w-full p-4">
		<FormContainer>
			<FormTitle>Add page</FormTitle>
			<FormComponent :method="Methods.POST" action="/api/create-page">
				<TextInputField
					placeholder="HIGH"
					name="name"
					title="Title"
					:is-slug="true"
					:value="titleInput"
					@changed-slug-name="
						(payload: string) => {
							slugName = payload;
						}
					"
				/>
				<SlugInputField :value="slugName"></SlugInputField>
				<!-- @ts-ignore -->
				<component
					:is="formFields[formField.type as keyof typeof formFields]"
					v-for="(formField, index) in reactivePageFormData"
					:key="index"
					:name="formField.name"
					:placeholder="formField.placeholder"
					:title="formField.title"
					:options="formField.options"
					:value="formField.value"
				></component>

				<AddButton
					class="justify-center"
					button-type="button"
					@click="addFormFieldHandler"
				>
					Add field
				</AddButton>

				<div class="flex gap-2">
					<CancelLink url="/">Cancel</CancelLink>
					<AddButton button-type="submit"> Create page </AddButton>
				</div>
			</FormComponent>
		</FormContainer>
		<PopoverContainer v-if="isPopoverOpen">
			<FormContainer>
				<FormTitle>Add Field</FormTitle>
				<FormComponent
					v-if="emptyFormField"
					:method="Methods.POST"
					action="/"
					@submit.prevent="addFieldToPageHandler"
				>
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
					<div class="flex gap-2">
						<AddButton class="my-2" button-type="submit">
							Add field
						</AddButton>
						<CancelButton
							button-type="button"
							class="my-2"
							@click="closeAddFieldWindow"
						>
							Cancel
						</CancelButton>
					</div>
				</FormComponent>
			</FormContainer>
		</PopoverContainer>
	</section>
</template>
