export interface ICategory {
    name: string;
}
export interface IProduct {
    category: string;
    description: string;
    images: { url: string; name: string }[];
    name: string;
    number: string;
    slug: string;
}
