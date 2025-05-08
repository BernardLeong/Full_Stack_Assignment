import React, { useState, useEffect } from 'react';
import Header from './../Header/header.tsx';
import './main.css';
import CardBody from '../CardBody/cardbody.tsx';

// type HelloWorldProps = {
//   name: string;
// };

const MainPage = () => {
  const [activeTab, setActiveTab] = useState('Teachers'); // Default active tab

  return (
    <div className="container">
      <div className="item">
        <Header activeTab={activeTab} setActiveTab={setActiveTab}/>
      </div>
      <div className="item">
        <CardBody activeTab={activeTab} setActiveTab={setActiveTab}/>
      </div>
      <div className="item"></div>
    </div>
  
  );
};

export default MainPage;