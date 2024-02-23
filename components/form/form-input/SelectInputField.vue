<script setup lang="ts">
import InputContainer from "./InputContainer.vue";
import InputLabel from "./InputLabel.vue";

const { name, options } = defineProps<{ name: string; options: any[] }>();
const emit = defineEmits<{ (e: "changeSelect"): void }>();
</script>

<template>
  <InputContainer>
    <InputLabel :id="name">Input: </InputLabel>
    <select
      :id="name"
      class="relative inline-block rounded-lg border border-solid border-slate-400 px-4 py-2 [appearance:none] after:block after:h-3 after:w-4 after:bg-hibiscus-700 after:content-[''] after:[clip-path:polygon(100%_0%,_0_0%,_50%_100%)] focus:border-hibiscus-700 focus:outline-none focus:ring-1 focus:ring-hibiscus-700"
      :name="name"
      @change="$emit('changeSelect')"
    >
      <option v-for="(fieldOption, index) in options" :key="index" :value="fieldOption">
        {{ fieldOption }}
      </option>
    </select>
  </InputContainer>
</template>
