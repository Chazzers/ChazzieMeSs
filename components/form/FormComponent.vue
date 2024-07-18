<script setup lang="ts">
import { Methods } from "~/components/form/MethodTypes";
const { method, action } = defineProps<{
	method: Methods;
	action: string;
}>();
</script>

<template>
	<form
		class="my-4 flex w-full flex-col gap-4"
		:action="action"
		:method="method"
		autocomplete="on"
	>
		<slot></slot>
	</form>
</template>
