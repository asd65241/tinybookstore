import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import CreateServices from "../services/CreateServices";
import AuthContext from "../services/AuthContext";


const Register = () => {
  const [errMsg, setMsg] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();
  const value = useContext(AuthContext);

  const changeHandler = (e) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let result = await CreateServices(username, password);
    if (result.status === "success") {
      value.setLogin(true);
      return history.push("/");
    } else {
      setMsg(result.msg);
    }
  };

  return (
    <>
      <div className="grid-center">
        <div className="card">
          <div className="card-header center">Register</div>
          <div className="card-content">
            <p className="text-danger center">{errMsg}</p>
            <form className="login-form" action="#" onSubmit={submitHandler}>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                onChange={changeHandler}
                autoFocus
                autoComplete="off"
                required
              />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                onChange={changeHandler}
                required
              />
              <button className="btn bg-primary" type="submit">
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
