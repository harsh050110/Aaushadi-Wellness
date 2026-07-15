"use client";

import { useMemo, useState } from "react";
import type { StrapiProduct } from "@/lib/types";
import CatalogCard from "@/components/CatalogCard";

type Props = {
  products: StrapiProduct[];
  categories: {
    name: string;
    slug: string;
  }[];
  initialSearch?: string;
};

const BATCH_SIZE = 8;

export default function ProductGrid({
  products,
  categories,
  initialSearch = "",
}: Props) {
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (activeCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category?.slug === activeCategory
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();

      filtered = filtered.filter(
        (product) =>
          product.productName.toLowerCase().includes(q) ||
          product.tagline.toLowerCase().includes(q) ||
          (product.category?.name ?? "").toLowerCase().includes(q)
      );
    }

    return filtered;
  }, [products, activeCategory, searchQuery]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const loadMore = () =>
    setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, filteredProducts.length));

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setVisibleCount(BATCH_SIZE);
  };

  const handleCategoryChange = (slug: string) => {
    setActiveCategory(slug);
    setVisibleCount(BATCH_SIZE);
  };

  return (
    <section
      className="relative overflow-hidden py-20"
      style={{
        backgroundImage: "url('/products/bg.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "650px",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[#F6EBD6]/40" />

      <div className="absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-white/40 blur-[120px]" />

      <div className="absolute right-0 bottom-0 h-[350px] w-[350px] rounded-full bg-[#ECD7B9]/60 blur-[120px]" />

      <img
        src="/images/leaf-left.png"
        alt=""
        className="hidden lg:block absolute left-0 top-0 h-full w-44 object-cover opacity-25"
      />

      <img
        src="/images/leaf-right.png"
        alt=""
        className="hidden lg:block absolute right-0 top-0 h-full w-44 object-cover opacity-25"
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span
            className="
              inline-flex
              rounded-full
              border
              border-[#CDB48C]
              bg-white
              px-6
              py-2
              text-xs
              tracking-[4px]
              font-semibold
              text-[#556B2F]
            "
          >
            TOP CATEGORIES
          </span>

          <h2
            className="mt-6 text-5xl font-bold text-[#2F2A22]"
            style={{
              fontFamily: "var(--font-playfair)",
            }}
          >
            Explore Our Collection
          </h2>

          <p
            className="
              mx-auto
              mt-6
              max-w-3xl
              text-lg
              leading-8
              text-[#5F5A53]
            "
          >
            Choose from authentic Ayurvedic herbal products, carefully
            crafted for everyday wellness and natural healing.
          </p>
        </div>

        {/* ================= SEARCH ================= */}

        <div className="mx-auto mb-14 max-w-2xl">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search herbal products..."
              className="
                h-16
                w-full
                rounded-full
                border
                border-[#D7C6A5]
                bg-white/90
                pl-16
                pr-6
                text-lg
                text-[#2F2A22]
                shadow-lg
                outline-none
                transition-all
                focus:border-[#556B2F]
                focus:ring-2
                focus:ring-[#556B2F]/20
              "
            />

            <svg
              className="absolute left-6 top-1/2 -translate-y-1/2 text-[#556B2F]"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>
        </div>

        {/* ================= CATEGORY ================= */}

        <div className="mb-16">
          <h3
            className="mb-8 text-center text-4xl font-bold text-[#2F2A22]"
            style={{
              fontFamily: "var(--font-playfair)",
            }}
          >
            Top Categories
          </h3>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => handleCategoryChange("all")}
              className={`
                rounded-full
                px-8
                py-3
                text-sm
                font-semibold
                transition-all
                ${
                  activeCategory === "all"
                    ? "bg-[#556B2F] text-white shadow-lg"
                    : "border border-[#CDB48C] bg-[#F6EAD5] text-[#556B2F] hover:bg-[#556B2F] hover:text-white"
                }
              `}
            >
              All Products
            </button>

            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => handleCategoryChange(cat.slug)}
                className={`
                  rounded-full
                  px-8
                  py-3
                  text-sm
                  font-semibold
                  transition-all
                  ${
                    activeCategory === cat.slug
                      ? "bg-[#556B2F] text-white shadow-lg"
                      : "border border-[#CDB48C] bg-[#F6EAD5] text-[#556B2F] hover:bg-[#556B2F] hover:text-white"
                  }
                `}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* ================= FILTER ================= */}

        <div className="mb-10 flex items-center justify-between border-b border-[#D9C9AF] pb-5">
          <button className="flex items-center gap-3 text-lg font-semibold text-[#2F2A22]">
            ☰ Filter
          </button>

          <button className="flex items-center gap-2 text-lg font-semibold text-[#2F2A22]">
            Sort By ▼
          </button>
        </div>

        {/* ================= FEATURED ================= */}

        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2
              className="text-4xl font-bold"
              style={{
                fontFamily: "var(--font-playfair)",
              }}
            >
              Featured Products
            </h2>

            <button className="text-[#556B2F] font-semibold">See All →</button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {products.slice(0, 3).map((product, index) => (
              <CatalogCard key={product.id} product={product} priority={index < 3} />
            ))}
          </div>
        </div>

        {/* ================= RAW MATERIAL ================= */}

        <div className="mb-20">
          <h2
            className="text-center text-4xl font-bold mb-10"
            style={{
              fontFamily: "var(--font-playfair)",
            }}
          >
            Select By Raw Material
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {["Ashwagandha", "Amla", "Tulsi", "Arjuna", "Shatavari"].map((item) => (
              <div key={item} className="flex flex-col items-center">
                <div
                  className="
                    w-36
                    h-36
                    rounded-full
                    overflow-hidden
                    border-4
                    border-white
                    shadow-lg
                    bg-[#F6EBD6]
                  "
                />

                <h3 className="mt-4 font-semibold text-[#556B2F]">{item}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* ================= BEST SELLERS ================= */}

        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2
              className="text-4xl font-bold"
              style={{
                fontFamily: "var(--font-playfair)",
              }}
            >
              Best Sellers
            </h2>

            <button className="text-[#556B2F] font-semibold">See All →</button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {products.slice(3, 6).map((product, index) => (
              <CatalogCard key={product.id} product={product} priority={index < 3} />
            ))}
          </div>
        </div>

        {/* ================= PRODUCTS (ALL PRODUCTS + LOAD MORE) ================= */}

        {filteredProducts.length > 0 ? (
          <>
            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                xl:grid-cols-3
                gap-10
              "
            >
              {visibleProducts.map((product, idx) => (
                <div
                  key={product.id}
                  className="
                    group
                    transition-all
                    duration-500
                    hover:-translate-y-2
                  "
                >
                  <CatalogCard product={product} priority={idx < 6} />
                </div>
              ))}
            </div>

            {/* Load More */}

            {hasMore && (
              <div className="mt-14 flex justify-center">
                <button
                  onClick={loadMore}
                  className="
                    rounded-full
                    border
                    border-[#556B2F]
                    bg-white
                    px-10
                    py-3
                    text-sm
                    font-semibold
                    tracking-[2px]
                    text-[#556B2F]
                    shadow-md
                    transition-all
                    hover:bg-[#556B2F]
                    hover:text-white
                  "
                >
                  LOAD MORE
                </button>
              </div>
            )}

            {/* Decorative Divider */}

            <div className="my-20 flex items-center gap-6">
              <div className="h-px flex-1 bg-[#D8C6A5]" />

              <div
                className="
                  rounded-full
                  border
                  border-[#D8C6A5]
                  bg-white/70
                  px-6
                  py-2
                  text-sm
                  font-semibold
                  tracking-[4px]
                  text-[#556B2F]
                "
              >
                PURE AYURVEDA
              </div>

              <div className="h-px flex-1 bg-[#D8C6A5]" />
            </div>
          </>
        ) : (
          <div className="py-28 text-center">
            <h2
              className="text-4xl font-bold"
              style={{
                fontFamily: "var(--font-playfair)",
              }}
            >
              No Products Found
            </h2>

            <p className="mt-6 text-lg text-[#6B665C]">
              Try another keyword or category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}