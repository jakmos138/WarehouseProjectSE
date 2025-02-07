import './SignIn.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = (props: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  async function submit(e: React.FormEvent, isSignUp: boolean = false) {
    e.preventDefault();
    try {
      const endpoint = isSignUp ? '/api/auth/signup' : '/api/auth/signin';
      const response = await axios.post(
        `http://localhost:3000${endpoint}`,
        { email: username, password },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      console.log(`${isSignUp ? 'Registration' : 'Login'} successful:`, response.data);

      props.setSignedIn(true);
      alert(`${isSignUp ? 'Registration' : 'Login'} Successful!`);
      navigate('/');

    } catch (err: any) {
      if (err.response) {
        setError(err.response.data.message || "Invalid username or password");
      } else {
        setError("An error occurred, please try again");
      }
      console.error(`${isSignUp ? 'Registration' : 'Login'} error:`, err.response?.data || err.message);
    }
  }

  return (
    <div className="signin-container">
      <h2>{error ? 'Error' : 'Sign In'}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={(e) => submit(e)}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
        <button
          className="register-btn"
          type="button"
          onClick={(e) => submit(e, true)}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default SignIn;
