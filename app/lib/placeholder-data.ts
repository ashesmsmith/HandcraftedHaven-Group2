// This file contains placeholder data for Handcrafted Haven - Group 2

const accounts = [
    {
        account_id: '0754fa5d-1be7-4cd9-b876-143b59d4db81',
        account_type: 'Admin',
        firstName: 'Admin',
        lastName: 'Account',
        businessName: 'Admin Account',
        tax_id: null,
        address: '123 Admin Street, Some City, UT, 54321',
        phone: '111-111-1111',
        email: 'admin@email.com',
        password: 'Abc12345',
    },
    {
        account_id: '96f9a579-4021-4a7a-8fbe-8032cdfde673',
        account_type: 'Seller',
        firstName: 'Seller',
        lastName: 'Account',
        businessName: 'My Small Business',
        tax_id: 1234567890,
        address: '456 Seller Street, Somewhere, UT, 12345',
        phone: '222-222-2222',
        email: 'seller@email.com',
        password: 'Abc12345',
    },
    {
        account_id: 'f4b90010-7e2a-4d0d-9617-15214c1696d1',
        account_type: 'Customer',
        firstName: 'Mock',
        lastName: 'Customer',
        businessName: null,
        tax_id: null,
        address: '123 Main Street, Some City, ID, 67891',
        phone: '333-333-3333',
        email: 'mockcustomer@email.com',
        password: 'Abc12345',
    },
    {
        account_id: 'c7c00cac-1132-4c37-a15c-abba89516ab1',
        account_type: 'Customer',
        firstName: 'Another',
        lastName: 'Customer',
        businessName: null,
        tax_id: null,
        address: '456 Main Street, Somewhere, ID, 19876',
        phone: '444-444-4444',
        email: 'anothercust@email.com',
        password: 'Abc12345',
    },
];

const products = [
    {
        product_id: 'b481438a-7dba-4aaa-8bd5-bccc03d2eb31',
        account_id: accounts[1].account_id,
        productName: 'Ceramic Flower Vase',
        productDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        category: 'Pottery',
        color: 'White',
        price: 30.00,
        imageSRC: '/public/prod_images/vase.webp',
    },
    {
        product_id: '67657788-d579-43d9-a92e-e8754b02f7e2',
        account_id: accounts[1].account_id,
        productName: 'Book Nerd T-Shirt',
        productDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        category: 'Clothing',
        color: 'Green',
        price: 20.00,
        imageSRC: '/public/prod_images/book_shirt.webp',
    },
    {
        product_id: '6fe17217-d5ff-40f6-90ae-deb69d778eff',
        account_id: accounts[1].account_id,
        productName: 'Amethyst Necklace',
        productDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        category: 'Jewelry',
        color: 'Purple',
        price: 250.00,
        imageSRC: '/public/prod_images/necklace.webp',
    },
    {
        product_id: '7940b624-cf63-4a86-bd27-34e72a1cab32',
        account_id: accounts[1].account_id,
        productName: 'Dragon Sticker',
        productDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        category: 'Stickers',
        color: 'Multi',
        price: 5.00,
        imageSRC: '/public/prod_images/dragon_sticker.webp',
    },
    {
        product_id: 'f005a76d-094e-4f88-a498-3b43da59c1b0',
        account_id: accounts[1].account_id,
        productName: 'Wood Memory Box',
        productDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        category: 'Woodworking',
        color: 'Brown',
        price: 75.00,
        imageSRC: '/public/prod_images/memory_box.webp',
    },

];

const orders = [
    {
        order_id: '8f8369bb-10da-4445-a1f7-4360fc0c7f91',
        account_id: accounts[2].account_id,
        date: '2025-01-23',
        shipping: 10.00,
        tax: 3.75,
        final_total: 73.75,
        status: 'Shipped',
    },
    {
        order_id: '00d79d84-85b9-4e6c-9be0-63e12cffd044',
        account_id: accounts[3].account_id,
        date: '2025-01-24',
        shipping: 5.00,
        tax: 2.25,
        final_total: 42.25,
        status: 'Canceled',
    },
    {
        order_id: '95c5a336-f151-4d07-baf9-c38886c33f86',
        account_id: accounts[3].account_id,
        date: '2025-01-24',
        shipping: 30.00,
        tax: 20.50,
        final_total: 1125.50,
        status: 'Processed',
    },
];

const order_products = [
    {
        order_id: orders[0].order_id,
        product_id: products[0].product_id,
        price: products[0].price,
        quantity: 2,
        total: products[0].price * 2,
    },
    {
        order_id: orders[1].order_id,
        product_id: products[1].product_id,
        price: products[1].price,
        quantity: 1,
        total: products[1].price * 1,
    },
    {
        order_id: orders[1].order_id,
        product_id: products[3].product_id,
        price: products[3].price,
        quantity: 3,
        total: products[3].price * 3,
    },
    {
        order_id: orders[2].order_id,
        product_id: products[2].product_id,
        price: products[2].price,
        quantity: 4,
        total: products[2].price * 4,
    },
    {
        order_id: orders[2].order_id,
        product_id: products[4].product_id,
        price: products[4].price,
        quantity: 1,
        total: products[4].price * 1,
    },
];

const reviews = [
    {
        product_id: products[1].product_id,
        account_id: accounts[2].account_id,
        stars: 5,
        review: 'Excellent! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        date: '2025-01-23',
    },
    {

        product_id: products[4].product_id,
        account_id: accounts[3].account_id,
        stars: 4,
        review: 'Wonderful! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        date: '2025-01-23',
    },
];

export { accounts, products, orders, order_products, reviews };
