<script setup lang="ts">
import NavigationComponent from "~/components/navigation/NavigationComponent.vue";
import SectionWrapper from "~/components/SectionWrapper.vue";
</script>

<template>
	<div class="flex flex-row">
		<NavigationComponent></NavigationComponent>
		<SectionWrapper>
			<NuxtPage />
		</SectionWrapper>
	</div>
</template>
