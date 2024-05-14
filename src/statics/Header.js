// Header.js

import React from 'react';
import './Header.css';

const Header = () => {
  const handleNavigation = (event, path) => {
    event.preventDefault();
    window.location.href = path;
  };

  return (
    <header className="header-container">
      <nav className="nav-container">
        <h1 className="nav-brand">VisionVow</h1>
        <ul className="nav-links">
          <li><a href="/" onClick={(e) => handleNavigation(e, '/')}>Home</a></li>
          <li><a href="/aboutus" onClick={(e) => handleNavigation(e, '/aboutus')}>About</a></li>
          <li><a href="/dashboard" onClick={(e) => handleNavigation(e, '/dashboard')}>Dashboard</a></li>
          <li><a href="/contactus" onClick={(e) => handleNavigation(e, '/contactus')}>Contact Us</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
