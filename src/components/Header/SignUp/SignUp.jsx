import React, { useState } from 'react';
import { connect } from 'react-redux';
import css from './SignUp.module.scss'

const SignUp = (props) => {

  const [authorize, setAuthorize] = useState({
    login: "",
    pass: "",
    passRepeat: "",
    firstName: "",
    lastName: "",
    clientId: "",
  });
  const [msg, setMsg] = useState("");
  const [isSuccess, setSuccess] = useState(false);

  function handleInputChange(e, id) {
    setMsg("");
    let newState = authorize;
    newState[id] = e.target.value;
    setAuthorize(newState);
  }

  function handleSignUp(e) {
    e.preventDefault();
    if (!authorize.login) {
      setMsg("Адрес электронной почты не введен");
      return;
    }
    if (!authorize.pass) {
      setMsg("Пароль не введен");
      return;
    }
    if (authorize.pass !== authorize.passRepeat) {
      setMsg("Пароли не совпадают");
      return;
    }

    setMsg("");

    const body = {
      email: authorize.login,
      password: authorize.pass,
      clientId: props.state,
      firstName: authorize.firstName,
      lastName: authorize.lastName,
    };

    fetch("https://sf-final-project-be.herokuapp.com/api/auth/sign_up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ERR") {
          setMsg(data.message);
        }
        if (data.status === "OK") {
          setSuccess(true);
        }
      });
  }

  if (!isSuccess) {
    return (
      <main className={css.main}>
        <h1 className={css.header}>Зарегистрироваться</h1>
        <form className={css.form}>
          <label htmlFor="firstName" className={css.label}>Введите имя</label>
          <input
            className={css.input}
            type="text"
            id="firstName"
            onChange={(e) => handleInputChange(e, "firstName")}
          />

          <label htmlFor="lastName" className={css.label}>Введите фамилию</label>
          <input
            className={css.input}
            type="text"
            id="lastName"
            onChange={(e) => handleInputChange(e, "lastName")}
          />

          <label htmlFor="login" className={css.label}>Введите адрес электронной почты*</label>
          <input
            className={css.input}
            type="text"
            id="login"
            required
            onChange={(e) => handleInputChange(e, "login")}
          />

          <label htmlFor="pass" className={css.label}>Введите пароль*</label>
          <input
            className={css.input}
            type="password"
            id="pass"
            required
            onChange={(e) => handleInputChange(e, "pass")}
          />

          <label htmlFor="pass-repeat" className={css.label}>Повторите пароль*</label>
          <input
            className={css.input}
            type="password"
            id="passRepeat"
            onChange={(e) => handleInputChange(e, "passRepeat")}
          />
          <p className={css.errorMsg}>{msg}</p>

          <button
            className={css.button}
            onClick={handleSignUp}
            type="submit"
          >
            ОК
          </button>
        </form>
      </main>
    );
  } else {
    return (
        <div className={css.msg}>
          {authorize.login}, спасибо за регистрацию!
          <br />А теперь, пожалуйста, войдите в Вашу учетную запись
        </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    state: state.clientId,
  };
}

export default connect(mapStateToProps)(SignUp);