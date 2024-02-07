import { defineStore } from "pinia";
import { ref } from "vue";
import type { BrandWithProducts } from "~/server/index";

export const useCmsData = defineStore("cmsData", () => {
  const data = ref<BrandWithProducts[]>([
    {
      id: "",
      name: "",
      image: "",
      description: "",
      slug: "",
    },
  ]);
  return { data };
});
