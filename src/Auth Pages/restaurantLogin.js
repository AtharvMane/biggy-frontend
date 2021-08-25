import axios from "axios";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import logincss from "./loginPage.module.css";

function LoginPage(props) {
  const [user, setuser] = useState({ email: "", password: "" });
  const [error, seterror] = useState("");
  const history = useHistory();

  const addUser = (e) => {
    e.preventDefault();
    axios
      .post("https://biggy-backend.herokuapp.com/RestaurantSide/login", user, {
        header: { "Component-Type": "application/json" },
      })
      .then((res) => {
        localStorage.setItem("authToken", res.data.token);
        history.push(`/restaurantsSide/${res.data.id}`);
      })

      .catch((err) => {
        seterror((prevError) => (prevError = err.response.data.error));
        setTimeout(() => {
          seterror("");
        }, 6000);
      });
  };

  return (
    <div style={{ position: "relative", top: "15vh" }}>
      <div className={logincss.loginWrap}>
        <h2 className={logincss.loginWrapH2}>Restaurant Login</h2>
        {error && <div className={logincss.error}>{error}</div>}

        <form
          className={logincss.form}
          onSubmit={(e) => {
            addUser(e);
          }}
        >
          <input
            className={logincss.inputtext}
            type="text"
            placeholder="Username"
            name="un"
            onChange={(event) => {
              setuser({ ...user, email: event.target.value });
            }}
          />
          <input
            className={logincss.inputPassword}
            type="password"
            placeholder="Password"
            name="pw"
            onChange={(event) => {
              setuser({ ...user, password: event.target.value });
            }}
          />

          <input
            type="submit"
            className={logincss.loginButton}
            value="Sign In"
          ></input>
          <p className={logincss.para}>
            {" "}
            <Link to="/restaurantRegister" styles={{ color: "blue" }}>
              {" "}
              Register as an Affiliated Restaurant{" "}
            </Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
