import React, { useContext, useEffect } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext); // Ensure token and setToken are provided from context
  const navigate = useNavigate();

  // Load token from local storage and update context
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, [setToken]);

  // Handle login success
  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse?.credential);
    console.log(decoded);
    localStorage.setItem('token', decoded);
    localStorage.setItem('name', decoded.name);
    localStorage.setItem('email', decoded.email);
    setToken(credentialResponse);
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    setToken("");
    navigate('/');
  };

  return (
    <div className='navbar'>
      <Link to='/'><img className='logo' src={assets.logo} alt="Logo" /></Link>
      <div className="title">
        MenuScanOrder
      </div>
      <div className="navbar-right">
        <Link to='/cart' className='navbar-search-icon'>
          <img src={assets.basket_icon} alt="Basket icon" />
          <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
        </Link>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onFailure={() => console.log('Login Failed')}
        />
      </div>
    </div>
  );
}

export default Navbar;