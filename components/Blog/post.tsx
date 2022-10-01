import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { BiArchiveIn, BiArrowBack } from "react-icons/bi";
import { BsPencil } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";
import { useStateValue } from "../../context/StateProvider";
import { convertDate } from "../../util/functions";
import SectionTitle from "../SectionTitle";
import { Seperator } from "../Seperator";
import UtilButton from "../UtilButton";
import { Writer } from "./item";
import RelatedPosts from "./crelated";
import CategoriesBadge from "../Categories/badge";

const BlogPost = () => {
  const router = useRouter();
  const path = router.asPath;
  const paths = path.split("/");
  const slug = paths[paths.length - 1];
  const [{ posts, user }, dispatch] = useStateValue();
  const post = posts.filter((post: any) =>
    post.slug.toLowerCase().includes(slug.toLowerCase())
  )[0];
  return (
    <div className="bg-transparent py-10">
      <div className="w-full h-full bg-white rounded p-4 poppins overflow-y-scroll scrollbar-hidden ">
        <div className="flex flex-col md:flex-row items-center p-4 justify-start md:justify-between gap-y-2 md:gap-0">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between md:justify-start md:gap-x-4">
              {/* back button */}
              <UtilButton
                icon={<BiArrowBack />}
                color="blue-600"
                title="back"
                onClick={() => router.back()}
              />

              <h1 className="text-lg md:text-2xl font-bold capitalize text-primary truncate">
                {post?.title || "N/A"}
              </h1>
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
          {post?.content || "N/A"}
        </div>
      </div>
      <Seperator width="2" />
      <SectionTitle title="Related Posts" tp="start" />
      <RelatedPosts />
    </div>
  );
};

export default BlogPost;
