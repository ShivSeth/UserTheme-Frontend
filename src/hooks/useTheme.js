import axios from 'axios';
import { useState } from 'react';
import { BASE_URL, THEME_DARK, THEME_LIGHT, TOGGLE_THEME } from '../constants';
import { useUserContext } from './useUserContext';

export const useTheme = () => {
  const [theme, setTheme] = useState('light');
  const { user, dispatch } = useUserContext();

  const toggleTheme = async () => {
    let changedTheme =
      user?.theme === THEME_DARK || theme === THEME_DARK
        ? THEME_LIGHT
        : THEME_DARK;
    if (!user?.token) {
      dispatch({
        type: TOGGLE_THEME,
        payload: changedTheme,
      });
      setTheme(changedTheme);
      return;
    }
    try {
      const response = await axios.put(
        `${BASE_URL}/api/users/theme/${user._id}`,
        {
          theme: changedTheme,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      localStorage.setItem(
        'user',
        JSON.stringify({ ...response.data, token: user.token })
      );
      dispatch({
        type: TOGGLE_THEME,
        payload: changedTheme,
      });
      setTheme(changedTheme);
    } catch (error) {
      console.log(error);
    }
  };
  return { theme, toggleTheme };
};
