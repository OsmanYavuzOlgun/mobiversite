import Link from "next/link";
import Banner from "@/components/Banner";
import NewProductsBanner from "@/components/NewProductsBanner";
import Testimonials from "@/components/Testimonials";

export default function HomePage() {
  return (
    <>
      <section className="text-center py-12 main-section">
        <h1 className="text-5xl font-extrabold mb-4 text-blue-700 main-title">
          Welcome to <span className="text-white">Mobiversite</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Discover the latest products, enjoy exclusive discounts, and manage
          your shopping with ease. Mobiversite brings you a simple yet complete
          online shopping experience.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/products"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            aria-label="products"
          >
            Shop Now
          </Link>
        </div>
      </section>
      <Banner />
      <NewProductsBanner />
      <Testimonials />
    </>
  );
}
