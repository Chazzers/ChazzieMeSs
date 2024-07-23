<script lang="ts" setup>
import AddLink from "~/components/buttons/AddLink.vue";
import ProductSingle from "~/components/products/ProductSingle.vue";
import ProductContainer from "~/components/products/ProductContainer.vue";
import ProductsList from "~/components/products/ProductsList.vue";

import PageTitle from "~/components/PageTitle.vue";
import FormTitle from "~/components/FormTitle.vue";
import TitleFlex from "~/components/TitleFlex.vue";
import { useCmsData } from "~/stores/cms-data";
import EditLink from "~/components/buttons/EditLink.vue";
const route = useRoute();
const cmsData = useCmsData();
const currentBrand = cmsData.data.find(
	(item) => item.slug === route.params.brand,
);
if (!currentBrand) {
	await navigateTo("/brands");
}
</script>

<template>
	<section v-if="currentBrand">
		<TitleFlex>
			<PageTitle>{{ currentBrand.name }}</PageTitle>
			<EditLink :url="`/brands/${route.params.brand}/edit-brand`">
				Edit brand
			</EditLink>
		</TitleFlex>

		<p>{{ currentBrand.description }}</p>
		<TitleFlex>
			<FormTitle>Producten</FormTitle>
			<AddLink :url="`/brands/${route.params.brand}/add-product`">
				Product toevoegen
			</AddLink>
		</TitleFlex>
		<ProductsList
			v-if="
				currentBrand &&
				currentBrand.products &&
				currentBrand.products.length
			"
			:products-amount="currentBrand.products.length"
		>
			<ProductContainer
				v-for="(
					{ name, productType, image, color, size, price, slug },
					index
				) in currentBrand.products"
				:key="index"
				:slug="slug"
				:brand-slug="route.params.brand"
			>
				<ProductSingle
					:name="name"
					:product-type="productType"
					:image="image"
					:color="color"
					:size="size"
					:price="price"
				/>
			</ProductContainer>
		</ProductsList>

		<ProductsList v-else :products-amount="1">No products yet</ProductsList>
	</section>
</template>
