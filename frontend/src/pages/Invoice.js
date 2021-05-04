import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Invoice = ({ order, props }) => {
  const [cartItem, setCartItem] = useState(props.cartItems);
  const [orderInfo, setOrderInfo] = useState(order.orderInfo);

  let total_amount = 0;
  let total_qty = 0;

  for (let i in cartItem) {
    total_amount += cartItem[i].amount;
    total_qty += cartItem[i].qty;
  }

  console.log(cartItem);
  console.log(orderInfo);

  // Remove Cart item
  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify([]));
    localStorage.setItem("totalQty", JSON.stringify(0));
  });

  useEffect(() => {
    props.setCartItems([]);
    props.setTotalQty(0);
  }, []);

  useEffect(() => {
    order.setOrderInfo({
      fname: "",
      cname: "",
      addr1: "",
      addr2: "",
      city: "",
      region: "",
      country: "",
      postcode: "",
    });
  }, []);

  return (
    <>
      <div className="invoice">
        <h1>Invoice Page</h1>
        <div>
          <ul>
            <li>Fullname:{orderInfo.fname}</li>
            <li>Company:{orderInfo.cname}</li>
            <li>Address Line 1:{orderInfo.addr1}</li>
            <li>Address Line 2:{orderInfo.addr2}</li>
            <li>City:{orderInfo.city}</li>
            <li>Region:{orderInfo.region}</li>
            <li>Country:{orderInfo.country}</li>
            <li>Postcode:{orderInfo.postcode}</li>
          </ul>
        </div>
        <div>
          <h4>Your Order: </h4>
          <table>
            <thead>
              <tr>
                <th>Book</th>
                <th>Qty</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {cartItem.map((book) => (
                <tr key={book.BookId}>
                  <td>{book.BookName}</td>
                  <td>{book.qty} </td>
                  <td>${book.amount}</td>
                </tr>
              ))}
              <tr>
                <td>Total:</td>
                <td>{total_qty}</td>
                <td>${total_amount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <hr className="dotted"></hr>
      <div className="center">
        Thanks for ordering. Your books will be delivered within 7 working days
      </div>
      <Link to="/" className="btn bg-warning invoice-ok">
        OK
      </Link>
    </>
  );
};

export default Invoice;
