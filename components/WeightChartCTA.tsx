import React from 'react';

interface WeightChartCTAProps {
  onUpgradeClick: () => void;
}

const WeightChartCTA: React.FC<WeightChartCTAProps> = ({ onUpgradeClick }) => {
  return (
    <div className="mt-12 bg-white p-6 md:p-8 rounded-2xl shadow-lg border-2 border-dashed border-slate-200 text-center">
       <div className="bg-teal-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-teal-700 mb-3">
        Visualize a sua Evolução
      </h3>
      <p className="text-slate-600 mb-6 max-w-xl mx-auto">
        Com o plano Premium, pode acompanhar a sua evolução de peso num gráfico simples. Veja o seu progresso e mantenha-se motivado!
      </p>
      <button
        onClick={onUpgradeClick}
        className="inline-flex items-center justify-center rounded-lg border border-transparent bg-teal-600 px-8 py-3 text-base font-medium text-white hover:bg-teal-700 transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
      >
        Desbloquear Gráfico de Progresso
      </button>
    </div>
  );
};

export default WeightChartCTA;