//import {Routes, Route} from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Footer } from './components/Footer/Footer';


export const App = () => {
  return (
    <div>
      <Header />
        <Main />
      <Footer />
    </div>
  );
}

export default App;
