<script lang="ts" setup>
import type { ButtonHTMLAttributes } from "vue";
import {
	buttonStyles,
	buttonMainColorStyles,
} from "~/components/component-styles/button-styles";

const { buttonType } = defineProps<{
	buttonType: ButtonHTMLAttributes["type"];
}>();
</script>

<template>
	<button
		:type="buttonType"
		:class="`${buttonStyles} ${buttonMainColorStyles}`"
	>
		<slot></slot> <span>+</span>
	</button>
</template>
