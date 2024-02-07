<script setup lang="ts">
const { method, action } = defineProps<{
  method: "get" | "post" | "dialog";
  action: string;
}>();
</script>

<template>
  <form
    class="w-full flex flex-col gap-4 my-4"
    :action="action"
    :method="method"
    autocomplete="on"
  >
    <slot></slot>
  </form>
</template>
