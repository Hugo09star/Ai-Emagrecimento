import React from 'react';

interface CalorieCounterCTAProps {
  onUpgradeClick: () => void;
}

const CalorieCounterCTA: React.FC<CalorieCounterCTAProps> = ({ onUpgradeClick }) => {
  return (
    <div className="mt-12 bg-white p-6 md:p-8 rounded-2xl shadow-lg border-2 border-dashed border-slate-200 text-center">
       <div className="bg-teal-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-teal-700 mb-3">
        Conte Calorias com uma Foto
      </h3>
      <p className="text-slate-600 mb-6 max-w-xl mx-auto">
        Quer saber as calorias da sua refeição? Com o plano Premium, basta tirar uma foto e a nossa IA faz a análise por si. Simples e rápido!
      </p>
      <button
        onClick={onUpgradeClick}
        className="inline-flex items-center justify-center rounded-lg border border-transparent bg-teal-600 px-8 py-3 text-base font-medium text-white hover:bg-teal-700 transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
      >
        Desbloquear com Premium
      </button>
    </div>
  );
};

export default CalorieCounterCTA;
