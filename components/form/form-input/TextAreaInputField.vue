<script setup lang="ts">
import InputContainer from "~/components/form/form-input/InputContainer.vue";
import InputLabel from "~/components/form/form-input/InputLabel.vue";
import { textInputStyles } from "~/components/component-styles/text-input-styles";

const { title, name, placeholder, value } = defineProps<{
	title: string;
	name: string;
	placeholder: string;
	value?: string;
}>();
const inputValue = ref("");
const minHeight = ref("");
const inputElement: Ref<HTMLTextAreaElement | null> = ref(null);
if (value) {
	inputValue.value = value;
}

function changeInputHeight() {
	const element = inputElement.value;
	const textAreaPadding = 8 * 2;

	if (element) {
		element.style.height = "1px";
		element.style.height = textAreaPadding + element.scrollHeight + "px";
	}
}

onMounted(() => {
	if (inputElement.value) {
		changeInputHeight();
	}
});
</script>

<template>
	<InputContainer>
		<InputLabel :id="name">{{ title }}</InputLabel>
		<textarea
			:id="name"
			ref="inputElement"
			v-model="inputValue"
			:class="`${textInputStyles} h-[${minHeight}px]`"
			type="textarea"
			:name="name"
			:placeholder="placeholder"
			@input="changeInputHeight"
		></textarea>
	</InputContainer>
</template>
