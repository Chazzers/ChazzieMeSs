<script setup lang="ts">
import InputContainer from "~/components/form/form-input/InputContainer.vue";
import InputLabel from "~/components/form/form-input/InputLabel.vue";
import { textInputStyles } from "~/components/component-styles/text-input-styles";

const { title, name, placeholder, value } = defineProps<{
  title: string;
  name: string;
  placeholder: string;
  value?: string;
}>();
const inputValue = ref("");
if (value) {
  inputValue.value = value;
}
</script>

<template>
  <InputContainer>
    <InputLabel :id="name">{{ title }}</InputLabel>
    <textarea
      :class="`${textInputStyles}`"
      type="textarea"
      :name="name"
      :id="name"
      :placeholder="placeholder"
      v-model="inputValue"
    ></textarea>
  </InputContainer>
</template>
