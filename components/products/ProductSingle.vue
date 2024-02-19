<script setup lang="ts">
const { name, productType, image, color, size, price } = defineProps<{
  name: string;
  productType: string;
  image: string;
  color: string;
  size: string;
  price: string;
}>();
</script>

<template>
  <article
    class="flex flex-col gap-2 border border-solid border-slate-400 rounded-lg pb-4 overflow-hidden"
  >
    <div class="w-full h-auto">
      <img
        class="w-full object-cover object-center h-64 md:h-96"
        :src="`${image}`"
        :alt="`Image of ${name}`"
      />
    </div>
    <h2 class="px-4 pt-4">Naam: {{ name }}</h2>
    <p class="px-4">Type: {{ productType }}</p>

    <p class="px-4">Kleur: {{ color }}</p>
    <p class="px-4">Maat: {{ size }}</p>
    <p class="px-4">Prijs: €{{ price }}</p>
  </article>
</template>
