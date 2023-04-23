import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {Routes, Route} from 'react-router-dom';
import Header from './components/Header/Header';
import { Main } from './components/Main/Main';
import CreateCase from './components/Main/CreateCase/CreateCase';
import AllCases from './components/Main/AllCases/AllCases';
import CaseDetails from './components/Main/AllCases/CaseDetails/CaseDetails';
import AllOfficers from './components/Main/AllOfficers/AllOfficers';
import OfficerDetails from './components/Main/AllOfficers/OfficerDetails/OfficerDetails';
import { Footer } from './components/Footer/Footer';
import SignIn from './components/Header/SignIn/SignIn';
import SignUp from './components/Header/SignUp/SignUp';
import { store } from './store/store';
import { logIn, logOut } from './store/actions';


export const App = (props) => {
useEffect(() => {
  let localToken = localStorage.getItem("token");
  if (localToken) {
    fetch(`https://sf-final-project-be.herokuapp.com/api/auth/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localToken}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "OK") {
          store.dispatch(logIn());
          console.log("токен действителен")
        } else {
          store.dispatch(logOut());
        }
      });
  } else {
    store.dispatch(logOut());
  }
}, [])

  return (
    <div>
      <Header />
      <Routes>
      <Route path="" element={<Main islogged={props.state.islogged} />}></Route>
      <Route path="/createcase" element={<CreateCase />}></Route>
      <Route path="/cases" element={<AllCases />}></Route>
        <Route path="/cases/:id" element={<CaseDetails />}></Route>
      <Route path="/officers" element={<AllOfficers />}></Route>
        <Route path="/officers/:id" element={<OfficerDetails />}></Route>
      <Route path="/sign_in" element={<SignIn />}></Route>
      <Route path="/sign_up" element={<SignUp />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    state: state,
  };
}

export default connect(mapStateToProps )(App);
