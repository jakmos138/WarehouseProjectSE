import './SideBar.css'
import DashboardIcon from '../../assets/dashboard_icon.svg'
import OrdersIcon from '../../assets/orders_icon.svg'
import LocationsIcon from '../../assets/map.png'
import TypesIcon from '../../assets/list.png'
import { Link } from 'react-router'
import { useState } from 'react'

const SideBar = (props: any) => {
  const [activeLink, setActiveLink] = useState<string>(''); // Track active button

  const handleLinkClick = (link: string) => {
    setActiveLink(link); // Set active link when clicked
  }

  return (
    <div className='sidebar'>
      <Link to='/orders' onClick={() => handleLinkClick('orders')}>
        <div className={`sidebar-item ${activeLink === 'orders' ? 'active' : ''}`}>
          <img src={OrdersIcon} alt="Orders" />
          <p>Items</p>
        </div>
      </Link>
      <Link to='/types' onClick={() => handleLinkClick('types')}>
        <div className={`sidebar-item ${activeLink === 'types' ? 'active' : ''}`}>
          <img src={TypesIcon} alt="Types" />
          <p>Types</p>
        </div>
      </Link>
      <Link to='/locations' onClick={() => handleLinkClick('locations')}>
        <div className={`sidebar-item ${activeLink === 'locations' ? 'active' : ''}`}>
          <img src={LocationsIcon} alt="Locations" />
          <p>Locations</p>
        </div>
      </Link>
    </div>
  );
}

export default SideBar;
