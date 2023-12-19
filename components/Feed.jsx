"use client";

import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard.jsx";
import { revalidatePath } from "next/cache";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="flex justify-center gap-5 flex-wrap w-[98vw] mb-12 flex-row">
      {data.map((prompt) => (
        <PromptCard
          key={prompt.id}
          post={prompt}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt", {
        next: {
          revalidate: 0,
        },
      });
      const data = await res.json();
      console.log(data);
      setAllPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search tags or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input mb-10 peer text-[#2073E7] font-bold"
        />
      </div>
      <PromptCardList
        data={searchText !== "" ? searchedResults : allPosts}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
