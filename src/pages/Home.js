import { useEffect, useState } from 'react';

import axios from 'axios';
import { useUserContext } from '../hooks/useUserContext';
import { BASE_URL } from '../constants';

const Home = () => {
  const { user, dispatch } = useUserContext();
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/api/users`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setLoading(false);
        setUsersList(response.data);
      } catch (error) {
        setLoading(false);
        setError(error.response.data.message);
      }
    };

    if (user.token) {
      fetchUsers();
    }
  }, [dispatch, user.token]);

  return (
    <div className="home">
      Hi {`${user.name.split(' ')[0]}`},
      <p>Home will be shown only after successful login/sign up</p>
      <p>Registered users below:</p>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        usersList.map((i) => (
          <li className={user._id === i._id ? 'active-user' : ''} key={i._id}>
            {i.name} | {i.email}
          </li>
        ))
      )}
    </div>
  );
};

export default Home;
