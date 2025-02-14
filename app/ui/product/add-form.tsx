'use client'

import { useParams } from "next/navigation";
import React, { useState } from "react";
import { addListing } from "@/app/lib/actions";

export default function Form() {
    const params = useParams();
    const acct_id = params.acct_id;

    const [prodCategory, setProdCategory] = useState('');
    const [prodColor, setProdColor] = useState('');

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setProdCategory(event.target.value);
    };

    const handleColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setProdColor(event.target.value);
    };

    return (
        <section className="container mx-auto px-4 py-10 flex justify-center items-center">
            <div className="w-full max-w-md bg-white border border-dark-brown/20 rounded p-6 shadow-sm">
            <h1 className="text-2xl font-bold mb-4 font-serif text-dark-brown">Add Listing</h1>
                <form action={addListing} className="space-y-4">
                    {/* Hidden Input to hold acct_id for inserting product to db */}
                    <input id="acct_id" name="acct_id" type="hidden" value={acct_id}></input>
                    
                    <label htmlFor="prod_name" className="block mb-1 font-medium text-dark-brown">
                        Name:
                    </label>
                    <input 
                        id="prod_name" 
                        name="prod_name" 
                        type="text" 
                        className="w-full border border-dark-brown/20 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-dark-green" 
                        required
                    />

                    <label htmlFor="prod_desc" className="block mb-1 font-medium text-dark-brown">
                        Description:
                    </label>
                    <input 
                        id="prod_desc" 
                        name="prod_desc" 
                        type="text" 
                        className="w-full border border-dark-brown/20 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-dark-green" 
                        required
                    />

                    <label htmlFor="prod_category" className="block mb-1 font-medium text-dark-brown">
                        Category:
                    </label>
                    <select 
                        id="prod_category" 
                        name="prod_category" 
                        value={prodCategory}
                        onChange={handleCategoryChange}
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

                    <label htmlFor="prod_color" className="block mb-1 font-medium text-dark-brown">
                        Color:
                    </label>
                    <select
                        id="prod_color" 
                        name="prod_color" 
                        value={prodColor}
                        onChange={handleColorChange}
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

                    <label htmlFor="prod_price" className="block mb-1 font-medium text-dark-brown">
                        Price:
                    </label>
                    <input 
                        id="prod_price" 
                        name="prod_price" 
                        type="number" 
                        className="w-full border border-dark-brown/20 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-dark-green" 
                        required
                    />

                    <label htmlFor="prod_image" className="block mb-1 font-medium text-dark-brown">
                        Image:
                    </label>
                    <input 
                        id="prod_image" 
                        name="prod_image" 
                        type="text" 
                        className="w-full border border-dark-brown/20 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-dark-green" 
                        required
                    />

                    <button 
                        type="submit"
                        className="bg-dark-brown text-cream w-full py-2 rounded hover:bg-light-brown hover:text-white transition-colors font-semibold"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </section>
    )
}
