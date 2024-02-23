<script setup lang="ts">
const { value, name } = defineProps<{
  value: string | string[];
  name: string;
}>();
</script>

<template>
  <input :id="name" class="hidden" type="hidden" :name="name" placeholder="Wit" :value="value" />
</template>
