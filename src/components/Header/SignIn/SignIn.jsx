import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { store } from '../../../store/store';
import { logIn } from '../../../store/actions';
import css from './SignIn.module.scss'

const SignIn = (props) => {
  const [authorize, setAuthorize] = useState({
    login: "",
    pass: "",
  });

  let navigate = useNavigate();

  const [msg, setMsg] = useState("");

  function handleInputChange(e, id) {
    setMsg("");
    let newState = authorize;
    newState[id] = e.target.value;
    setAuthorize(newState);
  }

  function goHome() {
    navigate("/");
  }

  function handleSignIn(e) {
    e.preventDefault();

    if (!authorize.login || !authorize.pass) {
      setMsg("Адрес электронной почты и(или) пароль не введены");
      return;
    }
    const body = {
      email: authorize.login,
      password: authorize.pass,
    };

    fetch("https://sf-final-project-be.herokuapp.com/api/auth/sign_in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "OK") {
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("login", authorize.login);
          store.dispatch(logIn());
          goHome();
        } else {
          setMsg(result.message);
        }
      });
  }

  return (
    <main className={css.main}>
      <h1 className={css.header}>Войти</h1>
      <form className={css.form}>
        <label htmlFor="login" className={css.label}>
          Введите адрес электронной почты
        </label>
        <input
          className={css.input}
          type="text"
          id="login"
          onChange={(e) => handleInputChange(e, "login")}
        />
        <label htmlFor="pass" className={css.label}>Введите пароль</label>
        <input
          className={css.input}
          type="password"
          id="pass"
          onChange={(e) => handleInputChange(e, "pass")}
        />
        <p className={css.errorMsg}>{msg}</p>
        <button
          className={css.button}
          type="submit"
          onClick={handleSignIn}
        >
          ОК
        </button>
      </form>
    </main>
  );
};

function mapStateToProps(state) {
  return {
    state: state.islogged,
  };
}

export default connect(mapStateToProps)(SignIn);
