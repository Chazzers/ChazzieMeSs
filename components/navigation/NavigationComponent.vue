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
  <NavigationContainer @openMenu="openMenu" :open="open">
    <SideBar
      @closeMenu="closeMenu"
      :class="[open ? 'translate-x-0 bg-slate-950/50' : '']"
    ></SideBar>
  </NavigationContainer>
</template>
