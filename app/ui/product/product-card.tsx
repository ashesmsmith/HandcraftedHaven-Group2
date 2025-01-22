/**
 * Product Card Component
 * 
 * Purpose:
 * - Displays a brief overview of a product in a grid or list view.
 * - Acts as an entry point for users to navigate to the product detail page.
 * 
 * Usage:
 * - Used in product listing pages like shop categories, search results, or related products.
 * 
 * Common Features:
 * - Product Image: Displays the primary image of the product.
 * - Product Name: Shows the name of the product (linked to the product detail page).
 * - Price: Displays the product price, including discounts if applicable.
 * - Add to Cart Button: Allows users to quickly add the product to their shopping cart.
 * - Optional Tags: Includes labels like "New", "On Sale", or "Out of Stock".
 * 
 * Props:
 * - `id`: Unique identifier for the product (used for navigation or actions).
 * - `name`: Product name.
 * - `image`: URL or object representing the product image.
 * - `price`: Product price or price range.
 * - `onAddToCart`: Callback for handling the "Add to Cart" action.
 * - `onQuickView`: Optional callback for opening a quick view modal.
 * 
 * Notes:
 * - Ensure proper accessibility attributes for image alt text and button labels.
 * - Supports customization via className or style props for consistent theming.
 */