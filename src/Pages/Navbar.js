import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isNavActive, setIsNavActive] = useState(false);

  const toggleNav = () => {
    setIsNavActive(!isNavActive);
  };

  return (
    <nav className={`navbar${isNavActive ? ' active' : ''}`}>
      <button className="menu-icon" onClick={toggleNav}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/Home" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/Table" className="nav-link">Table</Link>
        </li>
        <li className="nav-item">
          <Link to="/Login" className="nav-link">Logout</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
