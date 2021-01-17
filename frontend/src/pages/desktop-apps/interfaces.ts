export interface Category {
    name: string;
}

export interface Product {
    category: string;
    description: string;
    images: { url: string; name: string }[];
    name: string;
    number: string;
    slug: string;
}
