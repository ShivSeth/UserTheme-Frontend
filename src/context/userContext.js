import { createContext, useEffect, useReducer } from 'react';
import { LOGIN, LOGOUT, TOGGLE_THEME } from '../constants';

const initialState = {
  user: null,
  dispatch: () => {},
};

export const UserContext = createContext(initialState);

export const userReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
      };
    case TOGGLE_THEME:
      return {
        ...state,
        user: {
          ...state.user,
          theme: action.payload,
        },
      };
    default:
      return state;
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    user && dispatch({ type: LOGIN, payload: user });
  }, [dispatch]);

  // console.log('AuthContext state:', state);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
