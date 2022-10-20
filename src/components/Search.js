import React from "react";

function Search({onPlantSearch}) {
  //updating search state using callback
  function searchChange(e){
    onPlantSearch(e.target.value)
  }
  
  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        onChange={searchChange}
      />
    </div>
  );
}

export default Search;
