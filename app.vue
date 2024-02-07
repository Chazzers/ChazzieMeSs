<script setup lang="ts">
import SideBar from "~/components/SideBar.vue";
import SectionWrapper from "~/components/SectionWrapper.vue";
</script>

<template>
  <div class="flex flex-row">
    <SideBar></SideBar>
    <SectionWrapper>
      <NuxtPage />
    </SectionWrapper>
  </div>
</template>
