import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import BookDetailsServices from "../services/BookDetailsServices";

const Detail = ({ addItems }) => {
  const { BookId } = useParams();

  const [detail, setDetail] = useState(null);
  const [qty, setQty] = useState(1);

  const getBookDetail = async (id) => {
    let result = await BookDetailsServices(id);
    if (result.status === "success") {
      setDetail(result.msg[0]);
    }
  };

  if (detail === null) {
    getBookDetail(BookId);
  }

  if (detail != null) {
    let id = parseInt(BookId);

    let img_url = `/api/static/img/books/book_${id}.jpeg`;

    let new_arrival;

    if (detail["New Arrival"] === "Yes") {
      new_arrival = (
        <div className="card-header center text-danger">New Arrival!!</div>
      );
    }

    const changHandler = (e) => {
      if (e.target.value) {
        setQty(parseInt(e.target.value));
      }
    };

    const addToCart = () => {
      let book = {
        BookId: detail.BookId,
        BookName: detail.BookName,
        Price: detail.Price,
      };
      addItems.addItems(book, qty);
    };

    return (
      <>
        <div className="grid-center detail">
          <div className="card">
            <h3 className="detail-breadcum">
              <Link to="/">Home</Link> &rarr;{" "}
              <Link to={`/book/${detail.BookId}`}>{detail.BookName}</Link>
            </h3>
            {new_arrival}
            <div className="card-content grid-container">
              <div className="book-img-container">
                <img src={img_url} alt={detail.BookName} />
              </div>

              <ul>
                <li>Book Name: {detail.BookName}</li>
                <li>Publisher: {detail.Publisher}</li>
                <li>Category: {detail.Category}</li>
                <li>Language: {detail.Lang}</li>
                <li>Author: {detail.Author}</li>
                <li>Price: ${detail.Price}</li>
                <li>Published: {detail.Published}</li>
                <li>Description: {detail.Description}</li>
              </ul>
            </div>
            <div class="center">
              Order:
              <input
                type="number"
                onChange={changHandler}
                value={qty}
              ></input>
            </div>

            <div className="detail-btn-control ">
              <button className="btn bg-info right" onClick={addToCart}>
                Add to Cart
              </button>
              <Link to="/" className="btn bg-warning left">
                Back
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <div className="grid-center">No record {BookId}</div>;
  }
};

export default Detail;
