export interface AddBrandBody {
	name: string;
	image: File | string;
	description: string;
	slug: string;
	products: any[];
}

export interface EditBrandBody extends AddBrandBody {
	id: string;
}

export interface AddProductBody {
	name: string;
	productType: string;
	image: File | string;
	color: string;
	size: string;
	price: string;
	brand: string;
	slug: string;
}
export interface EditProductBody extends AddProductBody {
	id: string;
}

export type CreatePageBody = {
	title: string;
	slug: string;
	[key: string]: string | number | File;
};
