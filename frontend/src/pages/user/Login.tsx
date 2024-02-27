import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const login = () => {
  let { loginUser } = useContext(AuthContext);
  return (
    <>
      <form onSubmit={loginUser}>
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
    </>
  );
};

export default login;
