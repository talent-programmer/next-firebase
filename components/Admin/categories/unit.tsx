/* eslint-disable @next/next/no-img-element */
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { Category } from "../../../types";
import { useRouter } from "next/router";

function UnitCat({ data }: { data: Category }) {
  const router = useRouter();
  const { title, description, imageURL, _id, color, slug } = data;
  const viewCategory = () => {
    router.push({
      pathname: `categories/view/${slug}`,
    });
  };
  return (
    <div
      className="max-w-sm h-[25rem] bg-white rounded-lg border cursor-pointer shadow-md font-sans pb-5"
    >
      <div className="rounded-t-lg  w-full h-full max-h-[65%] overflow-hidden" onClick={viewCategory}>
        <img
          className=" h-full w-full object-cover hover:scale-110 ease-in-out duration-500 transition-all"
          src={imageURL}
          alt={slug}
        />
      </div>
      <div className="p-5">
        <div>
          <h5 className="mb-2 text-2xl font-bold tracking-tight" style={{
                  color
                }}>
            {title}
          </h5>
        </div>
        <p className="mb-3 font-normal text-gray-500 max-w-full truncate">
          {description}
        </p>
        <div className="cursor-pointer transition-all duration-100 ease-in-out inline-flex gap-2 items-center py-2 px-3 text-sm font-medium text-center text-active hover:text-white bg-active-bg rounded-lg hover:bg-active focus:ring-4 focus:outline-none focus:ring-blue-300 ">
          <span>Browse posts</span>
          <BsArrowRight />
        </div>
      </div>
    </div>
  );

}

export default UnitCat;
