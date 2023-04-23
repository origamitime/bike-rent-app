import React from 'react';
import { connect } from 'react-redux';
import { getApprovedOfficers } from '../../../utils/requests';
import { store } from '../../../store/store';
import { createNewCase } from '../../../store/actions';
import css from './CreateCase.module.scss'
  
const localtoken = localStorage.getItem("token");

const officerRequest = "https://sf-final-project-be.herokuapp.com/api/cases/";
const publicRequest = "https://sf-final-project-be.herokuapp.com/api/public/report";

class CreateCase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSent: false,
      URL: this.props.state.islogged ? officerRequest : publicRequest,
      errMsg: "",
    };
  }

  componentDidMount() {
    if (this.props.state.islogged) {
      getApprovedOfficers(localtoken);
    }
  }

  componentDidUpdate() {
    if (this.props.state.approvedOfficers.length) {
      return;
    }
    if (this.props.state.islogged) {
      getApprovedOfficers(localtoken);
    }
  }

  handleClick = (e) => {
    e.preventDefault();
    const { islogged, newCase } = this.props.state;
    let response;

    if (!newCase.licenseNumber || !newCase.type || !newCase.name) {
      this.setState({ errMsg: "заполните обязательные поля" });
    } else {
      const dataOfficer = {
        licenseNumber: newCase.licenseNumber,
        ownerFullName: newCase.name,
        color: newCase.color ? newCase.color : null,
        date: newCase.date ? newCase.date : null,
        description: newCase.description ? newCase.description : null,
        type: newCase.type,
        officer: newCase.officer ? newCase.officer : null,
      };

      const dataPublic = {
        ...dataOfficer,
        clientId: this.props.state.clientId,
      };

      const headersPublic = {
        "Content-Type": "application/json",
      };

      const headersOfficer = {
        ...headersPublic,
        Authorization: `Bearer ${localtoken}`,
      };

      const emptyCase = {
        licenseNumber: null,
        ownerFullName: null,
        color: null,
        date: null,
        description: null,
        type: null,
        officer: null,
      };

      fetch(islogged ? officerRequest : publicRequest, {
        method: "POST",
        headers: islogged ? headersOfficer : headersPublic,
        body: JSON.stringify(islogged ? dataOfficer : dataPublic),
      })
        .then((res) => res.json())
        .then((result) => {
          response = result;
          if (response.status === "OK") {
            this.setState({ isSent: true });
            store.dispatch(createNewCase(emptyCase));
          } else {
            this.setState({ errMsg: response.message });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  handleChange = (e, inputId) => {
    this.setState({ errMsg: "" });

    let newCaseInfo = this.props.state.newCase;
    newCaseInfo[inputId] = e.target.value;
    store.dispatch(createNewCase(newCaseInfo));
  };

  render() {
    const { isSent } = this.state;
    const { islogged, approvedOfficers } = this.props.state;

    const msg = (
      <div className={css.msg}>
        Cообщение отправлено.
      </div>
    );

    const hideOfficer = (
      <>
        <label
          className={css.label}
          htmlFor="description"
        >
          Ответственный сотрудник:
        </label>
        {approvedOfficers ? (
          <select
            className={css.select}
            onChange={(e) => this.handleChange(e, "officer")}
          >
            <option value="">Выберите сотрудника</option>
            {approvedOfficers.map((item) => {
              return (
                <option value={item._id} key={item._id}>
                  {item._id}
                </option>
              );
            })}
          </select>
        ) : (
          "Список сотрудников пуст"
        )}
      </>
    );

    const form = (
      <form className={css.form}>
        <label
          className={css.label} htmlFor="licenseNumber">
          Номер лицензии
        </label>
        <input
          className={css.input}
          id="licenseNumber"
          onChange={(e) => this.handleChange(e, "licenseNumber")}
          placeholder="Введите номер лицензии"
          type="text"
          required
        />

        <label className={css.label}>Тип велосипеда</label>
        <select
          className={css.select}
          onChange={(e) => this.handleChange(e, "type")}
          required
        >
          <option value="">Выберите тип велосипеда</option>
          <option value="general">Обычный</option>
          <option value="sport">Спортивный</option>
        </select>

        <label className={css.label} htmlFor="ownerFullName">
          ФИО пользователя (арендатора велосипеда)*
        </label>
        <input
          className={css.input}
          id="ownerFullName"
          placeholder="Введите ФИО"
          onChange={(e) => this.handleChange(e, "name")}
          type="text"
          required
        />

        <label className={css.label} htmlFor="color">
          Цвет велосипеда
        </label>
        <input
          className={css.input}
          id="color"
          placeholder="Введите цвет"
          onChange={(e) => this.handleChange(e, "color")}
        />

        <label className={css.label} htmlFor="date">
          Дата кражи
        </label>
        <input
          className={css.input}
          id="date"
          type="date"
          onChange={(e) => this.handleChange(e, "date")}
        />

        <label className={css.label} htmlFor="description">
          Дополнительный комментарий
        </label>
        <input
          className={css.input}
          id="description"
          placeholder="Введите комментарий"
          onChange={(e) => this.handleChange(e, "description")}
        />

        {islogged ? hideOfficer : ""}

        <button
          className={css.button}
          type="submit"
          onClick={(e) => this.handleClick(e)}
        >
          Отправить
        </button>
        <span className={css.errorMsg}>{this.state.errMsg}</span>
      </form>
    );

    const content = isSent ? msg : form;

    return (
      <main className={css.main}>
        <h1 className={css.header}>Сообщение о краже</h1>
        <div >
          <div>{content}</div>
          <div>
            <div
              className={`createCase-rigth-send ${isSent ? "show" : ""}`}
            ></div>
          </div>
        </div>
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: {
      newCase: state.newCase,
      approvedOfficers: state.approvedOfficers,
      islogged: state.islogged,
      clientId: state.clientId,
    },
  };
}

export default connect(mapStateToProps)(CreateCase);