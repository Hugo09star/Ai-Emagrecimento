import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import UserInputForm from './components/UserInputForm';
import PlanDisplay from './components/PlanDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import Footer from './components/Footer';
import HistoryPanel from './components/HistoryPanel';
import FeedbackForm from './components/FeedbackForm';
import PremiumCTA from './components/PremiumCTA';
import UpgradeModal from './components/UpgradeModal';
import CalorieCounter from './components/CalorieCounter';
import CalorieCounterCTA from './components/CalorieCounterCTA';
import WeightChart from './components/WeightChart';
import WeightChartCTA from './components/WeightChartCTA';
import { generatePlan } from './services/geminiService';
import type { UserData, PlanoComHistorico } from './types';

const App: React.FC = () => {
  const [currentPlan, setCurrentPlan] = useState<PlanoComHistorico | null>(null);
  const [planHistory, setPlanHistory] = useState<PlanoComHistorico[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem('planHistory');
      if (storedHistory) {
        setPlanHistory(JSON.parse(storedHistory));
      }
      const storedPremiumStatus = localStorage.getItem('isPremium');
      if (storedPremiumStatus) {
        setIsPremium(JSON.parse(storedPremiumStatus));
      }
    } catch (e) {
      console.error("Failed to parse from localStorage", e);
      setPlanHistory([]);
      setIsPremium(false);
    }
  }, []);

  const handleGeneratePlan = async (data: UserData) => {
    setIsLoading(true);
    setError(null);
    setCurrentPlan(null);

    try {
      const generatedPlan = await generatePlan(data);
      if (generatedPlan) {
        const newPlanWithHistory: PlanoComHistorico = {
          ...generatedPlan,
          id: new Date().toISOString(),
          createdAt: new Date().toLocaleString('pt-PT'),
          userData: data,
          feedbackSubmitted: false,
        };

        if (isPremium) {
          const updatedHistory = [newPlanWithHistory, ...planHistory];
          setPlanHistory(updatedHistory);
          localStorage.setItem('planHistory', JSON.stringify(updatedHistory));
        }
        
        setCurrentPlan(newPlanWithHistory);

      } else {
        setError('Não foi possível gerar o plano. Por favor, tente novamente.');
      }
    } catch (e) {
      console.error(e);
      setError('Ocorreu um erro ao comunicar com a IA. Verifique a sua chave de API e tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSelectPlan = (planId: string) => {
    const selectedPlan = planHistory.find(p => p.id === planId);
    if(selectedPlan) {
      setCurrentPlan(selectedPlan);
    }
  };

  const handleDeletePlan = (planId: string) => {
    if (window.confirm('Tem a certeza de que deseja apagar este plano do seu histórico?')) {
      const updatedHistory = planHistory.filter(p => p.id !== planId);
      setPlanHistory(updatedHistory);
      localStorage.setItem('planHistory', JSON.stringify(updatedHistory));
      if(currentPlan?.id === planId) {
        setCurrentPlan(null);
      }
    }
  };

  const handleFeedbackSubmit = (feedback: { rating: 'like' | 'dislike'; comment: string }) => {
    if (!currentPlan) return;

    console.log('Feedback recebido para o plano:', currentPlan.id, feedback);

    const updatedCurrentPlan = { ...currentPlan, feedbackSubmitted: true };
    setCurrentPlan(updatedCurrentPlan);

    if (isPremium) {
      const updatedHistory = planHistory.map(p =>
        p.id === currentPlan.id ? { ...p, feedbackSubmitted: true } : p
      );
      setPlanHistory(updatedHistory);
      localStorage.setItem('planHistory', JSON.stringify(updatedHistory));
    }
  };

  const handleUpgrade = () => {
    setIsPremium(true);
    localStorage.setItem('isPremium', JSON.stringify(true));
    setIsUpgradeModalOpen(false);
  };


  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-teal-600 mb-6">Os seus dados para um plano personalizado</h2>
            <UserInputForm onSubmit={handleGeneratePlan} isLoading={isLoading} />
          </div>

          {isPremium ? (
              <CalorieCounter />
          ) : (
              <CalorieCounterCTA onUpgradeClick={() => setIsUpgradeModalOpen(true)} />
          )}

          {isPremium ? (
              <WeightChart history={planHistory} />
          ) : (
              <WeightChartCTA onUpgradeClick={() => setIsUpgradeModalOpen(true)} />
          )}

          {isPremium ? (
              <HistoryPanel 
                history={planHistory} 
                onSelect={handleSelectPlan}
                onDelete={handleDeletePlan}
                activePlanId={currentPlan?.id}
              />
          ) : (
             <PremiumCTA onUpgradeClick={() => setIsUpgradeModalOpen(true)} />
          )}

          {isLoading && <LoadingSpinner />}
          
          {error && (
            <div className="mt-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center" role="alert">
              <strong className="font-bold">Erro: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {currentPlan && !isLoading && (
            <div className="mt-12">
              <PlanDisplay plan={currentPlan} />

              <div className="mt-8">
                {currentPlan.feedbackSubmitted ? (
                  <div className="text-center bg-green-100 text-green-800 p-4 rounded-2xl border border-green-200">
                    <p className="font-semibold">Obrigado pelo seu feedback!</p>
                  </div>
                ) : (
                  <FeedbackForm onSubmit={handleFeedbackSubmit} />
                )}
              </div>

            </div>
          )}
        </div>
      </main>
      <Footer />
      {isUpgradeModalOpen && (
        <UpgradeModal 
            onClose={() => setIsUpgradeModalOpen(false)}
            onUpgrade={handleUpgrade}
        />
      )}
    </div>
  );
};

export default App;
