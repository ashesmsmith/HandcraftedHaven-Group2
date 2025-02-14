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

    await sql`
        INSERT INTO products (account_id, productName, productDesc, category, color, price, imageSRC)
        VALUES (${account_id}, ${productName}, ${productDesc}, ${category}, ${color}, ${price}, ${imageSRC})
    `;

    revalidatePath(`/dashboard/seller/${account_id}`);
    redirect(`/dashboard/seller/${account_id}`);
}
