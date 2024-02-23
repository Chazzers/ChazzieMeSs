<script setup lang="ts">
const { brandsAmount } = defineProps<{ brandsAmount: number }>();
</script>

<template>
  <div
    :class="[
      'grid-cols-4[grid-template-columns:5rem_3fr_1fr_1fr] mt-4 grid w-full overflow-clip rounded-lg border border-solid border-slate-400',
      `grid-rows-${brandsAmount}`,
    ]"
  >
    <slot></slot>
  </div>
</template>
