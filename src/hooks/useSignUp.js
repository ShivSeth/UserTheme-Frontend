import axios from 'axios';
import { useState } from 'react';
import { BASE_URL, THEME_LIGHT } from '../constants';
import { useUserContext } from './useUserContext';

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, dispatch } = useUserContext();

  const signup = async ({ name, email, password, theme }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(`${BASE_URL}/api/users/signup`, {
        name,
        email,
        password,
        theme: user?.theme ? user?.theme : THEME_LIGHT,
      });
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(response.data));
      // update the user auth context
      dispatch({ type: 'LOGIN', payload: response.data });
      // update loading state
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.error);
    }
  };
  return { error, loading, signup };
};
