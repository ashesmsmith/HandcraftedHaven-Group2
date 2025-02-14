'use server'

export async function addListing(formData: FormData) {
    const rawFormData = {
        acct_id: formData.get('acct_id'),
        prod_name: formData.get('prod_name'),
        prod_desc: formData.get('prod_desc'),
        prod_category: formData.get('prod_category'),
        prod_color: formData.get('prod_color'),
        prod_price: formData.get('prod_price'),
        prod_image: formData.get('prod_image'),
    }

    console.log(rawFormData);
}