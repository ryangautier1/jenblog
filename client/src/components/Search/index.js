import React, { useState, useRef } from 'react';



function Search() {

  const [searchState, setSearchState] = useState(["Food"]);
  const searchRef = useRef();

  const handleSearch = (event) => {
    event.preventDefault();
    let term = searchRef.current.value;
    // terms.push(searchRef.current.value)
    setSearchState([...searchState, term]);
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
        <i class="fas fa-search absolute right-0 bottom-0 mb-4 text-gray-600"></i>
      </form>

      <div className="overflow-auto ml-6 flex flex-row">
        {searchState.map(term => {
          console.log(term)
          return (
            <div className="mx-1 bg-gray-300 p-2 pl-3 rounded-full">
              {term}
              <i class="fas fa-times ml-2 mr-1 text-gray-500"></i>
            </div>
          )
        })
        }
      </div>

    </div>
  )
}

export default Search;