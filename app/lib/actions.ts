'use server'

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const AddListingFormSchema = z.object({
    account_id: z.string(),
    productName: z.string(),
    productDesc: z.string(),
    category: z.enum(['Pottery', 'Clothing', 'Jewelry', 'Stickers', 'Woodworking', 'Other']), 
    color: z.enum(['Black', 'White', 'Gray', 'Brown', 'Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Pink', 'Multi']), 
    price: z.coerce.number(),
    imageSRC: z.string(),
});

export async function addListing(formData: FormData) {
    const parsedData = AddListingFormSchema.parse({
        account_id: formData.get('account_id') as string,
        productName: formData.get('productName') as string,
        productDesc: formData.get('productDesc') as string,
        category: formData.get('category') as string,
        color: formData.get('color') as string,
        price: formData.get('price') as string,
        imageSRC: formData.get('imageSRC') as string,
    })

    const { account_id, productName, productDesc, category, color, price, imageSRC } = parsedData;

    try {
        await sql`
            INSERT INTO products (account_id, productName, productDesc, category, color, price, imageSRC)
            VALUES (${account_id}, ${productName}, ${productDesc}, ${category}, ${color}, ${price}, ${imageSRC})
        `;
    } catch (error) {
        console.log(`Error with lib/actions - addListing: ${error}`)
        return {message: 'An error occurred while adding the listing.'}
    }

    revalidatePath(`/dashboard/seller/${account_id}`);
    redirect(`/dashboard/seller/${account_id}`);
}

const EditListingFormSchema = z.object({
    product_id: z.string(),
    account_id: z.string(),
    productName: z.string(),
    productDesc: z.string(),
    category: z.enum(['Pottery', 'Clothing', 'Jewelry', 'Stickers', 'Woodworking', 'Other']), 
    color: z.enum(['Black', 'White', 'Gray', 'Brown', 'Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Pink', 'Multi']), 
    price: z.coerce.number(),
    imageSRC: z.string(),
})

export async function editListing(formData: FormData) {
    const parsedData = EditListingFormSchema.parse({
        product_id: formData.get('product_id') as string,
        account_id: formData.get('account_id') as string,
        productName: formData.get('productName') as string,
        productDesc: formData.get('productDesc') as string,
        category: formData.get('category') as string,
        color: formData.get('color') as string,
        price: formData.get('price') as string,
        imageSRC: formData.get('imageSRC') as string,
    })

    const { product_id, account_id, productName, productDesc, category, color, price, imageSRC } = parsedData;

    try {
        await sql`
            UPDATE products
            SET productName = ${productName}, productDesc = ${productDesc}, category = ${category}, color = ${color}, price = ${price}, imageSRC = ${imageSRC}
            WHERE product_id = ${product_id} AND account_id = ${account_id}
        `;
    } catch (error) {
        console.log(`Error with lib/actions - editListing: ${error}`)
        return {message: 'An error occurred while updating the listing.'}
    }

    revalidatePath(`/dashboard/seller/${account_id}`);
    redirect(`/dashboard/seller/${account_id}`);
}

export async function deleteListing(prod_id: string, acct_id: string) {
    try {
        await sql`
            DELETE FROM products WHERE product_id = ${prod_id}
        `;
    } catch (error){
        console.log(`Error with lib/actions - deleteListing: ${error}`)
        return {message: 'An error occurred while deleting the listing.'}
    }

    revalidatePath(`/dashboard/seller/${acct_id}`);
    redirect(`/dashboard/seller/${acct_id}`);
}