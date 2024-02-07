<script setup lang="ts">
import ArrowSvg from "../svg/ArrowSvg.vue";
const { to } = defineProps<{ to: string }>();
</script>

<template>
  <NuxtLink :to="`/brands/${to}`">
    <div class="px-4 flex gap-2">
      Bekijken <ArrowSvg class="flex-initial" />
    </div>
  </NuxtLink>
</template>
