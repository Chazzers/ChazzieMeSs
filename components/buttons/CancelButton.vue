<script lang="ts" setup>
import { buttonStyles } from "~/components/component-styles/button-styles";
import { buttonTransparentStyles } from "../component-styles/button-styles";
import InputContainer from "../form/form-input/InputContainer.vue";

const { url } = defineProps<{ url: string }>();
</script>

<template>
  <NuxtLink
    :to="url"
    :class="`${buttonStyles} ${buttonTransparentStyles} text-slate-700 border-slate-500 hover:bg-slate-500`"
  >
    <slot>Annuleren</slot>
  </NuxtLink>
</template>
