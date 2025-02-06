import './SideBar.css'
import DashboardIcon from '../../assets/dashboard_icon.svg'
import OrdersIcon from '../../assets/orders_icon.svg'
import { Link } from 'react-router'

const SideBar = (props:any) => {


  return (
    <div className='sidebar'>
        <Link to='/orders'>
        <div className="orders">
            <img src={OrdersIcon} alt="" />
            <p>Orders</p>
        </div>
        </Link>
    </div>
  )
}

export default SideBar