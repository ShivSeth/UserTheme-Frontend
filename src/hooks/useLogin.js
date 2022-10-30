import axios from 'axios';
import { useState } from 'react';
import { BASE_URL, LOGIN } from '../constants';
import { useUserContext } from './useUserContext';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useUserContext();

  const login = async ({ email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${BASE_URL}/api/users/login`, {
        email,
        password,
      });
      localStorage.setItem('user', JSON.stringify(response.data));
      dispatch({ type: LOGIN, payload: response.data });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error.response.data.error);
    }
  };
  return { login, loading, error };
};
