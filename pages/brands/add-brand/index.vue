<script setup lang="ts">
import TextInputField from "~/components/form/form-input/TextInputField.vue";
import ImageUploadField from "~/components/form/form-input/ImageUploadField.vue";
import TextAreaInputField from "~/components/form/form-input/TextAreaInputField.vue";
import FormComponent from "~/components/form/FormComponent.vue";
import AddButton from "~/components/buttons/AddButton.vue";
import FormContainer from "~/components/form/FormContainer.vue";
import FormTitle from "~/components/FormTitle.vue";
import HiddenInputFieldVue from "~/components/form/form-input/HiddenInputField.vue";
import CancelButton from "~/components/buttons/CancelButton.vue";
import AddCancelContainer from "~/components/AddCancelContainer.vue";

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
    <FormComponent method="post" action="/api/add-brand">
      <TextInputField
        placeholder="HIGH"
        name="name"
        title="Merk naam"
        @changedSlugName="
          (payload: string) => {
            slugName = payload;
          }
        "
        :isSlug="true"
        :value="name"
      />
      <ImageUploadField title="Merk afbeelding" :value="image" />
      <TextAreaInputField
        name="description"
        placeholder="Wit"
        title="Merk introductie tekst"
        :value="description"
      />
      <HiddenInputFieldVue
        class="border border-solid rounded-sm focus:outline-none border-pink-400 focus:ring-1 focus:ring-pink-700"
        type="hidden"
        name="slug"
        id="slug"
        placeholder="Wit"
        :value="slugName ? slugName : slug"
      />
      <AddCancelContainer>
        <CancelButton url="/brands" />
        <AddButton buttonType="submit">Merk toevoegen</AddButton>
      </AddCancelContainer>
    </FormComponent>
  </FormContainer>
</template>
