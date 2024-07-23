<script lang="ts" setup>
import AddLink from "~/components/buttons/AddLink.vue";
import BrandSingle from "~/components/brands/BrandSingle.vue";
import BrandsList from "~/components/brands/BrandsList.vue";
import PageTitle from "~/components/PageTitle.vue";
import TitleFlex from "~/components/TitleFlex.vue";
import { useCmsData } from "~/stores/cms-data";

const cmsData = useCmsData();
</script>

<template>
	<section>
		<TitleFlex><PageTitle>Brands</PageTitle></TitleFlex>
		<AddLink url="/brands/add-brand">Add brand</AddLink>
		<BrandsList
			v-if="cmsData.data[0].id"
			:brands-amount="cmsData.data.length"
		>
			<BrandSingle
				v-for="(
					{ name, image, slug, description }, index
				) in cmsData.data"
				:key="index"
				:brand-name="name"
				:brand-img="image"
				:brand-link="slug"
				:brand-descr="description"
				:index="index"
			/>
		</BrandsList>
		<BrandsList v-else :brands-amount="1">No brands yet</BrandsList>
	</section>
</template>
