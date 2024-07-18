<script setup lang="ts">
import slugify from "../../../utils/slugify";
import InputContainer from "./InputContainer.vue";
import InputLabel from "./InputLabel.vue";
import { textInputStyles } from "~/components/component-styles/text-input-styles";

const { title, name, placeholder, isSlug, value, index } = defineProps<{
	title: string;
	name: string;
	placeholder: string;
	isSlug?: boolean;
	value?: string;
	index?: number;
}>();

const slugName = ref("");
if (value) {
	slugName.value = value;
}
defineEmits<{ (e: "changedSlugName", str: string): void }>();
</script>

<template>
	<InputContainer>
		<InputLabel v-if="index === 0 || index === undefined" :id="name">{{
			title
		}}</InputLabel>
		<input
			:id="index === 0 || index === undefined ? name : ''"
			v-model="slugName"
			:class="`${textInputStyles}`"
			type="text"
			:name="name"
			:placeholder="placeholder"
			@input="
				() => {
					if (isSlug) $emit('changedSlugName', slugify(slugName));
				}
			"
		/>
	</InputContainer>
</template>
