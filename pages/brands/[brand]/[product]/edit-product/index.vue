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
import { useCmsData } from "~/stores/cms-data";
import { Methods } from "~/components/form/MethodTypes";
import type { Product } from "@prisma/client";

const route = useRoute();
const cmsData = useCmsData();
const slugName = ref("");

const currentBrand = cmsData.data.find((item) => item.slug === route.params.brand);

let currentProduct: Product | undefined;

if (!currentBrand || !currentBrand.products) {
  await navigateTo("/brands");
} else {
  currentProduct = currentBrand.products.find((item) => item.slug === route.params.product);
  if (!currentProduct && currentBrand) {
    await navigateTo(`/brands/${currentBrand.slug}`);
  }

  if (currentProduct && currentProduct.slug) {
    slugName.value = currentProduct.slug;
  }
}
</script>

<template>
  <FormContainer>
    <FormTitle>Product toevoegen</FormTitle>
    <FormComponent action="/api/edit-product" :method="Methods.post" v-if="currentProduct">
      <TextInputField
        title="Naam"
        name="name"
        placeholder="Shaper"
        :is-slug="true"
        :value="currentProduct.name"
        @changed-slug-name="
          (payload: string) => {
            slugName = payload;
          }
        "
      />
      <ImageUploadField title="Product afbeelding" :value="currentProduct.image" />

      <TextInputField title="Product type" name="productType" placeholder="Broek" :value="currentProduct.productType" />
      <TextInputField title="Kleur" name="color" placeholder="Broek" :value="currentProduct.color" />
      <TextInputField title="Maat" name="size" placeholder="36-41" :value="currentProduct.size" />
      <TextInputField title="Prijs €" name="price" placeholder="250" :value="currentProduct.price" />
      <HiddenInputField name="brand" :value="route.params.brand" />
      <HiddenInputField name="slug" :value="slugName" />
      <HiddenInputField name="id" :value="currentProduct.id" />
      <AddCancelContainer>
        <CancelButton :url="`/brands/${route.params.brand}`">Cancel</CancelButton>
        <AddButton buttonType="submit">Product bewerken</AddButton>
      </AddCancelContainer>
    </FormComponent>
  </FormContainer>
</template>
