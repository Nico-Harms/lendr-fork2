import Image from "next/image";
import ColorLabel from "../../../components/color-label";
import Link from "next/link";

export default function UserProducts({ products }) {
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <p className="text-gray-600 text-lg font-medium">
          Der er ingen produkter at vise at vise.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {products.map((product) => (
        <Link
          href={`/ordre-og-opslag/produkt/${product.product_id}`}
          key={product.product_id}
        >
          <div className="relative py-3 bg-white rounded-lg shadow-lg overflow-hidden h-40">
            <svg
              className="absolute -right-16 -top-5 object-cover h-52 w-52"
              width="115"
              height="142"
              viewBox="0 0 115 142"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M67.0615 95.4641C67.0615 94.0144 66.7709 93.0721 66.1897 92.6371C65.7539 92.0573 65.2454 91.3325 64.6642 90.4626C59.579 93.507 52.5325 95.0292 43.5246 95.0292C31.4656 95.0292 21.4407 91.0425 13.4498 83.069C4.73245 74.8056 0.373779 64.2226 0.373779 51.3202C0.373779 35.2283 5.38626 22.6881 15.4112 13.6999C25.5814 4.56663 38.5848 0 54.4214 0C72.873 0 87.4019 6.30629 98.008 18.9188C108.76 31.5314 114.135 47.4784 114.135 66.7597C114.135 90.68 107.67 109.237 94.7391 122.429C81.9536 135.477 66.6256 142 48.755 142C37.5678 142 28.5599 139.536 21.7313 134.607C14.9027 129.532 11.4884 122.574 11.4884 113.731C11.4884 106.917 13.2319 101.481 16.7188 97.4212C24.7097 102.35 32.8459 104.815 41.1274 104.815C49.5542 104.815 55.9468 104.017 60.3055 102.423C64.8094 100.828 67.0615 98.5086 67.0615 95.4641Z"
                fill="#5BAD86"
              />
            </svg>

            <div className="absolute right-4 top-4 w-20 h-[85px]">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/api/product/create/${product.pictures[0]}`}
                alt={product.name}
                className="object-cover h-full w-full rounded-2xl"
                width={100}
                height={100}
              />
            </div>
            <div className="pl-5 flex flex-col gap-4 w-[60%]">
              <h3 className="text-xl pt-2 text-text font-bold truncate">
                {product.name}
              </h3>
              <div className="flex flex-col gap-2">
                <p className="text-gray-600 text-xs">
                  <span className="font-semibold">Tilstand: </span>
                  {product.product_condition}
                </p>
                <p className="text-gray-600 text-xs">
                  <span className="font-semibold">Størrelse: </span>
                  {product.size}
                </p>
                <ColorLabel colorCode={product.color} />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
