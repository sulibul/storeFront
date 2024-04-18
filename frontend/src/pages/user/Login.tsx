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
              <input type="text" name="email" id="email" placeholder="Email" />
            </div>
            <div className="input password-input">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
            </div>
            <input className="submit-button" type="submit" value="Submit" />
          </form>
        </div>
        <div className="register-box">
          <p></p>
          <Button
            onClick={() => {
              navigate("/user/register");
            }}
            className=""
          >
            <a>No account?</a>
          </Button>
        </div>
      </div>
    </>
  );
};

export default login;
