// product-filter.jsx
"use client";
import React from "react";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";

export default function ProductFilter({
  products,
  onFilter,
  selectedProductType,
  searchQuery,
  onSearch,
}) {
  const uniqueProductTypes = [
    ...new Set(products.map((product) => product.product_type)),
  ];

  const productTypeLabels = {
    kuffert: "Kuffert",
    vandrerygsaek: "Vandrerygsæk",
    rygsaek: "Rygsæk",
    // Add other mappings as needed
  };

  return (
    <>
      <div className="flex gap-4">
        <div className="relative w-[275px]">
          <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            placeholder="Søg efter produkter"
            className="w-full h-full pl-10 pr-4 py-2 rounded-[20px] focus:outline-none"
            type="search"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)} // Update search query
          />
        </div>
        <Image
          src="/images/filter-btn.svg"
          alt="Filter Button"
          width={62}
          height={58}
        />
      </div>
      <div className="flex gap-3 mb-20 w-[350px]">
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
