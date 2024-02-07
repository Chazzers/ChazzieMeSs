<script setup>
import { useCmsData } from "~/stores/cms-data";
const cmsData = useCmsData();
// if (!cmsData.data[0].id) {
//   await useFetch("/api/content/get-all-brand-data");
// }
</script>

<template>
  <section class="p-4 w-full">
    <h1 class="text-3xl font-bold underline bg-blue-500">Hello there</h1>
  </section>
</template>
