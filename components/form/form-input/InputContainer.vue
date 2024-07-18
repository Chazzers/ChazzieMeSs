<script setup lang="ts">
const { row } = defineProps<{ row?: boolean }>();
</script>

<template>
	<div
		:class="[
			'my-2 flex w-full items-start gap-2',
			row ? 'flex-row' : 'flex-col',
		]"
	>
		<slot></slot>
	</div>
</template>
