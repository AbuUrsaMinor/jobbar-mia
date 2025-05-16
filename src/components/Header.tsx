import React from 'react';
import logo from '../assets/logo.svg';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4 flex items-center">
      <img src={logo} alt="Logo" className="h-8 mr-2" />
      <h1 className="text-xl font-bold">Jobbar Mia</h1>
    </header>
  );
};

export default Header;