<script lang="ts" setup>
import { buttonStyles } from "~/components/component-styles/button-styles";
import { buttonTransparentStyles } from "../component-styles/button-styles";

const { url } = defineProps<{ url: string }>();
</script>

<template>
	<NuxtLink
		:to="url"
		:class="`${buttonStyles} ${buttonTransparentStyles} border-slate-500 text-slate-700 hover:bg-slate-500`"
	>
		<slot>Annuleren</slot>
	</NuxtLink>
</template>
