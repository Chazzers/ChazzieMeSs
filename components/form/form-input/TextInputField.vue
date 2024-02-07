<script setup lang="ts">
import { Input } from "postcss";
import slugify from "../../../utils/slugify";
import InputContainer from "./InputContainer.vue";
import InputLabel from "./InputLabel.vue";
import { textInputStyles } from "~/components/component-styles/text-input-styles";

const { title, name, placeholder, isSlug, value } = defineProps<{
  title: string;
  name: string;
  placeholder: string;
  isSlug?: boolean;
  value?: string;
}>();

const slugName = ref("");
if (value) {
  slugName.value = value;
}
</script>

<template>
  <InputContainer>
    <InputLabel :id="name">{{ title }}</InputLabel>
    <input
      :class="`${textInputStyles}`"
      type="text"
      :name="name"
      :id="name"
      :placeholder="placeholder"
      v-model="slugName"
      @input="
        () => {
          if (isSlug) $emit('changedSlugName', slugify(slugName));
        }
      "
    />
  </InputContainer>
</template>
