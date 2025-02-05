import './Account.css'
import userPic from '../../assets/user.png'

const Account = (props: any) => {
  return (
    <div className="account">
        <div className="account-info">
            <img src={userPic} alt="" />
             <h2>{props.username ? props.username : 'Username'}</h2>
        </div>
        <button>Sign Out</button>
    </div>
  )
}

export default Account