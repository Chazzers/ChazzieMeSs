<script setup>
import { useCmsData } from "~/stores/cms-data";
import AddLink from "~/components/buttons/AddLink.vue";
const cmsData = useCmsData();
</script>

<template>
  <section class="w-full p-4">
    <AddLink url="/create-page">Create page</AddLink>
  </section>
</template>
