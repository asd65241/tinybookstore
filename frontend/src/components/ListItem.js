import React from "react";
import {Link} from "react-router-dom";

const ListItem = ({ props }) => {
  let id = parseInt(props.BookId);

  let img_url = `/api/static/img/books/book_${id}.jpeg`;

  let new_arrival;

  if (props["New Arrival"] === "Yes") {
    new_arrival = <div className="card-header center text-danger">New Arrival!!</div>;
  }

  const detail_link = `/book/${props.BookId}`

  return (
    <>
      <div className="card">
        {new_arrival}
        <div className="card-content grid-container">
          <div className="book-img-container">
            <img src={img_url} alt={props.BookName} />
            <Link to={detail_link} className="btn bg-warning">View Detail</Link>
          </div>

          <ul>
            <li>Book Name: {props.BookName}</li>
            <li>Publisher: {props.Publisher}</li>
            <li>Author: {props.Author}</li>
            <li>Price: ${props.Price}</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ListItem;
