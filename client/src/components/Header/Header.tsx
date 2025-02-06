import './Header.css'
import UserPic from '../../assets/user.png'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <header>
        <div className='header-container'>
            <div className='header-icon'>
                <p>Warehouse Management System</p>
            </div>
            <div className='header-profile'>
                <Link to="/account">
                <button>
                    <img src={UserPic} alt="User Picture" />
                    <p>Account</p>
                </button>
                </Link>
            </div>
        </div>
        
    </header>
  )
}

export default Header