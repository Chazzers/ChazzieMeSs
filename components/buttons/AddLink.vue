<script lang="ts" setup>
import {
	buttonStyles,
	buttonMainColorStyles,
} from "~/components/component-styles/button-styles";

const { url } = defineProps<{ url: string }>();
</script>

<template>
	<NuxtLink :to="url" :class="`${buttonStyles} ${buttonMainColorStyles}`"
		><slot></slot> <span>+</span></NuxtLink
	>
</template>
