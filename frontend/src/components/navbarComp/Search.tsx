import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const Search = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Navigate to the search results page with the search query
    navigate(`/search/${encodeURIComponent(search)}`, { replace: true });
    navigate(0);
  };

  return (
    <>
      <div className="search-container">
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            id="site-search"
            name="q"
            placeholder="Search"
            value={search}
            onChange={handleChange}
          />
          <input type="submit" className="submit-search" value="Search" />
        </form>
      </div>
    </>
  );
};

export default Search;
