import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "../../assets/styles/userFunctionality/login.scss";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";

const login = () => {
  const navigate = useNavigate();

  let { loginUser } = useContext(AuthContext);
  return (
    <>
      <div className="login-page">
        <div className="login-container">
          <form onSubmit={loginUser}>
            <h1>Login</h1>
            <div className="input email-input">
              <label>Email</label>
              <input type="text" name="email" id="email" />
            </div>
            <div className="input password-input">
              <label>Password</label>
              <input type="password" name="password" id="password" />
            </div>
            <input className="submit-button" type="submit" value="Login" />
          </form>
        </div>
        <div className="register-box">
          <p>No account?</p>
          <Button
            onClick={() => {
              navigate("/user/register");
            }}
            className=""
          >
            <p>Register</p>
          </Button>
        </div>
      </div>
    </>
  );
};

export default login;
