<script setup lang="ts">
import TextInputField from "~/components/form/form-input/TextInputField.vue";
import FormComponent from "~/components/form/FormComponent.vue";
import FormContainer from "~/components/form/FormContainer.vue";
import HiddenInputField from "~/components/form/form-input/HiddenInputField.vue";
import FormTitle from "~/components/FormTitle.vue";
import AddButton from "~/components/buttons/AddButton.vue";
import CancelButton from "~/components/buttons/CancelButton.vue";
import ImageUploadField from "~/components/form/form-input/ImageUploadField.vue";
import AddCancelContainer from "~/components/AddCancelContainer.vue";
const route = useRoute();
const slugName = ref("");
</script>

<template>
  <FormContainer>
    <FormTitle>Product toevoegen</FormTitle>
    <FormComponent action="/api/add-product" method="post">
      <TextInputField
        title="Naam"
        name="name"
        placeholder="Shaper"
        @changedSlugName="
          (payload: string) => {
            slugName = payload;
          }
        "
        :isSlug="true"
      />
      <ImageUploadField title="Product afbeelding" />

      <TextInputField
        title="Product type"
        name="productType"
        placeholder="Broek"
      />
      <TextInputField title="Kleur" name="color" placeholder="Broek" />
      <TextInputField title="Maat" name="size" placeholder="36-41" />
      <TextInputField title="Prijs €" name="price" placeholder="250" />
      <HiddenInputField name="brand" :value="route.params.brand" />
      <AddCancelContainer>
        <CancelButton :url="`/brands/${route.params.brand}`"
          >Cancel</CancelButton
        >
        <AddButton buttonType="submit">Product toevoegen</AddButton>
      </AddCancelContainer>
    </FormComponent>
  </FormContainer>
</template>
