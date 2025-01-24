// This file contains placeholder data for Handcrafted Haven - Group 2

const sellers = [
    {
        seller_id: '1001',
        firstName: 'Admin',
        lastName: 'Account',
        businessName: 'Admin Account',
        email: 'admin@email.com',
        password: 'Abc12345'
    },
    {
        seller_id: '1002',
        firstName: 'Seller',
        lastName: 'Account',
        businessName: 'First Seller Account',
        email: 'seller@email.com',
        password: 'Abc12345'
    },
];

const products = [
    {
        product_id: '1001',
        seller_id: '1001',
        productName: 'Product One',
        productDesc: 'The first product',
        price: '100.00',
        imageSRC: '/public/no-image.jpg',
    },
    {
        product_id: '1002',
        seller_id: '1002',
        productName: 'Product Two',
        productDesc: 'The second product',
        price: '200.00',
        imageSRC: '/public/no-image.jpg',
    },

];

const customers = [
    {
        customer_id: '1001',
        firstName: 'Mock',
        lastName: 'Customer',
        address: '123 Main Street, Some City, ID, 12345',
        phone: '555-555-5555',
        email: 'mockcustomer@email.com',
        password: 'Abc12345'
    },
    {
        customer_id: '1002',
        firstName: 'Another',
        lastName: 'Customer',
        address: '456 Main Street, Somewhere, UT, 54321',
        phone: '444-444-4444',
        email: 'anothercust@email.com',
        password: 'Abc12345'
    },
];

const orders = [
    {
        order_id: '1001',
        customer_id: '1002',
        date: '2025-01-23',
        products: [
            {
                product_id: '1001',
                quantity: '2'
            },
            {
                product_id: '1002',
                quantity: '4'
            }
        ] ,
        status: 'shipped',
    },
    {
        order_id: '1002',
        customer_id: '1001',
        date: '2025-01-23',
        products: [
            {
                product_id: '1001',
                quantity: '1'
            },
            {
                product_id: '1002',
                quantity: '1'
            }
        ] ,
        status: 'processed',
    },
];

const reviews = [
    {
        review_id: '1001',
        product_id: '1001',
        customer_id: '1002',
        stars: '5' ,
        review: 'Excellent!',
        date: '2025-01-23',
    },
    {
        review_id: '1002',
        product_id: '1002',
        customer_id: '1001',
        stars: '1' ,
        review: 'Awful.',
        date: '2025-1-23',
    },
];

export { sellers, products, customers, orders, reviews };