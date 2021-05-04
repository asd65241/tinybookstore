import React, { useState } from "react";
import BookFilterServices from "../services/BookFilterServices";
import SidebarItem from "./SidebarItem";

const Sidebar = ({props,bread}) => {
  const [cat, setCat] = useState();

  const getBookCat = async () => {
    let result = await BookFilterServices();
    setCat(result.msg);
  };

  let msg;

  if (cat === undefined) {
    getBookCat();
  } else {
    msg = cat.map((name) => <SidebarItem key={name} bread={{bread}} props={{ name, props }} />);
  }

  return (
    <>
      <div className="sidenav">
        <div className="cat-header">Catagory:</div>
        {msg}
      </div>
    </>
  );
};

export default Sidebar;
