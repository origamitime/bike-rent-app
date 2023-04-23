import { saveApprovedOfficers, loadDone, saveAllCases, saveMessage, saveOneCase, saveAllOfficer, saveOneOfficer } from "../store/actions";
import { store } from "../store/store";

export function getApprovedOfficers(token){
    fetch(`https://sf-final-project-be.herokuapp.com/api/officers/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        let allReceivedofficers = [...result.officers].filter(
          (item) => item.approved
        );
        store.dispatch(saveApprovedOfficers(allReceivedofficers));
      });
  }

export function getAllCases(token){
  store.dispatch(loadDone(false));
  fetch("https://sf-final-project-be.herokuapp.com/api/cases/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          store.dispatch(loadDone(true));
        }
        if (result.status === "OK") {
          store.dispatch(saveAllCases(result.data));
        } else {
          store.dispatch(saveMessage(result.message));
        }
      });
}

export function getOneCase(id, token){
  store.dispatch(loadDone(false));

  fetch(`https://sf-final-project-be.herokuapp.com/api/cases/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      store.dispatch(loadDone(true));
      store.dispatch(saveOneCase(result.data));
    });
}

export function getAllOfficer(token){
  store.dispatch(loadDone(false));
  fetch("https://sf-final-project-be.herokuapp.com/api/officers/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          store.dispatch(loadDone(true));
          store.dispatch(saveAllOfficer(result.officers));
        }
        if (result.status !== "OK") {
          store.dispatch(saveMessage(result.message));
        }
      });
}

export function getOneOfficer(id, token) {
  store.dispatch(loadDone(false));
  fetch(`https://sf-final-project-be.herokuapp.com/api/officers/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      store.dispatch(loadDone(true));
      store.dispatch(saveOneOfficer(result.data));
    });
}