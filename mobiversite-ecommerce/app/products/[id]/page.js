import api from "@/lib/api";
import ClientActions from "./ClientActions";

export default async function ProductDetail({ params }) {
  const { id } = params;
  let product = null;
  try {
    product = await api.get(`/products/${id}`).then((res) => res.data);
  } catch (e) {
    console.error("Product fetch failed:", e);
  }

  if (!product || !product.id) {
    return <h1 className="text-center mt-10">Product not found</h1>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex max-[991px]:flex-col gap-8">
        <div className="flex-1 flex justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-full max-w-md h-auto object-contain rounded-lg shadow products-image"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
            {product.title}
          </h1>

          <p className="text-gray-600 mb-4 leading-relaxed">
            {product.description}
          </p>

          <p className="text-2xl font-semibold text-blue-500 mb-6">
            ${product.price}
          </p>

          <ClientActions product={product} />
        </div>
      </div>
    </div>
  );
}
