import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { store } from '../../store/store';
import { loadDone } from '../../store/actions';
import MainPicture from '../../assets/bicycle.jpg';
import css from './Main.module.scss'

function NotLoggedUser() {
  return (
    <div className={css.aside}>
<h1 className={css.asideHeader}>Учет угона велопроката</h1>
<p className={css.asideText}>Система позволяет контролировать угон велосипедов и своевременно реагировать на пропажи. 
  С помощью сервиса вы можете сообщить об угоне велосипеда.</p>
        <Link to="/createcase" className={css.mainLink}>Сообщить о краже</Link>
      </div>
    );
  }

  function LoggedUser() {
    return (
      <div className={css.aside}>
        <div className={css.linksArea}>
          <Link to="/createcase" className={css.mainLink}>Сообщить о краже</Link>
          <Link to="/cases" className={css.mainLink}>Сообщения о кражах</Link>
          <Link to="/officers" className={css.mainLink}>Ответственные сотрудники</Link>
        </div>
      </div>
    );
  }

export const Main = ({ islogged }) => {
    useEffect(() => {
      store.dispatch(loadDone(true));
    }, []);

    return (
      <main className={css.main}>
        {islogged ? <LoggedUser /> : <NotLoggedUser />}
        <div><img src={MainPicture} className={css.picture}/></div>
      </main>
    );
  }