import { fetchProductsBySellerId, fetchSellerAccountById } from "@/app/lib/data";
import Link from "next/link";
import ProductCard from "@/app/ui/product/product-card";

export default async function SellerListing(props: { params: Promise<{ acct_id: string }> }) {
    const params = await props.params;
    const acct_id = params.acct_id;

    const account = await fetchSellerAccountById(acct_id);
    const products = await fetchProductsBySellerId(acct_id);

    return (
        <main>
            <section className="container mx-auto px-4 py-10 flex justify-center items-center">
                <div className="w-full max-w-md bg-white border border-dark-brown/20 rounded p-6 shadow-sm">
                    <div className="flex flex-col md:flex-row md:space-x-6 p-4">
                        <h1 className="text-2xl font-bold mb-4 font-serif text-dark-brown">{account[0].firstName} {account[0].lastName} Listings</h1>

                        {/* Product Grid Section */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
                            {products.map((product) => (
                            <Link href={`/products/${product.product_id}`} key={product.product_id}>
                                <ProductCard product={product} />
                            </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}