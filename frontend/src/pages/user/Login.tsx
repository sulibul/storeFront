import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "../../assets/styles/userFunctionality/login.scss";

const login = () => {
  let { loginUser } = useContext(AuthContext);
  return (
    <>
      <div className="login-container">
        <form onSubmit={loginUser}>
          <h1>Login</h1>
          <label>Email</label>
          <input type="text" name="email" id="email" placeholder="email" />
          <label>Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
          />
          <input type="submit" />
        </form>
      </div>
    </>
  );
};

export default login;
