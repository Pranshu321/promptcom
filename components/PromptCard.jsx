"use client";

import React from 'react'
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { usePathname , useRouter } from 'next/navigation';

const PromptCard = ({post , handleTagClick , handleEdit , handleDelete}) => {
    const [copied , setCopied] = React.useState("");
  const handleCopy = () => {
    setCopied(post.prompt);
    console.log(copied);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };
    console.log(post);
  return (
    <div className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
      <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600" />
      <div className="sm:flex sm:justify-between sm:gap-4">
        <div>
          <h3
            onClick={() => console.log(post.creator.image)}
            className="text-lg font-bold text-gray-900 sm:text-xl"
          >
            {post.creator.username}
          </h3>
          <p className="mt-1 text-xs font-medium text-gray-600">
            By {post.creator.email}
          </p>
        </div>
        <div className="hidden sm:block sm:shrink-0">
          <Image
            src={post.creator.image}
            width={50}
            height={50}
            className="rounded-full"
          />
        </div>
        <div
          className="copy_btn"
          onClick={() => {
            handleCopy
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
        <div className="flex flex-col-reverse">
          <dt className="text-sm font-medium text-gray-600">Published</dt>
          <dd className="text-xs text-gray-500">31st June, 2021</dd>
        </div>
        <div className="flex flex-col-reverse">
          <dt className="text-sm font-medium text-gray-600">Reading time</dt>
          <dd className="text-xs text-gray-500">3 minute</dd>
        </div>
      </dl>
    </div>
  );
}

export default PromptCard
