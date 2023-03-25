const initialState = {
    isOpen: false,
    items: [],
  };
  
  const menuReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'OPEN_MENU':
        return {
          ...state,
          isOpen: true,
        };
      case 'CLOSE_MENU':
        return {
          ...state,
          isOpen: false,
        };
      case 'ADD_MENU_ITEM':
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      default:
        return state;
    }
  };
  
  export default menuReducer;