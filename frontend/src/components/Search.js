import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import BookFetchServices from "../services/BookFetchServices";

const Search = ({ props, bread, btn }) => {
  const [searchText, setSearchText] = useState("");

  const searchHandler = async (e) => {
    let result = await BookFetchServices(searchText);
    props.props.setResult(result);
    if (searchText === "") {
      bread.bread.setTitle("All Book:");
    } else {
      bread.bread.setTitle(`Search Result: ${searchText}`);
    }
  };

  const changeHandler = (e) => {
    setSearchText(e.target.value);
  };

  if (!btn) {
    return (
      <>
        <input
          type="text"
          placeholder="Search.."
          name="search"
          className="nav-input"
          onChange={changeHandler}
        />
        <Link
          to="/"
          className="text-light bg-warning nav-search"
          onClick={searchHandler}
        >
          Search
        </Link>
      </>
    );
  } else {
    return (
      <>
        <input
          type="text"
          placeholder="Search.."
          name="search"
          className="nav-input"
          onChange={changeHandler}
        />
        <Link
          to="/"
          className="text-light bg-warning nav-search"
          onClick={() => {
            searchHandler();
            btn.onToggle();
          }}
        >
          Search
        </Link>
      </>
    );
  }
};

export default Search;
