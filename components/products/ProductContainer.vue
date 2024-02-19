<script setup lang="ts">
const { slug } = defineProps<{
  slug: string;
  brandSlug: string | string[];
}>();
import EditLink from "../buttons/EditLink.vue";
</script>

<template>
  <div class="relative">
    <div class="absolute right-4 top-4">
      <EditLink :url="`/brands/${brandSlug}/${slug}/edit-product`"> </EditLink>
    </div>
    <slot></slot>
  </div>
</template>
