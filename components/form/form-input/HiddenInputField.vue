<script setup lang="ts">
const { value, name } = defineProps<{
  value: string | string[];
  name: string;
}>();
</script>

<template>
  <input
    class="hidden"
    type="hidden"
    :name="name"
    :id="name"
    placeholder="Wit"
    :value="value"
  />
</template>
