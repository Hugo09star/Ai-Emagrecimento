
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 border-t border-slate-200">
      <div className="container mx-auto px-4 py-6 text-center text-slate-500">
        <p>&copy; {new Date().getFullYear()} Plano de Emagrecimento AI. Todos os direitos reservados.</p>
        <p className="text-sm mt-1">Gerado com a ajuda da tecnologia Gemini.</p>
      </div>
    </footer>
  );
};

export default Footer;
