<script setup lang="ts">
import InputContainer from "./InputContainer.vue";
import InputLabel from "./InputLabel.vue";
import { textInputStyles } from "~/components/component-styles/text-input-styles";

const { value } = defineProps<{
	value?: string;
}>();
</script>

<template>
	<InputContainer>
		<InputLabel :id="'slug'">Slug</InputLabel>
		<input
			id="slug"
			:class="`${textInputStyles} text-slate-600`"
			type="text"
			name="slug"
			:value="`/${value}`"
			disabled
		/>
	</InputContainer>
</template>
