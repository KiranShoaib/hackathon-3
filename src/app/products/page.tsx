import { Suspense } from "react";
import ProductHeader from "@/components/Product-Header";
import ProductItems from "@/components/Product-Items";
import Loader from "@/components/Loader"; 

function Products() {
  return (
    <div>
      <ProductHeader />
      <Suspense fallback={<Loader />}>
        <ProductItems />
      </Suspense>
    </div>
  );
}

export default Products;
