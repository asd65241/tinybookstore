import React from "react";
import { Link } from "react-router-dom";

const Cart = ({ cart }) => {
  let msg = <h1>No Cart Item. Please Add Some!</h1>;

  const deleteHandler = (e) => {
    cart.removeItems(e.target.value);
  };

  if (cart.cartItems.length > 0) {
    let total_amount = 0;
    let total_qty = 0;

    for (let i in cart.cartItems) {
      total_amount += cart.cartItems[i].amount;
      total_qty += cart.cartItems[i].qty;
    }

    msg = (
      <table>
        <thead>
          <tr>
            <th>Book</th>
            <th>Qty</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {cart.cartItems.map((book) => (
            <tr key={book.BookId}>
              <td>{book.BookName}</td>
              <td>{book.qty} </td>
              <td>${book.amount}</td>
              <td>
                <button
                  value={book.BookId}
                  onClick={deleteHandler}
                  className="btn bg-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          <tr>
            <td>Total:</td>
            <td>{total_qty}</td>
            <td>${total_amount}</td>
          </tr>
        </tbody>
      </table>
    );
  }

  let btn;

  if (cart.cartItems.length > 0) {
    btn = (
      <div>
        <Link to="/" className="btn bg-warning left">
          Back
        </Link>
        <Link to="/checkout" className="btn bg-info left">
          Checkout
        </Link>
      </div>
    );
  } else {
    btn = (
      <div>
        <Link to="/" className="btn bg-warning left">
          Back
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="grid-center">
        {msg}
        {btn}
      </div>
    </>
  );
};

export default Cart;
