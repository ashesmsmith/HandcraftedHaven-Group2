// app/lib/products.ts

export type Product = {
  product_id: string;
  seller_id: string;
  productName: string;
  productDesc: string;
  price: number;
  imageSRC: string;
  category: string;
};

export type Review = {
  review_id: string;
  product_id: string; // Links the review to a specific product
  customer_id: string; // Links the review to a specific customer
  stars: number; // Rating from 1 to 5
  review: string; // Text of the review
  date: string; // Submission date
};

// Products array
export const products: Product[] = [
  {
    product_id: '1001',
    seller_id: '1001',
    productName: 'Handcrafted Tote Bag',
    productDesc: 'Stylish and practical handmade tote bag.',
    price: 120.0,
    imageSRC: '/images/product1.jpg',
    category: 'bags',
  },
  {
    product_id: '1002',
    seller_id: '1002',
    productName: 'Bloom Bag',
    productDesc:
      'Eco-friendly handcrafted bag with spacious compartments.',
    price: 75.0,
    imageSRC: '/handbag.png',
    category: 'bags',
  },
  {
    product_id: '1003',
    seller_id: '1001',
    productName: 'Elegant Necklace',
    productDesc: 'Beautiful handmade necklace.',
    price: 50.0,
    imageSRC: '/images/product3.jpg',
    category: 'jewelry',
  },
  {
    product_id: '1004',
    seller_id: '1003',
    productName: 'Cozy Scarf',
    productDesc: 'Warm and cozy handcrafted scarf.',
    price: 40.0,
    imageSRC: '/images/product4.jpg',
    category: 'accessories',
  },
  {
    product_id: '1005',
    seller_id: '1002',
    productName: 'Vintage Earrings',
    productDesc: 'Unique and elegant vintage-style earrings.',
    price: 35.0,
    imageSRC: '/images/product5.jpg',
    category: 'jewelry',
  },
  {
    product_id: '1006',
    seller_id: '1003',
    productName: 'Leather Wallet',
    productDesc: 'Premium handmade leather wallet.',
    price: 90.0,
    imageSRC: '/images/product6.jpg',
    category: 'accessories',
  },
];

// Reviews array
export const reviews: Review[] = [
  {
    review_id: '2001',
    product_id: '1001',
    customer_id: '3001',
    stars: 5,
    review: 'Absolutely love this bag! Perfect for everyday use.',
    date: '2025-01-20',
  },
  {
    review_id: '2002',
    product_id: '1001',
    customer_id: '3002',
    stars: 4,
    review: 'Great bag, but slightly pricey.',
    date: '2025-01-22',
  },
  {
    review_id: '2003',
    product_id: '1002',
    customer_id: '3003',
    stars: 5,
    review: 'Beautifully designed and eco-friendly!',
    date: '2025-01-23',
  },
  {
    review_id: '2004',
    product_id: '1002',
    customer_id: '3004',
    stars: 3,
    review: 'Spacious but the material could be better.',
    date: '2025-01-24',
  },
  {
    review_id: '2005',
    product_id: '1003',
    customer_id: '3005',
    stars: 4,
    review: 'Elegant and lightweight.',
    date: '2025-01-25',
  },
  {
    review_id: '2006',
    product_id: '1004',
    customer_id: '3006',
    stars: 5,
    review: 'Super warm and cozy, perfect for winter.',
    date: '2025-01-26',
  },
  {
    review_id: '2007',
    product_id: '1005',
    customer_id: '3007',
    stars: 3,
    review: 'Pretty earrings but smaller than expected.',
    date: '2025-01-27',
  },
  {
    review_id: '2008',
    product_id: '1006',
    customer_id: '3008',
    stars: 5,
    review: 'High-quality leather, worth the price.',
    date: '2025-01-28',
  },
];

// Fetch a product by its ID
export async function fetchProductById(product_id: string): Promise<Product | undefined> {
  return products.find((product) => product.product_id === product_id);
}

// Fetch all products
export async function fetchAllProducts(): Promise<Product[]> {
  return products;
}

// Fetch products by category
export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  return products.filter((product) => product.category === category);
}

// Fetch products by seller
export async function fetchProductsBySeller(seller_id: string): Promise<Product[]> {
  return products.filter((product) => product.seller_id === seller_id);
}

// Fetch products sorted by price
export async function fetchProductsByPrice(order: 'asc' | 'desc' = 'asc'): Promise<Product[]> {
  return [...products].sort((a, b) => (order === 'asc' ? a.price - b.price : b.price - a.price));
}

// Fetch reviews by product ID
export async function fetchReviewsByProductId(product_id: string): Promise<Review[]> {
  return reviews.filter((review) => review.product_id === product_id);
}

// Calculate the average rating for a product
export async function calculateAverageRating(product_id: string): Promise<number> {
  const productReviews = reviews.filter((review) => review.product_id === product_id);
  const totalStars = productReviews.reduce((sum, review) => sum + review.stars, 0);
  return productReviews.length > 0 ? totalStars / productReviews.length : 0;
}
