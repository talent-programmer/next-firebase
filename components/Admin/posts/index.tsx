import React, { useEffect, useState } from "react";
import { BsBook, BsEye } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { RiSoundModuleLine } from "react-icons/ri";
import { useStateValue } from "../../../context/StateProvider";
import { Category, Post, User } from "../../../types";
import UtilButton from "../../UtilButton";
import { BiPencil, BiTrashAlt } from "react-icons/bi";
import { toast } from "react-toastify";
import {
  ColorOpacity,
  convertDate,
  generateInitials,
} from "../../../util/functions";
import { FECTCH_ADMINS } from "../../../util/admins";
import { MdDateRange, MdOutlinePublishedWithChanges } from "react-icons/md";
import { useRouter } from "next/router";
import { Empty } from "../../Promises";
import Searchbar from "../Searchbar";
import { EDIT_POST } from "../../../util/posts";

const AllPosts = () => {
  const [{ posts, user }, dispatch] = useStateValue();
  const [filtered, setFiltered] = useState<Post[]>(
    user.role == "admin"
      ? posts
      : posts.filter((post: Post) => post.writer === user._id)
  );
  const [query, setQuery] = useState("");
  const search = (query: string) => {
    setQuery(query);
    setFiltered(
      posts.filter((post: Post) =>
        post.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  };
  return (
    <div className="bg-white h-full px-4">
      <div>
        <div className="bg-white w-full rounded-t-lg flex justify-between items-center py-2 px-4 ">
          <p className=" text-xl font-semibold text-primary">Published Posts</p>
          <Searchbar value={query} onSearch={search} />
          <div className="flex items-center justify-center gap-3 border border-active-bg py-2 px-4 font-sans cursor-pointer">
            <RiSoundModuleLine className="text-primary" />
            <p className=" text-active text-sm">View All</p>
          </div>
        </div>
        <div>
          <div className="">
            <div className="w-full  grid grid-cols-3 text-center py-2 border-b-2 border-gray-400 px-4 hover:bg-active-bg group cursor-pointer transition-all ease-in-out duration-75">
              <div className="flex justify-start">
                <p className="text-sm font-semibold text-blue-500">Post Name</p>
              </div>
              <div>
                {/* <p className='text-sm font-semibold text-blue-500'>Category Tags</p> */}
              </div>
              <div className="flex justify-end">
                <p className="text-sm font-semibold text-blue-500">
                  Action Buttons
                </p>
              </div>
            </div>
          </div>
          {filtered && filtered.length > 0 ? (
            filtered.map((post: Post) => {
              // return if post is not published
              if (post?.status == "draft") return;
              return <Unit post={post} key={post._id} />
            })
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-blue-500">
              <Empty text={"No posts yet. Create a post to see it here."} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const Unit = ({ post }: { post: Post }) => {
  const [{user}, dispatch] = useStateValue();
  const router = useRouter();

  const deletePost = () => {
    toast.success("Deleted Successfully !");
  };
  const editPost = () => {
    router.push({
      pathname: `posts/edit/${post.slug}`,
    });
  };
  const viewPost = () => {
    router.push({
      pathname: `posts/view/${post.slug}`,
    });
  };

  const publishPost = () => {
    const update = {
      ...post, 
      status: "published"
    }
    toast.promise(
        EDIT_POST(user?.access_token, post?._id ||'', update, (data) => {
          if(data.success)
          {
            dispatch({
               type: "EDIT_POST",
               post: data.data
            })
            toast.success("Post published successfully")
          }else{
            toast.error("Post publish failed. Try again!")
          }
        })
      , {
      pending: "Publishing post...",
    })
  };

  return (
    <div
    
      className="w-full  flex items-center justify-between py-2 border-b-2 border-gray-200 px-4 hover:bg-active-bg group cursor-pointer transition-all ease-in-out duration-75"
    >
      <div className="flex items-center flex-1  gap-8 font-sans " onClick={viewPost}>
        <div className="px-5 py-2 flex justify-center text-primary items-center bg-active-bg  group-hover:bg-white uppercase">
          {generateInitials(post.title)}
        </div>
        <div className="flex items-center justify-between gap-x-8 w-full">
          <div className="flex flex-col max-w-[45%]">
            <h2 className="text-active capitalize truncate">{post.title}</h2>
            <div className="flex items-center justify-start gap-x-2">
              <Writer
                id={post?.writer || "N/A"}
                className={
                  "text-[0.7rem] text-gray-500 flex gap-2 items-center"
                }
              />
              <div className="flex items-center justify-center gap-x-2">
                <MdDateRange className="text-[0.7rem] text-primary" />
                <p className="text-[0.7rem] text-[#4B4B4B] flex items-center gap-x-1">
                  {convertDate(post.createdAt || "", "long")}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center  gap-x-2 mr-auto overflow-x-hidden scrollbar-hidden">
            <Categories ids={post.categories} />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-5">
        {
          post.status === 'draft' ? (
            <UtilButton
            icon={<MdOutlinePublishedWithChanges />}
                title={`Publish`}
              color="primary"
              onClick={publishPost}
          />
          ) : (
            <div className="flex items-center justify-center gap-2 font-sans mr-10">
            <UtilButton
              icon={<BsEye />}
              title={`Views`}
            />
            <p className="text-[#4B4B4B] text-[0.9rem]">{post.views}</p>
          </div> 
          )
        }
        
        <UtilButton
          icon={<BiTrashAlt />}
          title="delete"
          color="red-500"
          onClick={deletePost}
        />

        <UtilButton
          icon={<BiPencil />}
          title="edit"
          color="yellow-500"
          onClick={editPost}
        />

        {/* <UtilButton
						icon={<BsEye />}
						title='view'
						color="green-500"
						onClick={viewPost}
					/> */}
      </div>
    </div>
  );
};

export const Categories = ({ ids }: { ids: string[] }) => {
  const [{ categories }, dispatch] = useStateValue();
  return (
    categories &&
    categories
      .filter((category: Category) => ids.includes(category?._id || ""))
      .map((category: Category) => (
        <div
          style={{
            backgroundColor: ColorOpacity(category.color || "", 20),
          }}
          className=" py-1 px-5 rounded-md"
          key={category._id}
        >
          <p
            style={{
              color: category.color,
            }}
            className="text-xs truncate"
          >
            {category.title}
          </p>
        </div>
      ))
  );
};

type WriterProps = {
  id: string;
  className: string;
};

export const Writer = ({ id, className }: WriterProps) => {
  const [{ users, user }, dispatch] = useStateValue();

  // to make sure users are loaded
  useEffect(() => {
    if (users.length > 0) return;
    if (!user) return;
    FECTCH_ADMINS(user?.access_token, (data) => {
      dispatch({
        type: "SET_USERS",
        users: data,
      });
    });
  }, []);
  return (
    <div className={className}>
      <FaUserAlt className="text-primary " />
      <p>
        {(users && users.filter((user: User) => user._id === id)[0]?.name) ||
          "N/A"}
      </p>
    </div>
  );
};

export default AllPosts;
