export default async function ProductDetail({ params }) {
  const { id } = params;
  let product = null;

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      cache: "no-store",
    });
    product = await res.json();
    console.log("Fetched product:", product);
  } catch (e) {
    console.error("Product fetch failed:", e);
  }

  if (!product || !product.id) {
    return <h1 className="text-center mt-10">Product not found</h1>;
  }

  return (
    <div>
      <h1>{product.title}</h1>
    </div>
  );
}
