import React from "react";
import List from "./List";

const Main = ({ props, bread }) => {
  let msg;

  if (props.props.result !== undefined) {
    msg = <List props={{ props }} />;
  }

  const sortByProperty = (property) => {
    return function (a, b) {
      if (a[property] > b[property]) return 1;
      else if (a[property] < b[property]) return -1;

      return 0;
    };
  };

  const clickHandler = () => {
    if (props.props.result.status === "success") {
      let data = props.props.result.msg;
      let result = data.sort(sortByProperty("Price")).reverse();
      props.props.setResult({msg: result, status: "success"});
      if (!bread.bread.title.includes('Sort')){
        let name = bread.bread.title;
        bread.bread.setTitle(`${name} (Sort by Highest Price)`)
      }
    }
  };

  return (
    <>
      <h1>{bread.bread.title}</h1>
      <button onClick={clickHandler} className="btn bg-info">
        Sort By Highest Price
      </button>
      <div className="book-list">{msg}</div>
    </>
  );
};

export default Main;
