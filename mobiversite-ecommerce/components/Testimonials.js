"use client";

import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function TestimonialsBanner() {
  const testimonials = [
    {
      id: 1,
      name: "Emily Johnson",
      role: "Verified Buyer",
      comment:
        "Mobiversite has completely changed the way I shop online. Fast delivery and amazing product!",
      rating: 5,
      image: "https://i.pravatar.cc/100?img=1",
    },
    {
      id: 2,
      name: "Michael Brown",
      role: "Customer",
      comment:
        "The discounts are real and the sneakers I bought were exactly as described. Highly recommended!",
      rating: 4,
      image: "https://i.pravatar.cc/100?img=2",
    },
    {
      id: 3,
      name: "Sophia Davis",
      role: "Happy Client",
      comment:
        "Excellent customer support, they helped me track my order quickly. I’ll definitely shop again.",
      rating: 5,
      image: "https://i.pravatar.cc/100?img=3",
    },
    {
      id: 4,
      name: "David Wilson",
      role: "Long-time Customer",
      comment:
        "I love Mobiversite! The wishlist and card features make shopping super easy and fun.",
      rating: 5,
      image: "https://i.pravatar.cc/100?img=4",
    },
  ];

  return (
    <section className="container mx-auto py-12 testimonials">
      <h2 className="text-3xl font-extrabold text-center mt-4 mb-4">
        WHAT OUR CUSTOMERS SAY
      </h2>
      <Swiper
        modules={[Pagination, Autoplay]}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          991: { slidesPerView: 1 },
          1024: { slidesPerView: 3 },
        }}
      >
        {testimonials.map((t) => (
          <SwiperSlide key={t.id}>
            <div className="bg-gray-50 rounded-xl shadow hover:shadow-lg transition pb-8 pt-6 flex flex-col items-center text-center h-full">
              <img
                src={t.image}
                alt={t.name}
                className="w-16 h-16 rounded-full mb-4"
              />
              <div className="flex items-center justify-center gap-1 text-yellow-500 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">"{t.comment}"</p>
              <h3 className="font-semibold text-gray-900">{t.name}</h3>
              <span className="text-sm text-gray-500">{t.role}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
