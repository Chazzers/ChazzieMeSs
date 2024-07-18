<script setup lang="ts">
const { open } = defineProps<{ open: boolean }>();
</script>

<template>
	<div>
		<button
			:class="[
				'fixed left-2 top-2 bg-slate-100 p-4 md:hidden',
				open ? 'hidden' : '',
			]"
			type="button"
			@click="$emit('openMenu')"
		>
			Menu
		</button>
		<slot></slot>
	</div>
</template>
