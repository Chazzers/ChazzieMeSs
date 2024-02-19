<script setup lang="ts">
const { open } = defineProps<{ open: boolean }>();
</script>

<template>
  <div>
    <button
      :class="[
        'fixed top-2 left-2 md:hidden p-4 bg-slate-100',
        open ? 'hidden' : '',
      ]"
      type="button"
      @click="$emit('openMenu')"
    >
      Menu
    </button>
    <slot></slot>
  </div>
</template>
