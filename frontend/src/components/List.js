import React from "react";
import ListItem from "./ListItem";

const List = ({ props }) => {
  let msg;

  if (props.props.props.result.status === "success") {
    msg = (props.props.props.result.msg.map((element) => <ListItem key={element.BookId} props={element} />))
  } else {
    msg = <p>{props.props.props.result.msg}</p>;
  }

  return <>{msg}</>;
};

export default List;
