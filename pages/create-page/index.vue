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

function addFormFieldHandler() {
  emptyFormField.value = {
    name: "new",
    type: "text",
    title: "New",
    placeholder: "New",
    isContentName: false,
    value: "",
  };
}

function changeHandler(event: Event) {
  const el = event.target as HTMLInputElement;
  inputType.value = el.value;
}

function addFieldToPageHandler(event: Event) {
  const el = event.target as HTMLFormElement;
  const formData = new FormData(el);
  const formValues = Object.fromEntries(formData);
  emptyFormField.value = { ...emptyFormField.value, ...formValues };
  reactivePageFormData.value.push(emptyFormField.value);
  emptyFormField.value = null;
}
</script>

<template>
  <section class="w-full p-4">
    <FormContainer>
      <FormTitle>Add page</FormTitle>
      <componen
        :is="formFields[formField.type]"
        v-for="(formField, index) in reactivePageFormData"
        :key="index"
        :name="formField.name"
        :placeholder="formField.placeholder"
        :title="formField.title"
      ></componen>

      <FormComponent :method="Methods.post" action="/api/create-page">
        <FormComponent v-if="emptyFormField" :method="Methods.post" action="/" @submit.prevent="addFieldToPageHandler">
          <div class="flex items-end">
            <SelectInputField name="type" :options="Object.keys(formFields)" @change-select="() => changeHandler" />
            <TextInputField
              name="title"
              title="Title"
              placeholder="Title"
              :is-slug="true"
              @changed-slug-name="
                (payload: string) => {
                  newInputName = camelize(payload);
                }
              "
            />
            <HiddenInputField name="name" :value="newInputName" />
            <TextInputField
              v-if="inputType !== 'hidden' && inputType !== 'image'"
              name="placeholder"
              title="Placeholder"
              placeholder="Placeholder"
            />
            <AddButton button-type="submit">Add field</AddButton>
          </div>
        </FormComponent>

        <AddButton button-type="button" @click="addFormFieldHandler"> Add field </AddButton>
      </FormComponent>
    </FormContainer>
  </section>
</template>
