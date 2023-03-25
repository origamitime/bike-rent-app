import {useDispatch, useSelector} from 'react-redux';
import {toggleMenu} from '../../../store/actions';

export const Login = () => {
  const isMenuShown = useSelector(state => state.isMenuShown);
  const dispatch = useDispatch();

  const handleMenuToggle = () => {
    dispatch(toggleMenu());
  };

  return (
    <div>
      <span>Войти</span>
      <button onClick={handleMenuToggle}>Меню</button>
      {isMenuShown && (
        <ul>
          <li>Войти</li>
          <li>Зарегистрироваться</li>
        </ul>
      )}
    </div>
  );
};