'use client'

import { editListing } from '@/app/lib/actions';

export default function EditListingForm() {

    return (
        <section className="container mx-auto px-4 py-10 flex justify-center items-center">
            <div className="w-full max-w-md bg-white border border-dark-brown/20 rounded p-6 shadow-sm">
            <h1 className="text-2xl font-bold mb-4 font-serif text-dark-brown">Add Listing</h1>
                <form action={editListing} className="space-y-4">                    
                    <label htmlFor="productName" className="block mb-1 font-medium text-dark-brown">
                        Name:
                    </label>
                    <input 
                        id="productName" 
                        name="productName" 
                        type="text" 
                        className="w-full border border-dark-brown/20 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-dark-green" 
                        required
                    />

                    <label htmlFor="productDesc" className="block mb-1 font-medium text-dark-brown">
                        Description:
                    </label>
                    <input 
                        id="productDesc" 
                        name="productDesc" 
                        type="text" 
                        className="w-full border border-dark-brown/20 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-dark-green" 
                        required
                    />

                    <label htmlFor="category" className="block mb-1 font-medium text-dark-brown">
                        Category:
                    </label>
                    <select 
                        id="category" 
                        name="category" 
                        className="w-full border border-dark-brown/20 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-dark-green" 
                        required
                    >
                        <option disabled value=""> -- select an option -- </option>
                        <option value="Clothing">Clothing</option>
                        <option value="Jewelry">Jewelry</option>
                        <option value="Pottery">Pottery</option>
                        <option value="Stickers">Stickers</option>
                        <option value="Woodworking">Woodworking</option>
                        <option value="Other">Other</option>
                    </select>

                    <label htmlFor="color" className="block mb-1 font-medium text-dark-brown">
                        Color:
                    </label>
                    <select
                        id="color" 
                        name="color" 
                        className="w-full border border-dark-brown/20 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-dark-green" 
                        required
                    >
                        <option disabled value=""> -- select an option -- </option>
                        <option value="Black">Black</option>
                        <option value="White">White</option>
                        <option value="Gray">Gray</option>
                        <option value="Brown">Brown</option>
                        <option value="Red">Red</option>
                        <option value="Orange">Orange</option>
                        <option value="Yellow">Yellow</option>
                        <option value="Green">Green</option>
                        <option value="Blue">Blue</option>
                        <option value="Purple">Purple</option>
                        <option value="Pink">Pink</option>
                        <option value="Multi">Multi</option>
                    </select>

                    <label htmlFor="price" className="block mb-1 font-medium text-dark-brown">
                        Price:
                    </label>
                    <input 
                        id="price" 
                        name="price" 
                        type="number" 
                        className="w-full border border-dark-brown/20 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-dark-green" 
                        required
                    />

                    <label htmlFor="imageSRC" className="block mb-1 font-medium text-dark-brown">
                        Image:
                    </label>
                    <input 
                        id="imageSRC" 
                        name="imageSRC" 
                        type="text" 
                        className="w-full border border-dark-brown/20 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-dark-green" 
                        required
                    />

                    <button 
                        type="submit"
                        className="bg-dark-brown text-cream w-full py-2 rounded hover:bg-light-brown hover:text-white transition-colors font-semibold"
                    >
                        Edit Product
                    </button>
                </form>
            </div>
        </section>
    )
}