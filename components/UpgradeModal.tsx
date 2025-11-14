import React from 'react';

interface UpgradeModalProps {
  onClose: () => void;
  onUpgrade: () => void;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ onClose, onUpgrade }) => {
  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
        aria-modal="true"
        role="dialog"
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full m-4 transform transition-all duration-300 ease-out scale-95 animate-modal-enter">
        <div className="p-6 md:p-8 text-center relative">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Fechar modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          
          <div className="bg-teal-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto -mt-16 border-4 border-white shadow-lg">
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-12v4m-2-2h4m5 12v4m-2-2h4M17 3l-4 4M5 21l4-4M17 21l-4-4M5 3l4 4"></path></svg>
          </div>

          <h2 className="text-2xl font-bold text-slate-800 mt-6 mb-2">Plano Premium</h2>
          <p className="text-slate-600 mb-6">Desbloqueie todo o potencial da sua jornada de emagrecimento.</p>

          <ul className="text-left space-y-3 text-slate-700 mb-8">
            <li className="flex items-start">
              <span className="text-teal-500 mr-3 mt-1">✔️</span>
              <span><strong>Histórico Ilimitado:</strong> Guarde todos os seus planos e nunca perca o seu progresso.</span>
            </li>
            <li className="flex items-start">
              <span className="text-teal-500 mr-3 mt-1">✔️</span>
              <span><strong>Análise de Progresso:</strong> Compare planos e ajuste a sua estratégia (em breve).</span>
            </li>
             <li className="flex items-start">
              <span className="text-teal-500 mr-3 mt-1">✔️</span>
              <span><strong>Suporte Prioritário:</strong> Acesso prioritário à nossa equipa de suporte (em breve).</span>
            </li>
          </ul>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <p className="text-lg font-semibold text-slate-700">Apenas</p>
            <p className="text-4xl font-bold text-teal-600">5,99 €<span className="text-lg font-medium text-slate-500">/mês</span></p>
          </div>

          <button
            onClick={onUpgrade}
            className="w-full mt-8 inline-flex items-center justify-center rounded-lg border border-transparent bg-teal-600 px-8 py-3 text-base font-medium text-white hover:bg-teal-700 transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            Subscrever Agora
          </button>
           <button
            onClick={onClose}
            className="w-full mt-3 text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors"
          >
            Talvez mais tarde
          </button>
        </div>
      </div>
      <style>{`
        @keyframes modal-enter {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-modal-enter {
          animation: modal-enter 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default UpgradeModal;
