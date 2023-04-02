export const SignUp = (props) => {

return (
    <main className="sign_up">
      <h1 className="sign-up__headding">Зарегистрироваться</h1>
      <form className="sign-up__form">
        <label htmlFor="firstName">Введите имя</label>
        <input
          className="sign-up__firstName"
          type="text"
          id="firstName"
          onChange={(e) => handleInputChange(e, "firstName")}
        />

        <label htmlFor="lastName">Введите фамилию</label>
        <input
          className="sign-up__lastName"
          type="text"
          id="lastName"
          onChange={(e) => handleInputChange(e, "lastName")}
        />

        <label htmlFor="login">Введите адрес электронной почты*</label>
        <input
          className="sign-up__login"
          type="text"
          id="login"
          required
          onChange={(e) => handleInputChange(e, "login")}
        />

        <label htmlFor="pass">Введите пароль*</label>
        <input
          className="sign-up__pass"
          type="password"
          id="pass"
          required
          onChange={(e) => handleInputChange(e, "pass")}
        />

        <label htmlFor="pass-repeat">Повторите пароль*</label>
        <input
          className="sign-up__pass"
          type="password"
          id="passRepeat"
          onChange={(e) => handleInputChange(e, "passRepeat")}
        />

        <p>* обязательное для заполнения поле</p>
          <p className="err-msg">{msg}</p>
          <button
            className="button sign-up__btn"
            onClick={handleSignUp}
            type="submit"
          >
            ОК
          </button>
        </form>
      </main>
    );

function mapStateToProps(state) {
    return {
        state: state.clientId,
    };
}
} 
