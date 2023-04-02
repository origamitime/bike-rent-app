import {Routes, Route} from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Footer } from './components/Footer/Footer';
import { SignIn } from './components/Header/SignIn/SignIn';
import { SignUp } from './components/Header/SignUp/SignUp';


export const App = (props) => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/sign_in" element={<SignIn />}></Route>
        <Route path="/sign_up" element={<SignUp />}></Route>
      </Routes>
        <Main />
      <Footer />
    </div>
  );
}

export default App;
