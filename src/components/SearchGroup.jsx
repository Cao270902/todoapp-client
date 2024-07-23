import React, { useEffect } from "react";

import { getQueryString } from "../utils";

const SearchGroup = ({
  searchValue,
  setSearchValue,
  filterValue,
  setFilterValue,
}) => {
  return (
    <div className="search-group m-3 flex gap-2">
      <input
        type="text"
        placeholder="Search..."
        id="search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="rounded border p-2 shadow-md"
      />
      <select
        id="filter"
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
        className="rounded border p-2 shadow-md hover:cursor-pointer"
      >
        <option value="0">All</option>
        <option value="1">Completed</option>
        <option value="-1">Not Done</option>
      </select>
    </div>
  );
};

export default SearchGroup;
