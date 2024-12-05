import React from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import MyCalendar from "@/components/my-calendar"; // Correct the import statement
import { getSpecificNonUserPost } from "@/actions/posts.actions";

export default async function PostPage({ params }) {
  const { id } = await params;
  const posts = await getSpecificNonUserPost(id);
  const post = posts[0];

  // Mapping for color labels
  const colorLabels = {
    "#000000": "Sort",
    "#5337FF": "Blå",
    "#72CA81": "Grøn",
    "#7F8992": "Grå",
    "#9E29BB": "Lilla",
    "#C1C1C1": "Sølv",
    "#FF3DD4": "Pink",
    "#FF5757": "Rød",
    "#FFB23F": "Orange",
    "#FFE34E": "Gul",
    "#FFFFFF": "Hvid",
  };

  return <PostDetails post={post} colorLabels={colorLabels} />;
}

function PostDetails({ post, colorLabels }) {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-3 items-center justify-center">
        <Link href={"/hjem"}>
          <button className="justify-self-start text-gray-500 text-xs">
            ← Tilbage
          </button>
        </Link>
        <h4 className="text-xl font-bold text-gray-900 col-span-1 text-center truncate max-w-40">
          {post.product.name}
        </h4>
      </div>
      <div className="mt-4">
        {/* Wrapper with override padding and background color */}
        <div className="rounded-xl bg-gray-100 p-4">
          <div className="w-full h-64 bg-graybg rounded-lg overflow-hidden">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/api/product/create/${post.product.pictures[0]}`}
              alt={post.product.name}
              width={300}
              height={300}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-row gap-2 items-center mt-2">
            {/* Condition at the start */}
            <div className="flex items-center gap-1">
              <p className="font-semibold">Stand: </p>
              <p>{post.product.product_condition}</p>
            </div>

            {/* Spacer to create separation */}
            <div className="flex-grow"></div>

            {/* Color information at the end */}
            <div className="flex items-center justify-end rounded-lg px-4 py-2">
              <span
                className="w-3 h-3 rounded-full inline-block mr-2"
                style={{
                  backgroundColor: post.product.color,
                }}
              ></span>
              <span className="text-gray-600 text-sm">
                {colorLabels[post.product.color]}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-5 items-center text-center">
          {/* Price */}
          <div>
            <p className="font-semibold">Dagspris</p>
            <p>{post.price_per_day} kr</p>
          </div>
          <Separator orientation="vertical" className="h-8 mx-auto" />

          {/* Location */}
          <div>
            <p className="font-semibold">Lokation</p>
            <p>{post.location}</p>
          </div>
          <Separator orientation="vertical" className="h-8 mx-auto" />

          {/* Size */}
          <div>
            <p className="font-semibold">Størrelse</p>
            <p>{post.product.size}</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="font-semibold">Beskrivelse:</p>
          <div className="flex">
            <p className="mt-2 text-gray-500">{post.description}</p>
          </div>
          <br />
        </div>
        <div className="shadow-sm p-2">
          <MyDatePicker />
        </div>
        <div className="pt-5">
          <Link href="hjem">
            <button className="w-full bg-darkgreen text-white rounded-lg p-2 mt-4">
              Send Forespørgsel
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
