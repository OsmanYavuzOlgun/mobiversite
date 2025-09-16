"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Banner() {
  useEffect(() => {}, []);

  const slides = [
    {
      id: 1,
      title: "Season Finale Sale",
      subtitle: "Up to 50% off on selected items",
      cta: "Shop Now",
      href: "/products",
      image: "https://picsum.photos/seed/banner-1/1600/700",
      badge: "-50%",
    },
    {
      id: 2,
      title: "Big Electronics Deal",
      subtitle: "Extra discounts on headphones, watches and more",
      cta: "Explore Electronics",
      href: "/products?category=electronics",
      image: "https://picsum.photos/seed/banner-2/1600/700",
      badge: "Extra in Card",
    },
    {
      id: 3,
      title: "New Season Sneakers",
      subtitle: "Lightweight and comfortable for running and daily style",
      cta: "Check Sneakers",
      href: "/products?category=footwear",
      image: "https://picsum.photos/seed/banner-3/1600/700",
      badge: "New",
    },
  ];

  return (
    <section className="relative w-full first-banner ">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="w-full"
      >
        {slides.map((s) => (
          <SwiperSlide key={s.id}>
            <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]">
              <img
                src={s.image}
                alt={s.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative z-10 h-full flex items-center">
                <div className="px-6 md:px-20 swiper-content">
                  <span className="inline-block bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm text-white mb-3">
                    {s.badge}
                  </span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight drop-shadow">
                    {s.title}
                  </h2>
                  <p className="mt-3 text-base sm:text-lg md:text-xl text-white/90 drop-shadow">
                    {s.subtitle}
                  </p>
                  <div className="mt-6 flex gap-3 swiper-buttons">
                    <Link
                      href={s.href}
                      className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                      aria-label="swiper"
                    >
                      {s.cta}
                    </Link>
                    <Link
                      href="/products"
                      className="px-5 py-3 rounded-xl bg-white/20 hover:bg-white/30 text-white font-medium border border-white/30"
                      aria-label="all products"
                    >
                      All Products
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
