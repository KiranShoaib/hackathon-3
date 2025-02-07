import { client } from "@/sanity/lib/client";
import ProductDetailClient from "@/components/ProductDetailClient";
import Brand from "@/components/Brand";
import SignUp from "@/components/Sign-up";
import Like from "@/components/Like";

interface Product {
  _id: string;
  name: string;
  category: string;
  brand: string;
  slug: { current: string };
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
  dateAdded: string;
}

interface ProductDetailProps {
  params: { slug: string };
}

const ProductDetailPage = async ({ params }: ProductDetailProps) => {

  const query = `
    *[_type == "product" && slug.current == $slug][0] {
      _id,
      name,
      "category": category->title,
      "brand": brand->title,
      "slug": slug.current,
      "image": image.asset->url,
      price,
      quantity,
      tags,
      dimensions {
        height,
        width,
        depth
      },
       dateAdded
    }
  `;

  const product: Product | null = await client.fetch(query, { slug: params.slug });

  console.log("Fetched Product:", product); // 👈 Yeh line add karo

  if (!product) {
    return <div className="p-6">Product not found!</div>;
  }

return (
  <div>
    <ProductDetailClient product={product} />
    <Like/>
    <Brand />
    <SignUp />
  </div>
);
};
export default ProductDetailPage;


