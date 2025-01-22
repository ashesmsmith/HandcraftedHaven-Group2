/**
 * Header Component
 * 
 * Purpose:
 * - Serves as the global header for the application.
 * - Includes navigation links, branding (e.g., logo), and utility actions (e.g., search, cart, profile menu).
 * 
 * Usage:
 * - Rendered at the top of every page to provide a consistent navigation experience.
 * - Supports both authenticated (dashboard-specific) and unauthenticated states.
 * 
 * Common Features:
 * - Logo: Redirects to the homepage.
 * - Navigation Links: Links to key sections (e.g., Home, Shop, About).
 * - Search Bar: Allows users to perform global searches.
 * - Cart Icon: Displays a quick summary of the shopping cart (linked to Mini Cart).
 * - User Profile: Includes dropdown options like Login/Logout, Settings, and Account.
 * 
 * Props:
 * - `isAuthenticated`: Boolean indicating if the user is logged in.
 * - `userInfo`: Object containing user details (e.g., name, avatar).
 * - Callbacks for events like search, logout, and navigation clicks.
 */
