import React, { useRef, useEffect } from 'react';



function Search(props) {

  const searchRef = useRef();

  useEffect(function setupScroll() {
    function handleScroll() {
      if (window.scrollY > 60) {
        if (window.innerWidth > 640) {
          document.getElementById("search").classList.add("fixed", "top-0");
          document.getElementsByTagName("main")[0].classList.add("extra-margin");
        }
      }
      else {
        if (window.innerWidth > 640) {
          document.getElementById("search").classList.remove("fixed", "top-0");
          document.getElementsByTagName("main")[0].classList.remove("extra-margin");
        }
      }
    }
    window.addEventListener("scroll", handleScroll);
    return function cleanupScroll() {
      window.removeEventListener('scroll', handleScroll);
    }
  });


  return (
    <div className="py-2 px-5 border-b border-gray-500 flex flex-row flex-wrap bg-white w-full left-0 z-10 content-center" id="search">
      <form
        className="search relative"
        onSubmit={(event) => {
          props.handleSearch(event, searchRef.current.value)
          searchRef.current.value = "";
        }}>
        <input placeholder="Search"
          type="text"
          ref={searchRef}
          className="rounded-full border border-gray-500 px-3 py-1 relative w-full" />
        <i className="fas fa-search absolute right-0 bottom-0 mb-2 text-gray-600 mr-2"></i>
      </form>

      <div className="overflow-auto ml-0 sm:ml-6 mt-2 sm:mt-0 flex flex-row">
        {props.searchState.map(term => {
          return (
            <div className="mx-1 bg-gray-300 py-1 pr-1 pl-3 rounded-full whitespace-no-wrap" key={term}>
              {term}
              <i className="fas fa-times ml-2 mr-1 text-gray-500 cursor-pointer"
                onClick={() => { props.removeTerm(term) }}></i>
            </div>
          )
        })
        }
      </div>

    </div>
  )
}

export default Search;