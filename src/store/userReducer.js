const initialState = {
    name: '',
    avatar: '',
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER_NAME':
        return {
          ...state,
          name: action.payload,
        };
      case 'SET_USER_AVATAR':
        return {
          ...state,
          avatar: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;