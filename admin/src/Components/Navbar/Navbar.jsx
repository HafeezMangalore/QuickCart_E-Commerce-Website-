import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/admin_logo.png'
import navProfile from '../../assets/admin.svg'

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={navlogo} className="nav-logo" />
      <img src={navProfile} className='nav-profile' />
    </div>
  )
}

export default Navbar
