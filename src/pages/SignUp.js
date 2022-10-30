import { useState } from 'react';
import { useSignUp } from '../hooks/useSignUp';

const SignUp = () => {
  const [value, setValue] = useState({
    email: '',
    password: '',
    name: '',
  });
  const { signup, error, loading } = useSignUp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup({ ...value });
  };

  const handleChange = (e) => {
    setValue((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <label htmlFor="name">Name:</label>
      <input
        type="text"
        name="name"
        id="name"
        required
        onChange={handleChange}
        value={value.name}
      />
      <label htmlFor="email">Email address:</label>
      <input
        type="email"
        name="email"
        id="email"
        required
        onChange={handleChange}
        value={value.email}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        required
        name="password"
        id="password"
        minLength={6}
        maxLength={10}
        onChange={handleChange}
        value={value.password}
      />

      <button disabled={loading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default SignUp;
