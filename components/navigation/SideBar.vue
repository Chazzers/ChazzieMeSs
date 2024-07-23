<script setup lang="ts"></script>

<template>
	<nav
		class="fixed inset-0 z-10 -translate-x-full transition-transform [contain:paint] md:static md:transform-none"
	>
		<div
			class="items-left flex h-full w-4/5 flex-col border-r border-solid border-slate-400 bg-white p-4 md:min-h-screen md:w-auto"
		>
			<div class="flex justify-between gap-4 md:hidden">
				<h2>Main Menu</h2>
				<button type="button" @click="$emit('closeMenu')">Close</button>
			</div>
			<ul>
				<li><NuxtLink href="/">Home</NuxtLink></li>
				<li><NuxtLink href="/brands">Brands</NuxtLink></li>
			</ul>
		</div>
	</nav>
</template>
