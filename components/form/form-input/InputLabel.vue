<script setup lang="ts">
const { id } = defineProps<{ id: string }>();
</script>

<template>
  <label class="w-full text-xl font-medium" :for="id">
    <slot></slot>
  </label>
</template>
