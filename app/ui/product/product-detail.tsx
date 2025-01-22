/**
 * Product Detail Component
 * 
 * Purpose:
 * - Displays comprehensive information about a specific product.
 * - Enables users to view, select options, and add the product to their cart.
 * 
 * Usage:
 * - Used in the product detail page to provide an in-depth view of a single product.
 * 
 * Common Features:
 * - Product Image Carousel: Allows users to browse multiple images of the product.
 * - Product Name and Description: Displays the full name, short description, and detailed information about the product.
 * - Price: Includes the product price, discount (if applicable), and any associated offers.
 * - Variant Selection: Allows users to choose product options like size, color, or quantity.
 * - Add to Cart Button: Adds the selected product and options to the shopping cart.
 * - Additional Information: May include reviews, shipping details, and related products.
 * 
 * Props:
 * - `id`: Unique identifier for the product.
 * - `name`: Product name.
 * - `images`: Array of images or URLs for the product carousel.
 * - `description`: Full description of the product.
 * - `price`: Product price or price range.
 * - `variants`: Array of options (e.g., sizes, colors).
 * - `onAddToCart`: Callback for handling the "Add to Cart" action.
 * 
 * Notes:
 * - Ensure proper handling of edge cases, like unavailable variants or stock.
 * - Include semantic HTML and ARIA roles for better accessibility.
 * - Optimize the image carousel for performance and responsiveness.
 */

