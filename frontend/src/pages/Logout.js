import React, { useEffect, useContext } from "react";
import LogoutServices from "../services/LogoutServices";
import AuthContext from "../services/AuthContext";
import { useHistory } from "react-router-dom";

const Logout = ({ props }) => {
  const value = useContext(AuthContext);
  const history = useHistory();

  // Remove session from backend
  LogoutServices();

  // Remove Local State
  useEffect(() => {
    value.setLogin(false);
  }, []);

  useEffect(() => {
    props.setCartItems([]);
    props.setTotalQty(0);
  }, []);

  setTimeout(() => {
    console.log("Redirecting!");
    history.push("/");
  }, 3000);

  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify([]));
    localStorage.setItem("totalQty", JSON.stringify(0));
  });

  return (
    <div className="grid-center">
      Logout Success! Redirect To Main Page In 3 seconds!
    </div>
  );
};

export default Logout;
