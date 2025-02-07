import './Account.css';
import userPic from '../../assets/user.png';
import axios from 'axios';

const Account = (props: any) => {
  const handleSignOut = async () => {
    try {
      const response = await axios.delete('/signout',
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
    );

      if (response.status === 204) {
        window.location.href = '/login'; 
      }
    } catch (error) {
      console.error('Sign-out failed:', error);
    }
  };

  return (
    <div className="account">
      <div className="account-info">
        <img src={userPic} alt="" />
        <h2>{props.username ? props.username : 'Username'}</h2>
      </div>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default Account;
