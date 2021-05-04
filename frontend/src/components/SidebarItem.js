import React from "react";
import { Link } from "react-router-dom";
import BookFilterServices from "../services/BookFilterServices";

const SidebarItem = ({ props,bread}) => {
  const clickHandler = async (e) => {
    let result = await BookFilterServices(props.name);
    props.props.props.setResult(result);
    bread.bread.bread.setTitle(`All ${props.name}:`);
  };

  let endpoint = `/#${props.name}`

  return <Link to={endpoint} onClick={clickHandler}>{props.name} </Link>;
};

export default SidebarItem;
