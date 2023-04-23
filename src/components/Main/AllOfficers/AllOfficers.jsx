import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllOfficer } from '../../../utils/requests';
import css from './AllOfficers.module.scss'

const AllOfficers = (props) => {
  const localToken = localStorage.getItem("token");

  React.useEffect(() => {
    getAllOfficer(localToken);
  }, []);

  function handleDelOfficer(idDel) {
    fetch(`https://sf-final-project-be.herokuapp.com/api/officers/${idDel}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localToken}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === "OK") {
          getAllOfficer(localToken);
        }
      });
  }

  if (props.state.isLoadDone) {
    if (props.state.islogged) {
      return (
        <main className={css.main}>
          <h1 className={css.header}>Ответственные сотрудники</h1>
          <table className={css.table}>
            <thead className={css.tableHead}>
              <tr className={css.tableRow}>
                <th>Имя сотрудника</th>
                <th>Фамилия сотрудника</th>
                <th >
                  E-mail адрес сотрудника
                </th>
                <th >Статус сотрудника</th>
                <th>Действия</th>
              </tr>
            </thead>

            <tbody>
              {props.state.allOfficers.map((item) => {
                return (
                  <tr key={item._id} className={css.tableRow}>
                    <td className={css.tableDate}>{item.firstName}</td>
                    <td className={css.tableDate}>{item.lastName}</td>
                    <td className={css.tableDate}>{item.email}</td>
                    <td className={css.tableDate}>
                      {item.approved ? "одобрен" : "не одобрен"}
                    </td>
                    <td className={css.tableDate}>
                      <Link
                        className={css.link}
                        to={`/officers/${item._id}`}
                      >
                        Подробнее
                      </Link>
                      <button
                        className={css.button}
                        onClick={() => handleDelOfficer(item._id)}
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </main>
      );
    } else {
      return (
        <section className={css.errorMsg}>
          {props.state.message}
        </section>
      );
    }
  } 
};

function mapStateToProps(state) {
  return {
    state: {
      allOfficers: state.allOfficers,
      isLoadDone: state.isLoadDone,
      islogged: state.islogged,
      message: state.message,
    },
  };
}

export default connect(mapStateToProps)(AllOfficers);
