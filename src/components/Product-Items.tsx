import Link from "next/link";
import { client } from "@/sanity/lib/client";

interface Product {
  _id: string;
  name: string;
  category: string;
  slug: { current: string }; // Update slug type to match the Sanity query structure
  image: string;
  price: number;
  quantity: number;
  tags: string[];
  description: string;
  features: string[];
  dimensions: {
    height: number;
    width: number;
    depth: number;
  };
}

async function ProductItems() {
  const query = `
    *[_type == "product"] {
      _id,
      name,
      "category": category->title,
      slug { current }, // Fetch slug.current explicitly
      "image": image.asset->url,
      price,
      quantity,
      tags,
      description,
      features,
      dimensions {
        height,
        width,
        depth
      }
    }
  `;

  // Fetch data from Sanity
  const products: Product[] = await client.fetch(query);

  return (
    <div className="max-w-[1440px] mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border rounded p-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover mb-4"
            />
            <h2 className="text-[#2A254B] text-lg font-semibold">{product.name}</h2>
            <p className="text-[#2A254B]">Category: {product.category}</p>
            <p className="text-[#2A254B] font-bold">Price: ${product.price}</p>
            <p className="text-[#2A254B]">Quantity: {product.quantity}</p>
            <p className="text-[#2A254B] mt-2">{product.description}</p>
            {/* Dynamic Link */}
            <Link href={`/products/${product.slug.current}`}
               className="text-blue-500 hover:underline mt-2 block">
                View Details             
            </Link>
          </div>
        ))}
      </div>
      <div className="text-center my-10">
         <button className="w-[170px] h-[48px] text-[#2A254B] bg-[#F9F9F9] ">
        View Collection
         </button>
       </div>
    </div>
  );
}

export default ProductItems;
