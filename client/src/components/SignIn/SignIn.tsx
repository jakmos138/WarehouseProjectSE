import './SignIn.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = (props: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  async function submit(e: React.FormEvent, isSignUp: boolean = false) {
    e.preventDefault();
    try {
      const endpoint = isSignUp ? '/api/auth/signup' : '/api/auth/signin';
      const response = await axios.post(
        `http://localhost:3000${endpoint}`,
        {email, password },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log(`${isSignUp ? 'Registration' : 'Login'} successful:`, response.data);
      alert(`${isSignUp ? 'Registration' : 'Login'} Successful!`);
      navigate('/');
      props.setSignedIn(true);
    } catch (err: any) {
      
      if (err.response) {
        setError(err.response.data.message || "Invalid email or password");
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
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
