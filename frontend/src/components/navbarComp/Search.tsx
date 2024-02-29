import React, { useState } from "react";
import { useNavigate } from "react-router";

const Search = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log(encodeURIComponent(search));
    // event.preventDefault();
    // Navigate to the search results page with the search query
    navigate(`/search/${encodeURIComponent(search)}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          id="site-search"
          name="q"
          placeholder="what are you looking for"
          value={search}
          onChange={handleChange}
        />
        <input type="submit" value="Search" />
      </form>
    </>
  );
};

export default Search;
