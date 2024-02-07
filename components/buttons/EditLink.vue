<script lang="ts" setup>
import {
  buttonStyles,
  buttonMainColorStyles,
} from "~/components/component-styles/button-styles";
import EditSvg from "../svg/EditSvg.vue";

const { url } = defineProps<{ url: string }>();
</script>

<template>
  <NuxtLink
    :to="url"
    :class="`${buttonStyles} ${buttonMainColorStyles} flex gap-4`"
  >
    <slot></slot> <span><EditSvg class="flex-initial size-6" /></span>
  </NuxtLink>
</template>
