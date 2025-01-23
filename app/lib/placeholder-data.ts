// This file contains placeholder data for Handcrafted Haven - Group 2

const sellers = [
    {
        id: '410544b2-4001-4271-9855-fec4b6a6442a',
        firstName: 'Admin',
        lastName: 'Account',
        businessName: 'Admin Account',
        email: 'admin@email.com',
        password: '12345678'
    },
    {
        firstName: 'Seller',
        lastName: 'Account',
        businessName: 'First Seller Account',
        email: 'seller@email.com',
        password: '87654321'
    },
];

const products = [
    {
        id: '1',
        productName: 'Product One',
        productDesc: 'The first product',
        price: '100.00',
        imageSRC: '/public/no-image.jpg',
    },
    {
        id: '',
        productName: 'Product Two',
        productDesc: 'The second product',
        price: '200.00',
        imageSRC: '/public/no-image.jpg',
    },

];

const reviews = [
    {
        id: '1',
        prodId: '1',
        customerName: 'Someone',
        stars: '5' ,
        review: 'Excellent!',
        date: '2025-01-23',
    },
    {
        id: '2',
        prodId: '2',
        customerName: 'Somebody',
        stars: '1' ,
        review: 'Awful.',
        date: '2025-1-23',
    },
];

export { sellers, products, reviews };