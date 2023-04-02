import React, { useState } from "react";

export const SignIn = (props) => {

return (
    <main className="sign_in">
      <h1 className="sign-in__headding">Войти</h1>
      <form className="sign-in__form">
        <label htmlFor="login" className="sign-in__login-lable">
          Введите адрес электронной почты
        </label>
        <input
          className="sign-in__login"
          type="text"
          id="login"
          onChange={(e) => handleInputChange(e, "login")}
        />
        <label htmlFor="pass">Введите пароль</label>
        <input
          className="sign-in__pass"
          type="password"
          id="pass"
          onChange={(e) => handleInputChange(e, "pass")}
        />
        <p className="err-msg">{msg}</p>
        <button
          className="button sign-in__btn"
          type="submit"
          onClick={handleSignIn}
        >
          ОК
        </button>
      </form>
    </main>
  );
};