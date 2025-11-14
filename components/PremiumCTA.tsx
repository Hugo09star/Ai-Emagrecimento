import React from 'react';

interface PremiumCTAProps {
  onUpgradeClick: () => void;
}

const PremiumCTA: React.FC<PremiumCTAProps> = ({ onUpgradeClick }) => {
  return (
    <div className="mt-12 bg-gradient-to-r from-teal-50 to-cyan-50 p-6 md:p-8 rounded-2xl shadow-lg border border-teal-200 text-center">
      <h3 className="text-2xl font-bold text-teal-700 mb-3">
        <span role="img" aria-label="lock" className="mr-2">🔒</span>
        Guarde o seu Histórico de Planos
      </h3>
      <p className="text-slate-600 mb-6 max-w-xl mx-auto">
        Atualize para o nosso plano Premium para guardar todos os seus planos gerados, acompanhar o seu progresso e revisitar as suas estratégias a qualquer momento.
      </p>
      <button
        onClick={onUpgradeClick}
        className="inline-flex items-center justify-center rounded-lg border border-transparent bg-teal-600 px-8 py-3 text-base font-medium text-white hover:bg-teal-700 transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
      >
        Atualize para Premium
      </button>
    </div>
  );
};

export default PremiumCTA;
