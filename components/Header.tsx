
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Plano de Emagrecimento AI</h1>
        <p className="mt-2 text-lg opacity-90">O seu assistente pessoal para uma vida mais saudável</p>
      </div>
    </header>
  );
};

export default Header;
