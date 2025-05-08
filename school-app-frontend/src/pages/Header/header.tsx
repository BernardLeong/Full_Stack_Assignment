import React, { useEffect, useState } from 'react';
import './header.css';
import mortarboardIcon from '../../assets/Mortarboard.png';

type HeaderProps = {
    setActiveTab: React.Dispatch<React.SetStateAction<string>>,
    activeTab: string
};

const Header = ({setActiveTab, activeTab}: HeaderProps) => {
  useEffect(() => {
    // Future side effects
  }, []); 

  return (
    <div className="container-header">
      <div className="header-left">
        <img src={mortarboardIcon} className="logo" alt="School Portal Logo" />
        <span className="portal-name">School Portal</span>
      </div>
      <div className="header-center">
      <a 
          href="#"
          className={`tab ${activeTab === 'Classes' ? 'active' : ''}`}
          onClick={() => setActiveTab('Classes')}
        >
            Classes
        </a>
        <a 
          href="#"
          className={`tab ${activeTab === 'Teachers' ? 'active' : ''}`}
          onClick={() => setActiveTab('Teachers')}
        >
            Teachers
        </a>
      </div>
      <div className="header-right">
        {/* Empty space */}
      </div>
    </div>
  );
};

export default Header;
