// post-filter.jsx
"use client";
import React from "react";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";

export default function PostFilter({
  posts = [],
  onFilter,
  selectedProductType,
  searchQuery,
  onSearch,
}) {
  const uniqueProductTypes = [
    ...new Set(
      posts
        .map(
          (post) => post.product_type && post.product_type.trim().toLowerCase()
        )
        .filter(Boolean)
    ),
  ];
  const productTypeLabels = {
    kuffert: "Kuffert",
    vandrerygsaek: "Vandrerygsæk",
    rygsaek: "Rygsæk",
  };

  return (
    <>
      <div className="flex gap-4 w-10/12 justify-between">
        <div className="relative w-full">
          <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            placeholder="Søg efter produkter"
            className="w-full h-full pl-10 pr-4 py-2 rounded-[20px] focus:outline-none"
            type="search"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <Image
          src="/images/filter-btn.svg"
          alt="Filter Button"
          width={62}
          height={58}
        />
      </div>
      <div className="flex w-10/12 gap-3 mb-20 min-w[350px]">
        <div
          onClick={() => onFilter(null)}
          className={`cursor-pointer w-auto px-4 h-11 flex items-center justify-center rounded-[10px] ${
            selectedProductType === null
              ? "bg-[#1BBB66] text-white"
              : "bg-white text-[#8c8c8c]"
          }`}
        >
          Alle
        </div>
        {uniqueProductTypes.map((productType, index) => (
          <div
            key={index}
            onClick={() => onFilter(productType)}
            className={`cursor-pointer w-auto px-4 h-11 flex items-center justify-center rounded-[10px] ${
              selectedProductType === productType
                ? "bg-[#1BBB66] text-white"
                : "bg-white text-[#8c8c8c]"
            }`}
          >
            {productTypeLabels[productType] || productType}
          </div>
        ))}
      </div>
    </>
  );
}
