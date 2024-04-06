import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'

const Navbar = ({ setShowLogin }) => {

  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount } = useContext(StoreContext);

  return (
    <div className='navbar'>
      <Link to='/'><img className='logo' src={assets.logo} alt="" /></Link>
      <div className="title">
        MenuScanOrder
      </div>
      <div className="navbar-right">
        <Link to='/cart' className='navbar-search-icon'>
          <img src={assets.basket_icon} alt="" />
          <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
        </Link>
        <button>sign in</button>
      </div>
    </div>
  )
}

export default Navbar
