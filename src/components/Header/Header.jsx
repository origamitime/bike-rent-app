import { Login } from './Login/Login';
import css from './Header.module.scss'
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className={css.header}>
      <nav>
        <ul className={css.list}>
          <li><Link to="/">Велопрокат</Link></li>
          <li><Link to="/about">О нас</Link></li>
          <li><Link to="/contacts">Контакты</Link></li>
        </ul>
      </nav>
      <Login />
    </header>
  );
}