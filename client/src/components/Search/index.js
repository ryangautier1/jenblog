import React, { useState, useRef } from 'react';



function Search() {

  const [searchState, setSearchState] = useState([]);
  const searchRef = useRef();

  // this function updates the state with user input and clears the search field
  const handleSearch = (event) => {
    event.preventDefault();
    let term = searchRef.current.value;
    setSearchState([...searchState, term]);
    searchRef.current.value = "";
  }

  // this function updates the state to remove the item clicked
  const removeTerm = (term) => {
    let newTerms = searchState.filter(item => item !== term);
    setSearchState(newTerms);
  }

  return (
    <div className="py-2 px-5 border-b border-gray-500 flex flex-row bg-white shadow fixed w-full top-0 left-0 z-10 content-center">
      <form
        className="search relative"
        onSubmit={(event) => handleSearch(event)}>
        <input placeholder="Search"
          type="text"
          ref={searchRef}
          className="rounded-full border border-gray-500 px-3 py-1 relative" />
        <i className="fas fa-search absolute right-0 bottom-0 mb-2 text-gray-600"></i>
      </form>

      <div className="overflow-auto ml-6 flex flex-row">
        {searchState.map(term => {
          return (
            <div className="mx-1 bg-gray-300 py-1 pr-1 pl-3 rounded-full" key={term}>
              {term}
              <i className="fas fa-times ml-2 mr-1 text-gray-500 cursor-pointer"
              onClick={() => {removeTerm(term)}}></i>
            </div>
          )
        })
        }
      </div>

    </div>
  )
}

export default Search;