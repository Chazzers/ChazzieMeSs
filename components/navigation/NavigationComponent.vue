<script setup lang="ts">
import NavigationContainer from "~/components/navigation/NavigationContainer.vue";
import SideBar from "~/components/navigation/SideBar.vue";
const open = ref(false);

const openMenu = (event: any) => {
	open.value = true;
};
const closeMenu = (event: any) => {
	open.value = false;
};
</script>

<template>
	<NavigationContainer :open="open" @open-menu="openMenu">
		<SideBar
			:class="[open ? 'translate-x-0 bg-slate-950/50' : '']"
			@close-menu="closeMenu"
		></SideBar>
	</NavigationContainer>
</template>
