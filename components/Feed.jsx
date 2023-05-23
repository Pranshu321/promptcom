"use client";

import React, { useEffect } from "react";
import PromptCard from "./PromptCard.jsx";

const PromptCardList = ({ data, handleTagClick }) => {
  return <div className="mt-16">
    {data.map((prompt) => (
      <PromptCard key={prompt.id} post={prompt} handleTagClick={handleTagClick} />
    ))}
  </div>;
};

const Feed = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const [prompts, setPrompts] = React.useState([]);

  function handleSearchChange(e) {}

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      console.log(data[0].creator.image);

      setPrompts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form action="" className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search tags or a username"
          value={searchValue}
          onChange={handleSearchChange}
          required
          className="search_input peer text-[#2073E7] font-semibold"
        />
      </form>
      <PromptCardList data={prompts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
