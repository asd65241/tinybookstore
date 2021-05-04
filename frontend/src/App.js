import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Invoice from "./pages/Invoice";
import Nav from "./components/Nav";
import Error from "./components/Error";
import Detail from "./pages/Detail";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import CheckLoginServices from "./services/CheckLoginServices";
import AuthContext from "./services/AuthContext";
import Logout from "./pages/Logout";

function App() {
  const [isLoggedIn, setLogin] = useState(false);
  const [result, setResult] = useState();
  const [title, setTitle] = useState("All Book");
  const [cartItems, setCartItems] = useState([]);
  const [totalQty, setTotalQty] = useState(0);
  const [orderInfo, setOrderInfo] = useState({
    fname: "",
    cname: "",
    addr1: "",
    addr2: "",
    city: "",
    region: "",
    country: "",
    postcode: "",
  });

  // Save Current Session to State
  useEffect(() => {
    const cartData = localStorage.getItem("cartData");

    if (cartData) {
      setCartItems(JSON.parse(cartData));
    }
  }, []);

  useEffect(() => {
    const tQty = localStorage.getItem("totalQty");

    if (tQty) {
      setTotalQty(JSON.parse(tQty));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cartItems));
  });

  useEffect(() => {
    localStorage.setItem("totalQty", JSON.stringify(totalQty));
  });

  // End of Use State

  const addItems = (Book, qty) => {
    // if Items already exsist
    setTotalQty(totalQty + qty);
    const exist = cartItems.find((x) => x.BookId === Book.BookId);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.BookId === Book.BookId
            ? {
                ...exist,
                qty: exist.qty + qty,
                amount: exist.amount + qty * Book.Price,
              }
            : x
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        { ...Book, qty: qty, amount: qty * Book.Price },
      ]);
    }
  };

  const removeItems = (BookId) => {
    const exist = cartItems.find((x) => x.BookId === BookId);
    if (exist) {
      setTotalQty(totalQty - exist.qty);
      setCartItems(cartItems.filter((x) => x.BookId !== BookId));
    }
  };

  const tryLogin = async () => {
    let result = await CheckLoginServices();

    if (result.status === "success") {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };

  tryLogin();

  return (
    <>
      <AuthContext.Provider value={{ isLoggedIn, setLogin }}>
        <BrowserRouter>
          <Nav
            items={{ totalQty }}
            bread={{ title, setTitle }}
            props={{ result, setResult }}
          />
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => (
                <Shop
                  bread={{ title, setTitle }}
                  props={{ result, setResult }}
                />
              )}
            />
            <Route path="/login" component={Login} />
            <Route
              path="/logout"
              render={(props) => (
                <Logout
                  props={{ setCartItems, setTotalQty, cartItems, totalQty }}
                />
              )}
            />
            <Route path="/create" component={Register} />
            <Route
              path="/cart"
              render={(props) => <Cart cart={{ cartItems, removeItems }} />}
            />
            <Route
              path="/checkout"
              render={(props) => (
                <Checkout
                  order={{ orderInfo, setOrderInfo }}
                  props={{ isLoggedIn, cartItems }}
                />
              )}
            />
            <Route
              path="/invoice"
              render={(props) => (
                <Invoice
                  order={{ orderInfo, setOrderInfo }}
                  props={{ cartItems, setCartItems, totalQty, setTotalQty }}
                />
              )}
            />
            <Route
              path="/book/:BookId"
              render={(props) => <Detail addItems={{ addItems }} />}
            />
            <Route component={Error} />
          </Switch>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
}

export default App;
