<script lang="ts" setup>
import { buttonStyles } from "~/components/component-styles/button-styles";
import { buttonTransparentStyles } from "../component-styles/button-styles";
import type { ButtonHTMLAttributes } from "vue";

const { buttonType } = defineProps<{
	buttonType: ButtonHTMLAttributes["type"];
}>();
</script>

<template>
	<button
		:class="`${buttonStyles} ${buttonTransparentStyles} border-slate-500 text-slate-700 hover:bg-slate-500`"
		:type="buttonType"
	>
		<slot>Annuleren</slot>
	</button>
</template>
