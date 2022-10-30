import { LOGOUT, TOGGLE_THEME } from '../constants';
import { useUserContext } from './useUserContext';

export const useLogout = () => {
  const { user, dispatch } = useUserContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user');

    // dispatch logout action
    dispatch({ type: LOGOUT });
    dispatch({
      type: TOGGLE_THEME,
      payload: user?.theme,
    });
  };

  return { logout };
};
