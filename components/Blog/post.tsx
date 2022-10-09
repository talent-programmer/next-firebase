import { BiArrowBack } from "react-icons/bi";
import CategoriesBadge from "../Categories/badge";
import Link from "next/link";
import { MdDateRange } from "react-icons/md";
import { Post } from "../../types";
import React from "react";
import RelatedPosts from "./crelated";
import SectionTitle from "../SectionTitle";
import { Seperator } from "../Seperator";
import UtilButton from "../UtilButton";
import { Writer } from "./item";
import { convertDate } from "../../util/functions";
import { useRouter } from "next/router";
import Preview from "../Admin/Editor/preview";

const BlogPost = ({post}: {post:Post}) => {
  const router = useRouter();
  return (
    <div className="bg-transparent py-10">
      <div className="w-full h-full bg-white rounded p-4 poppins overflow-x-hidden overflow-y-scroll scrollbar-hidden relative">
        <div className="flex flex-col md:flex-row items-center p-4 justify-start md:justify-between gap-y-2 md:gap-0">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between md:justify-start md:gap-x-4">
              {/* back button */}
              <div className="">
              <UtilButton
                icon={<BiArrowBack />}
                color="blue-600"
                title="back"
                onClick={() => router.back()}
              />

             </div>
              <div className="max-w-[80%] lg:max-w-[90%] mx-auto">
              <h1 className="text-lg md:text-2xl font-bold capitalize text-primary   ">
                {post?.title || "N/A"}
              </h1>
              </div>
            </div>
            <div className="flex gap-4">            
              <Writer
                id={post?.writer || "N/A"}
                className={
                  "text-[0.6rem] md:text-[0.7rem] text-gray-500 flex gap-2 items-center"
                }
                />
              <div className="flex items-center justify-center gap-x-2">
                <MdDateRange className="text-[0.6rem] md:text-[0.7rem] text-primary" />
                <p className="hidden text-[0.6rem] md:text-[0.7rem] text-[#4B4B4B] md:flex items-center gap-x-1">
                  {convertDate(post?.createdAt || "", "long")}
                </p>
                <p className="text-[0.6rem] md:text-[0.7rem] text-[#4B4B4B] flex md:hidden items-center gap-x-1">
                  {convertDate(post?.createdAt || "", "short")}
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center justify-start">
            <CategoriesBadge ids={post?.categories} />
          </div>
        </div>
        <div className="py-5 px-4 w-full text-gray-700" contentEditable={false}>
                <Preview content={post?.content || ""} />
        </div>
      </div>
      <Seperator width="1" />
      <SectionTitle title="Related Posts" tp="start" />
      <RelatedPosts categories={post?.categories} filter={post?.slug} />
    </div>
  );
};

export default BlogPost;
