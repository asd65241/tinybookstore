import { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import AuthContext from "../services/AuthContext";
import BookFetchServices from "../services/BookFetchServices";
import Search from "./Search";

const Nav = ({ props, bread, items }) => {
  const value = useContext(AuthContext);
  const [showed, setShowed] = useState(false);

  const searchHandler = async (e) => {
    let result = await BookFetchServices("");
    props.setResult(result);
    bread.setTitle("All Book:");
  };

  const onToggle = () => {
    setShowed(!showed);
    console.log(`Showed: ${showed}`);
  };

  let link;
  let link_show;

  // Normal
  if (value.isLoggedIn === false) {
    link = (
      <>
        <li>
          <NavLink to="/login" className="nav-items" activeClassName="active">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/create" className="nav-items" activeClassName="active">
            Register
          </NavLink>
        </li>
      </>
    );
  } else {
    link = (
      <>
        <li>
          <Link to="/logout" className="nav-items">
            Logout
          </Link>
        </li>
      </>
    );
  }

  // Showed
  if (value.isLoggedIn === false) {
    link_show = (
      <>
        <li>
          <NavLink
            to="/login"
            className="nav-items"
            activeClassName="active"
            onClick={onToggle}
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/create"
            className="nav-items"
            activeClassName="active"
            onClick={onToggle}
          >
            Register
          </NavLink>
        </li>
      </>
    );
  } else {
    link_show = (
      <>
        <li>
          <Link to="/logout" className="nav-items" onClick={onToggle}>
            Logout
          </Link>
        </li>
      </>
    );
  }

  if (!showed) {
    return (
      <nav className="nav">
        <ul>
          <li>
            <NavLink to="/" className="nav-items brand" onClick={searchHandler}>
              Tiny Bookstore
            </NavLink>
          </li>
          <li>
            <Link to="#" class="nav-items toggle" onClick={onToggle}>
              &#8801;
            </Link>
          </li>
          {link}
          <li>
            <NavLink className="nav-items" to="/cart" activeClassName="active">
              Cart <span className="cart-number">{items.totalQty}</span>
            </NavLink>
          </li>
          <li>
            <Search bread={{ bread }} props={{ props }} />
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav className="nav showed">
        <ul>
          <li>
            <NavLink
              to="/"
              className="nav-items brand"
              onClick={() => {
                searchHandler();
                onToggle();
              }}
            >
              Tiny Bookstore
            </NavLink>
          </li>
          <li>
            <Link to="#" class="nav-items toggle" onClick={onToggle}>
              &#8801;
            </Link>
          </li>
          {link_show}
          <li>
            <NavLink
              className="nav-items cart-qty"
              to="/cart"
              activeClassName="cart-number active"
              onClick={onToggle}
            >
              Cart ({items.totalQty})
            </NavLink>
          </li>
          <li>
            <Search bread={{ bread }} props={{ props }} btn={{ onToggle }} />
          </li>
        </ul>
      </nav>
    );
  }
};

export default Nav;
