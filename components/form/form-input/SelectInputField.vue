<script setup lang="ts">
import InputContainer from "./InputContainer.vue";
import InputLabel from "./InputLabel.vue";

const { name, options } = defineProps<{ name: string; options: any[] }>();
const emit = defineEmits<{ (e: "changeSelect", value: Event): void }>();
</script>

<template>
	<InputContainer>
		<InputLabel :id="name">Input</InputLabel>
		<div
			class="relative w-full after:absolute after:right-2 after:top-4 after:block after:h-2 after:w-3 after:bg-slate-400 after:content-[''] after:[clip-path:polygon(100%_0%,_0_0%,_50%_100%)] has-[:focus]:after:bg-hibiscus-700"
		>
			<select
				:id="name"
				class="block w-full rounded-lg border border-solid border-slate-400 py-2 pl-4 pr-8 [appearance:none] focus:border-hibiscus-700 focus:outline-none focus:ring-1 focus:ring-hibiscus-700"
				:name="name"
				@change="(event) => $emit('changeSelect', event)"
			>
				<option
					v-for="(fieldOption, index) in options"
					:key="index"
					:value="fieldOption"
				>
					{{ fieldOption }}
				</option>
			</select>
		</div>
	</InputContainer>
</template>
