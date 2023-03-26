import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from '../../../store/actions';

export const Login = () => {
  const isMenuShown = useSelector(state => state.isMenuShown);
  const dispatch = useDispatch();

  const handleMenuToggle = () => {
    dispatch(toggleMenu());
  };

  return (
      <div onClick={handleMenuToggle}>Меню
      {isMenuShown && (
        <ul>
          <button>Войти</button>
          <button>Зарегистрироваться</button>
        </ul>
      )}
      </div>
  );
};