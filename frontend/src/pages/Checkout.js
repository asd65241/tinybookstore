import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import CreateServices from "../services/CreateServices";
import AuthContext from "../services/AuthContext";

const Checkout = ({ props, order }) => {
  const [errMsg, setMsg] = useState();
  const [user, setUser] = useState({ username: "", password: "" });
  const value = useContext(AuthContext);

  let total_amount = 0;
  let total_qty = 0;

  for (let i in props.cartItems) {
    total_amount += props.cartItems[i].amount;
    total_qty += props.cartItems[i].qty;
  }

  const changeHandler = (e) => {
    if (e.target.name in order.orderInfo) {
      let temp = order.orderInfo;
      temp[e.target.name] = e.target.value;
      order.setOrderInfo(temp);
    } else if (e.target.name in user) {
      let temp = user;
      temp[e.target.name] = e.target.value;
      setUser(temp);
    }
  };

  const history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (props.isLoggedIn) {
      // Check if cart is empty
      console.log("Redirecting");
      history.push("/invoice");
    } else {
      let result = await CreateServices(user.username, user.password);
      if (result.status === "success") {
        value.setLogin(true);
        console.log("Redirecting");
        history.push("/invoice");
      } else {
        setMsg(result.msg);
      }
    }
  };

  let noLoginWelcome = (
    <>
      <div className="checkout-banner">
        <div>
          <h4>I am a new Customer</h4>
          <p>Please Checkout Below</p>
        </div>
        <h4>Or</h4>
        <div>
          <h4>I'm already a customer</h4>
          <Link to="/login" className="btn bg-warning">
            Sign In
          </Link>
        </div>
      </div>
    </>
  );

  let createAc = (
    <>
      <h4>Create Account:</h4>
      <h4 className="text-danger center">{errMsg}</h4>
      <div className="checkout-create-inline">
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Desired Username"
            onChange={changeHandler}
            autoFocus
            autoComplete="off"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Username</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={changeHandler}
            placeholder="Desired Password"
            required
          />
        </div>
      </div>
    </>
  );

  let delvery_msg = (
    <>
      <h4>Delivery Address:</h4>
      <div className="checkout-form">
        <label htmlFor="fname">Full Name:</label>
        <input
          type="text"
          name="fname"
          id="fname"
          placeholder="Required"
          onChange={changeHandler}
          required
        ></input>
        <label htmlFor="cname">Company Name:</label>
        <input
          type="text"
          name="cname"
          id="cname"
          onChange={changeHandler}
        ></input>
        <label htmlFor="addr1">Address Line 1:</label>
        <input
          type="text"
          name="addr1"
          id="addr1"
          placeholder="Required"
          onChange={changeHandler}
          required
        ></input>
        <label htmlFor="addr2">Address Line 2:</label>
        <input
          type="text"
          name="addr2"
          id="addr2"
          onChange={changeHandler}
        ></input>
        <label htmlFor="city">City:</label>
        <input
          type="text"
          name="city"
          id="city"
          placeholder="Required"
          onChange={changeHandler}
          required
        ></input>
        <label htmlFor="region">Region/State/District</label>
        <input
          type="text"
          name="region"
          id="region"
          onChange={changeHandler}
        ></input>
        <label htmlFor="country">Country</label>
        <input
          type="text"
          name="country"
          id="country"
          placeholder="Required"
          onChange={changeHandler}
          required
        ></input>
        <label htmlFor="postcode">Postcode/Zip Code</label>
        <input
          type="text"
          name="postcode"
          id="postcode"
          placeholder="Required"
          onChange={changeHandler}
          required
        ></input>
      </div>
    </>
  );

  let cartItem = (
    <>
      <h4>Your Order: </h4>
      <Link to="/cart" className="btn bg-warning">
        Change Items
      </Link>
      <table>
        <thead>
          <tr>
            <th>Book</th>
            <th>Qty</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {props.cartItems.map((book) => (
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
    </>
  );

  let submitBtn;

  if (props.cartItems.length > 0) {
    submitBtn = (
      <button type="submit" className="btn bg-info">
        Confirm
      </button>
    );
  } else {
    submitBtn = (
      <Link to="/" className="btn bg-info">
        No Book Now. Go and Get Some Book!
      </Link>
    );
  }

  if (props.isLoggedIn === true) {
    return (
      <div className="checkout">
        <form className="login-form" action="#" onSubmit={submitHandler}>
          {delvery_msg}
          <hr className="dotted"></hr>
          {cartItem}
          <hr className="dotted"></hr>
          {submitBtn}
        </form>
      </div>
    );
  } else {
    return (
      <div className="checkout">
        <form className="login-form" action="#" onSubmit={submitHandler}>
          {noLoginWelcome}
          <hr className="dotted"></hr>
          {createAc}
          <hr className="dotted"></hr>
          {delvery_msg}
          <hr className="dotted"></hr>
          {cartItem}
          <hr className="dotted"></hr>
          {submitBtn}
        </form>
      </div>
    );
  }
};

export default Checkout;
