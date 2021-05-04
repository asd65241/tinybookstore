import React from "react";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import BookFetchServices from "../services/BookFetchServices";

const Shop = ({props, bread}) => {

  const getAllBook = async () => {
    let result = await BookFetchServices();
    props.setResult(result);
  };

  if (props.result === undefined) {
    getAllBook();
  }

  return (
    <>
      <Sidebar bread={{bread}} props={{ props }} />
      <div className="main">
        <div className="container">
          <Main bread={{bread}} props={{ props }} />
        </div>
      </div>
    </>
  );
};

export default Shop;
