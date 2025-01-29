// This file contains placeholder data for Handcrafted Haven - Group 2

const accounts = [
    {
        account_id: '1001',
        account_type: 'Admin',
        firstName: 'Admin',
        lastName: 'Account',
        businessName: 'Admin Account',
        tax_id: '',
        address: '123 Admin Street, Some City, UT, 54321',
        phone: '111-111-1111',
        email: 'admin@email.com',
        password: 'Abc12345',
    },
    {
        account_id: '1002',
        account_type: 'Seller',
        firstName: 'Seller',
        lastName: 'Account',
        businessName: 'My Small Business',
        tax_id: '1234567890',
        address: '456 Seller Street, Somewhere, UT, 12345',
        phone: '222-222-2222',
        email: 'seller@email.com',
        password: 'Abc12345',
    },
    {
        account_id: '1003',
        account_type: 'Customer',
        firstName: 'Mock',
        lastName: 'Customer',
        businessName: '',
        tax_id: '',
        address: '123 Main Street, Some City, ID, 67891',
        phone: '333-333-3333',
        email: 'mockcustomer@email.com',
        password: 'Abc12345',
    },
    {
        account_id: '1004',
        account_type: 'Customer',
        firstName: 'Another',
        lastName: 'Customer',
        businessName: '',
        tax_id: '',
        address: '456 Main Street, Somewhere, ID, 19876',
        phone: '444-444-4444',
        email: 'anothercust@email.com',
        password: 'Abc12345',
    },
];

const products = [
    {
        product_id: '1001',
        account_id: '1002',
        productName: 'Ceramic Flower Vase',
        productDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        category: 'Pottery',
        color: 'Orange',
        price: '30.00',
        imageSRC: '/public/no-image.jpg',
    },
    {
        product_id: '1002',
        account_id: '1002',
        productName: 'Book Nerd T-Shirt',
        productDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        category: 'Clothing',
        color: 'White',
        price: '20.00',
        imageSRC: '/public/no-image.jpg',
    },
    {
        product_id: '1003',
        account_id: '1002',
        productName: 'Amethyst Necklace',
        productDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        category: 'Jewelry',
        color: 'Purple',
        price: '250.00',
        imageSRC: '/public/no-image.jpg',
    },
    {
        product_id: '1004',
        account_id: '1002',
        productName: 'Dragon Sticker',
        productDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        category: 'Stickers',
        color: 'Red',
        price: '5.00',
        imageSRC: '/public/no-image.jpg',
    },
    {
        product_id: '1005',
        account_id: '1002',
        productName: 'Wood Memory Box',
        productDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        category: 'Woodworking',
        color: 'Brown',
        price: '75.00',
        imageSRC: '/public/no-image.jpg',
    },

];

const orders = [
    {
        order_id: '1001',
        account_id: '1003',
        date: '2025-01-23',
        products: [
            {
                product_id: '1001',
                price: '30.00',
                quantity: '2',
                total: '60.00',
            },
        ],
        shipping: '10.00',
        tax: '3.75',
        final_total: '73.75',
        status: 'shipped',
    },
    {
        order_id: '1002',
        account_id: '1004',
        date: '2025-01-24',
        products: [
            {
                product_id: '1002',
                price: '20.00',
                quantity: '1',
                total: '20.00',
            },
            {
                product_id: '1004',
                price: '5.00',
                quantity: '3',
                total: '15.00',
            },
        ],
        shipping: '5.00',
        tax: '5.25',
        final_total: '45.25',
        status: 'canceled',
    },
    {
        order_id: '1003',
        account_id: '1004',
        date: '2025-01-24',
        products: [
            {
                product_id: '1003',
                price: '250.00',
                quantity: '1',
                total: '250.00',
            },
            {
                product_id: '1005',
                price: '75.00',
                quantity: '1',
                total: '75.00',
            },
        ],
        shipping: '15.00',
        tax: '10.50',
        final_total: '350.50',
        status: 'processed',
    },
];

const reviews = [
    {
        review_id: '1001',
        product_id: '1001',
        account_id: '1003',
        stars: '5' ,
        review: 'Excellent!',
        date: '2025-01-23',
    },
    {
        review_id: '1002',
        product_id: '1004',
        account_id: '1004',
        stars: '4',
        review: 'Wonderful!',
        date: '2025-1-23',
    },
];

export { accounts, products, orders, reviews };
