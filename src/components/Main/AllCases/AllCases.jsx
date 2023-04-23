import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllCases } from '../../../utils/requests';
import { getOneCase } from '../../../utils/requests';
import css from './AllCases.module.scss'

const AllCases = (props) => {
  const localToken = localStorage.getItem("token");

  React.useEffect(() => {
    getAllCases(localToken);
  },
[]
);

  function handleDelCase(idDel) {
    fetch(`https://sf-final-project-be.herokuapp.com/api/cases/${idDel}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localToken}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === "OK") {
          getAllCases(localToken);
        }
      });
  }

  function handleLinkClick(caseId) {
    const localtoken = localStorage.getItem("token");
    getOneCase(caseId, localtoken);
  }

  function showStatus(status) {
    if (status === "new") {
      return "новое";
    } else if (status === "in_progress") {
      return "в работе";
    } else if (status === "done") {
      return "закрыто";
    }
  }

  if (props.state.isLoadDone) {
    if (props.state.islogged) {
      return (
        <main className={css.main}>
          <h1 className={css.header}>Сообщения о кражах велосипедов</h1>
          <table className={css.table}>
            <thead className={css.tableHead}>
              <tr className={css.tableRow}>
                <th>Номер лицензии</th>
                <th>ФИО арендатора</th>
                <th>Цвет велосипеда</th>
                <th>Тип велосипеда</th>
                <th>Дополнительный комментарий</th>
                <th>Дата кражи</th>
                <th>Ответственный сотрудник</th>
                <th>Дата создания сообщения</th>
                <th>Дата последнего обновления сообщения</th>
                <th>Статус</th>
                <th>Завершающий комментарий</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {props.state.allCases.map((item) => {
                return (
                  <tr key={item._id} className={css.tableRow}>
                    <td className={css.tableDate}>{item.licenseNumber}</td>
                    <td className={css.tableDate}>{item.ownerFullName}</td>
                    <td className={css.tableDate}>{item.color}</td>
                    <td className={css.tableDate}>
                      {item.type === "general" ? "обычный" : "спорт"}
                    </td>
                    <td className={css.tableDate}>{item.description}</td>
                    <td className={css.tableDate}>
                      {item.date
                        ? new Date(item.date).toLocaleDateString()
                        : ""}
                    </td>
                    <td className={css.tableDate}>{item.officer}</td>
                    <td className={css.tableDate}>
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleString()
                        : ""}
                    </td>
                    <td className={css.tableDate}>
                      {item.updatedAt
                        ? new Date(item.updatedAt).toLocaleString()
                        : ""}
                    </td>
                    <td className={css.tableDate}>{showStatus(item.status)}</td>
                    <td className={css.tableDate}>{item.resolution}</td>
                    <td className={css.tableDate}>
                      <Link
                        className={css.link}
                        to={`/cases/${item._id}`}
                        onClick={() => handleLinkClick(item._id)}
                      >
                        Подробнее
                      </Link>
                      <button
                        className={css.button}
                        onClick={() => handleDelCase(item._id)}
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
        <section >
        {props.state.message}
      </section>
    );
  }
}
};

function mapStateToProps(state) {
  return {
    state: {
      allCases: state.allCases,
      isLoadDone: state.isLoadDone,
      islogged: state.islogged,
      message: state.message,
    },
  };
}

export default connect(mapStateToProps)(AllCases);
