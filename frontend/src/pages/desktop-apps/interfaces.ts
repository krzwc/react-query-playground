export interface Department {
    name: string;
}

export interface Product {
    department: string;
    description: string;
    images: { url: string; name: string }[];
    name: string;
    number: string;
    slug: string;
}
