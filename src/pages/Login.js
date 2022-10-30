import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

const Login = () => {
  const [value, setValue] = useState({
    email: '',
    password: '',
  });

  const { login, error, loading } = useLogin();

  const handleChange = (e) => {
    setValue((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(value);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>

      <label htmlFor="email">Email address:</label>
      <input
        id="email"
        type="email"
        name="email"
        required
        onChange={handleChange}
        value={value.email}
      />
      <label htmlFor="password">Password:</label>
      <input
        id="password"
        type="password"
        name="password"
        minLength={6}
        maxLength={10}
        onChange={handleChange}
        value={value.password}
      />

      <button disabled={loading}>Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
