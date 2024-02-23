<script lang="ts" setup>
import { buttonStyles, buttonMainColorStyles } from "~/components/component-styles/button-styles";
import EditSvg from "../svg/EditSvg.vue";

const { url } = defineProps<{ url: string }>();
</script>

<template>
  <NuxtLink :to="url" :class="`${buttonStyles} ${buttonMainColorStyles} flex gap-4`">
    <slot></slot> <span><EditSvg class="size-6 flex-initial" /></span>
  </NuxtLink>
</template>
