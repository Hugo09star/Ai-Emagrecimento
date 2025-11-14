import React, { useState } from 'react';
import type { PlanoSemanal, PlanoDia } from '../types';

interface PlanDisplayProps {
  plan: PlanoSemanal;
}

// FIX: Add 'as const' to correctly type DIAS_SEMANA as a readonly tuple of string literals.
const DIAS_SEMANA = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'] as const;
const TABS = [...DIAS_SEMANA, 'lista_compras'];

const TAB_LABELS: { [key: string]: string } = {
    segunda: 'Segunda-feira',
    terca: 'Terça-feira',
    quarta: 'Quarta-feira',
    quinta: 'Quinta-feira',
    sexta: 'Sexta-feira',
    sabado: 'Sábado',
    domingo: 'Domingo',
    lista_compras: '🛒 Lista de Compras'
};

const DayPlanCard: React.FC<{ dia: PlanoDia }> = ({ dia }) => {
    return (
        <div className="space-y-6">
            <div>
                <h4 className="text-xl font-semibold text-teal-700 mb-3 border-b-2 border-teal-200 pb-2">Plano de Refeições</h4>
                <div className="space-y-3 text-slate-600">
                    <p><strong>Pequeno-almoço:</strong> {dia.refeicoes.pequeno_almoco.descricao} <em>({dia.refeicoes.pequeno_almoco.calorias} kcal)</em></p>
                    <p><strong>Almoço:</strong> {dia.refeicoes.almoco.descricao} <em>({dia.refeicoes.almoco.calorias} kcal)</em></p>
                    <p><strong>Lanche:</strong> {dia.refeicoes.lanche.descricao} <em>({dia.refeicoes.lanche.calorias} kcal)</em></p>
                    <p><strong>Jantar:</strong> {dia.refeicoes.jantar.descricao} <em>({dia.refeicoes.jantar.calorias} kcal)</em></p>
                </div>
                 <p className="mt-4 text-right font-bold text-teal-800">Total Diário: {dia.total_calorias} kcal</p>
            </div>
            <div>
                <h4 className="text-xl font-semibold text-teal-700 mb-3 border-b-2 border-teal-200 pb-2">Plano de Treino</h4>
                <div className="space-y-2 text-slate-600">
                    <p><strong>Exercício:</strong> {dia.treino.descricao}</p>
                    <p><strong>Duração:</strong> {dia.treino.duracao} minutos</p>
                </div>
            </div>
        </div>
    );
};

const ShoppingListCard: React.FC<{ items: string[] }> = ({ items }) => {
    return (
        <div>
            <h4 className="text-xl font-semibold text-teal-700 mb-3 border-b-2 border-teal-200 pb-2">Itens para a sua semana</h4>
            <ul className="space-y-3 mt-4 columns-1 md:columns-2 lg:columns-3 gap-x-8">
                {items.map((item, index) => (
                    <li key={index} className="flex items-center break-inside-avoid">
                        <label htmlFor={`item-${index}`} className="flex items-center cursor-pointer">
                            <input
                                id={`item-${index}`}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                            />
                            <span className="ml-3 block text-sm text-slate-700">{item}</span>
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};


const PlanDisplay: React.FC<PlanDisplayProps> = ({ plan }) => {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200">
      <h2 className="text-3xl font-bold text-center text-teal-600 mb-6">O Seu Plano Semanal Personalizado</h2>
      <div className="flex flex-wrap justify-center border-b border-slate-200 mb-6 -mx-2">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-2 mx-1 mb-2 text-sm md:text-base font-medium rounded-t-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
              activeTab === tab
                ? 'border-b-2 border-teal-500 text-teal-600'
                : 'text-slate-500 hover:text-teal-600'
            }`}
          >
            {TAB_LABELS[tab]}
          </button>
        ))}
      </div>
      <div>
        {DIAS_SEMANA.map(dia => (
          <div key={dia} className={activeTab === dia ? 'block' : 'hidden'}>
            {/* FIX: Removed unsafe type cast. `dia` is now correctly typed from the `as const` array, so `plan[dia]` is correctly inferred as `PlanoDia`. */}
            <DayPlanCard dia={plan[dia]} />
          </div>
        ))}
        <div className={activeTab === 'lista_compras' ? 'block' : 'hidden'}>
             {plan.lista_compras && plan.lista_compras.length > 0 ? (
                <ShoppingListCard items={plan.lista_compras} />
            ) : (
                <p className="text-center text-slate-500">Não foi possível gerar a lista de compras.</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default PlanDisplay;