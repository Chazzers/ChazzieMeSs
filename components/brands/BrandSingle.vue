<script setup lang="ts">
import BrandLink from "./BrandLink.vue";

const { brandName, brandImg, brandLink, brandDescr, index } = defineProps<{
	brandName: string;
	brandImg: string;
	brandLink: string;
	brandDescr: string;
	index: number;
}>();
</script>

<template>
	<article
		:class="[
			`grid items-center gap-4 border-b border-solid border-slate-400 p-2 [grid-column:1/5] [grid-template-columns:subgrid] last:border-b-0 even:bg-slate-100`,
			`[grid-row:${index}]`,
		]"
	>
		<div class="h-16 w-16 shrink-0 overflow-hidden rounded-full">
			<img
				class="h-full w-full object-cover"
				:src="brandImg"
				:alt="`Image of ${brandName}`"
			/>
		</div>
		<h2 :class="[`flex-1 text-nowrap text-xl font-semibold`]">
			{{ brandName }}
		</h2>
		<p
			class="hidden flex-1 overflow-hidden text-ellipsis leading-6 [-webkit-box-orient:vertical] [-webkit-line-clamp:1] md:[display:-webkit-box]"
		>
			{{ brandDescr }}
		</p>
		<BrandLink :to="brandLink">Bekijken</BrandLink>
	</article>
</template>
