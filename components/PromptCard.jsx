"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = React.useState("");
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const handleCopy = () => {
    setCopied(post.prompt);
    console.log(copied);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };
  // console.log(post);
  return (
    <div className="w-80 relative block bg-slate-100 overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
      <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 to-blue-600" />
      <div className="sm:flex sm:justify-between sm:gap-4">
        <div>
          <h3
            onClick={handleProfileClick}
            className="text-lg font-bold text-gray-900 sm:text-xl"
          >
            {post.creator.username}
          </h3>
          <p className="mt-1 text-xs font-medium text-gray-600">
            By {post.creator.email}
          </p>
        </div>
        <div
          onClick={handleProfileClick}
          className="hidden cursor-pointer sm:block sm:shrink-0"
        >
          <Image
            src={post.creator.image}
            width={50}
            height={50}
            className="rounded-full"
          />
        </div>
        <div
          className="copy_btn shadow-xl shadow-black"
          onClick={() => {
            handleCopy;
          }}
        >
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
            onClick={handleCopy}
          />
        </div>
      </div>
      <div className="mt-4">
        <p className="max-w-[40ch] text-sm text-gray-500">{post.prompt}</p>
      </div>
      <dl className="mt-6 flex gap-4 sm:gap-6">
        <div
          onClick={() => handleTagClick && handleTagClick(post.tag)}
          className="flex flex-col-reverse"
        >
          <dt className="text-sm font-medium text-gray-600">
            Tags: {post.tag}
          </dt>
        </div>
      </dl>
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 font-semibold flex-end gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient hover:underline cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient hover:underline cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
