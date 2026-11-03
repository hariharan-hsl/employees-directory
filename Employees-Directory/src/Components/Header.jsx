
import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">

        <div className="company-brand">
          <div className="company-logo">H</div>

          <div className="company-info">
            <h3>Employee Directory</h3>
            <p>HEPL Technologies</p>
          </div>
        </div>

        <div className="logo">HS</div>
      </div>
    </header>
  );
};

export default Header;