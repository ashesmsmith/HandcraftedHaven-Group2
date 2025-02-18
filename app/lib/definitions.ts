
export type SellerAccountsTable = {
    account_id: string;
    account_type: 'Seller';
    firstName: string;
    lastName: string;
    businessName: string;
    tax_id: number;
    address: string;
    phone: string;
    email: string;
    password: string;
    profile_id: string;
    story_heading: string;
    story: string;
    image: string;
}

export type ProductsTable = {
    product_id: string;
    account_id: string;
    productName: string;
    productDesc: string;
    category: 'Pottery' | 'Clothing' |  'Jewelry' |  'Stickers' |  'Woodworking' |  'Other'
    color: 'Black' |  'White' |  'Gray' |  'Brown' |  'Red' |  'Orange' |  'Yellow' |  'Green' |  'Blue' |  'Purple' |  'Pink' |  'Multi'
    price: string;
    imageSRC: string;
}

export type OrdersTable = {
    order_id: string;
    account_id: string;
    date: string;
    shipping: number;
    tax: number;
    final_total: number;
    status: 'Shipped' | 'Canceled' | 'Processed';
}

export type OrderProductsTable = {
    order_id: string;
    product_id: string;
    price: number;
    quantity: number;
    total: number;
}
export type Review = {
    product_id: string;
    account_id: string;
    stars: number;
    review: string;
    date: string;
};
export type ProductWithSeller = ProductsTable & {
    businessName: string | null; // Sellers might not have a business name
};
