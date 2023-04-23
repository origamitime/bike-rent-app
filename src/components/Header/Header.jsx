import css from './Header.module.scss'
import { Link, useNavigate } from 'react-router-dom';
import { store } from '../../store/store';
import { connect } from 'react-redux';
import { logOut } from '../../store/actions';

function NotLoggedUser() {
  return (
    <div className={css.linksAuth}>
      <Link to="/sign_in" className={css.link}>
        Войти
      </Link>
      <Link to="/sign_up" className={css.link}>
        Зарегистрироваться
      </Link>
    </div>
  );
}

function LoggedUser() {
  let navigate = useNavigate();
  function goHome() {
    navigate("/");
  }

  function handleSignOut() {
    store.dispatch(logOut());
    localStorage.removeItem("token");
    localStorage.removeItem("login");
    goHome();
  }

  const localLogin = localStorage.getItem("login");

  return (
    <div className={css.login}>
      <div className={css.loginSignature}>{localLogin}</div>
      <button onClick={handleSignOut} className={css.button}>Выйти</button>
    </div>
  );
}

export const Header = (props) => {
  return (
    <header className={css.header}>
        <div className={css.linkMain}>
          <Link to="/" className={css.link}>Главная</Link>{props.state.islogged ? <LoggedUser /> : <NotLoggedUser />}
        </div>
    </header>
  );
}

function mapStateToProps(state) {
  return {
    state: {
      token: state.TOKEN,
      islogged: state.islogged,
    },
  };
}

export default connect(mapStateToProps)(Header);