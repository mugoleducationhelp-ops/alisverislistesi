import React from 'react';

const ListIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-9 sm:w-9 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
);

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-center space-x-3">
      <ListIcon />
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 tracking-tight">
        Alışveriş Listem 🛒
      </h1>
    </header>
  );
};

export default Header;