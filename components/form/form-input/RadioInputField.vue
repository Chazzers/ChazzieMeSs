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
			class="relative m-0 h-4 w-4 origin-center appearance-none rounded-full border border-solid border-slate-400 bg-transparent after:absolute after:left-1/2 after:top-1/2 after:h-5/6 after:w-5/6 after:origin-center after:-translate-x-1/2 after:-translate-y-1/2 after:scale-0 after:rounded-full after:bg-hibiscus-700 after:transition-transform after:content-[''] checked:border-hibiscus-700 checked:after:scale-100"
			type="radio"
			:name="name"
			:value="value"
		/>
		<InputLabel :id="slugify(title)">{{ title }}</InputLabel>
	</InputContainer>
</template>
