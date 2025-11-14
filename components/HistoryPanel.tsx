import React from 'react';
import type { PlanoComHistorico } from '../types';

interface HistoryPanelProps {
    history: PlanoComHistorico[];
    onSelect: (id: string) => void;
    onDelete: (id: string) => void;
    activePlanId?: string;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onSelect, onDelete, activePlanId }) => {
    return (
        <div className="mt-12 bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200">
            <h3 className="text-2xl font-bold text-center text-teal-600 mb-6">Histórico de Planos</h3>
            {history.length === 0 ? (
                <p className="text-center text-slate-500">Ainda não gerou nenhum plano.</p>
            ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                    {history.map((plan) => (
                        <div 
                            key={plan.id} 
                            className={`p-4 rounded-lg border flex flex-col md:flex-row items-start md:items-center justify-between transition-all duration-200 ${
                                activePlanId === plan.id ? 'bg-teal-50 border-teal-400 shadow' : 'bg-slate-50 border-slate-200'
                            }`}
                        >
                            <div className="mb-3 md:mb-0">
                                <p className="font-semibold text-slate-800">Criado em: {plan.createdAt}</p>
                                <p className="text-sm text-slate-600 truncate max-w-sm">
                                    <strong>Objetivo:</strong> {plan.userData.goal}
                                </p>
                            </div>
                            <div className="flex-shrink-0 flex gap-2">
                                <button 
                                    onClick={() => onSelect(plan.id)}
                                    className="px-4 py-1.5 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
                                    aria-label={`Ver plano de ${plan.createdAt}`}
                                >
                                    Ver
                                </button>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation(); // Evita que o onSelect seja chamado
                                        onDelete(plan.id);
                                    }}
                                    className="px-4 py-1.5 text-sm font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                                    aria-label={`Apagar plano de ${plan.createdAt}`}
                                >
                                    Apagar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HistoryPanel;
