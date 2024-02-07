<script setup lang="ts">
import BrandLink from "./BrandLink.vue";

const { brandName, brandImg, brandLink, brandDescr, index } = defineProps<{
  brandName: string;
  brandImg: string;
  brandLink: string;
  brandDescr: string;
  index: number;
}>();
</script>

<template>
  <!-- <article
    class="flex items-center border-b last:border-b-0 border-solid border-slate-400 even:bg-slate-100 gap-4 p-2"
  > -->
  <article
    :class="[
      `grid border-b last:border-b-0 border-solid border-slate-400 even:bg-slate-100 gap-4 p-2 [grid-column:1/5] items-center [grid-template-columns:subgrid]`,
      `[grid-row:${index}]`,
    ]"
  >
    <div class="rounded-full overflow-hidden h-16 w-16 shrink-0">
      <img
        class="w-full h-full object-cover"
        :src="brandImg"
        :alt="`Image of ${brandName}`"
      />
    </div>
    <h2 :class="[`font-semibold text-xl text-nowrap flex-1`]">
      {{ brandName }}
    </h2>
    <p
      class="hidden flex-1 text-ellipsis overflow-hidden leading-6 md:[display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical]"
    >
      {{ brandDescr }}
    </p>
    <BrandLink :to="brandLink">Bekijken</BrandLink>
  </article>
</template>
