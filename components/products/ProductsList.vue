<script setup lang="ts">
const { productsAmount } = defineProps<{ productsAmount?: number }>();
</script>

<template>
	<div
		v-if="productsAmount"
		:class="[
			'grid grid-cols-1 gap-4 overflow-clip rounded-lg py-4',
			`grid-rows-${productsAmount}`,
			`md:grid-cols-2 md:grid-rows-${
				productsAmount > 2 ? Math.round(productsAmount / 2) : 1
			}`,
			`lg:grid-cols-3 lg:grid-rows-${
				productsAmount > 3 ? Math.round(productsAmount / 3) : 1
			}`,
			`xl:grid-cols-4 lg:grid-rows-${
				productsAmount > 4 ? Math.round(productsAmount / 4) : 1
			}`,
			`2xl:grid-cols-5 lg:grid-rows-${
				productsAmount > 5 ? Math.round(productsAmount / 5) : 1
			}`,
		]"
	>
		<slot></slot>
	</div>
</template>
