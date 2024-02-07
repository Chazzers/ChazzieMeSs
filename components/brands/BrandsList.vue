<script setup lang="ts">
const { brandsAmount } = defineProps<{ brandsAmount: number }>();
</script>

<template>
  <div
    :class="[
      'w-full mt-4 rounded-lg overflow-clip border border-solid border-slate-400 grid grid-cols-4[grid-template-columns:5rem_3fr_1fr_1fr]',
      `grid-rows-${brandsAmount}`,
    ]"
  >
    <slot></slot>
  </div>
</template>
