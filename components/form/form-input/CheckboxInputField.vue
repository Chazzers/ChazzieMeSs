<script setup lang="ts">
import InputLabel from "~/components/form/form-input/InputLabel.vue";
import InputContainer from "~/components/form/form-input/InputContainer.vue";
import slugify from "~/utils/slugify";
const { name, value, title } = defineProps<{
	name: string;
	value: string;
	title: string;
}>();
</script>

<template>
	<InputContainer class="items-center" :row="true">
		<input
			:id="slugify(title)"
			class="relative m-0 h-4 w-4 origin-center appearance-none overflow-clip rounded border border-solid border-slate-400 bg-transparent before:absolute before:left-1/2 before:top-1/2 before:z-10 before:h-4/6 before:w-4/6 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-[url('/assets/images/ok.svg')] before:bg-cover before:content-[''] after:absolute after:left-1/2 after:top-1/2 after:h-full after:w-full after:origin-center after:-translate-x-1/2 after:-translate-y-1/2 after:scale-0 after:bg-hibiscus-700 after:transition-transform after:content-[''] checked:border-hibiscus-700 checked:after:scale-100"
			type="checkbox"
			:name="name"
			:value="value"
		/>
		<InputLabel :id="slugify(title)">{{ title }}</InputLabel>
	</InputContainer>
</template>
