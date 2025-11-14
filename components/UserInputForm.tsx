
import React, { useState } from 'react';
import type { UserData } from '../types';

interface UserInputFormProps {
  onSubmit: (data: UserData) => void;
  isLoading: boolean;
}

const UserInputForm: React.FC<UserInputFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    age: '30',
    weight: '70',
    height: '170',
    gender: 'feminino',
    activityLevel: 'moderado',
    goal: 'Perder 5 kg em 2 meses de forma saudável.'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: UserData = {
      age: parseInt(formData.age),
      weight: parseFloat(formData.weight),
      height: parseInt(formData.height),
      gender: formData.gender as UserData['gender'],
      activityLevel: formData.activityLevel as UserData['activityLevel'],
      goal: formData.goal,
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-slate-700">Idade</label>
          <input type="number" name="age" id="age" value={formData.age} onChange={handleChange} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-slate-700">Peso (kg)</label>
          <input type="number" step="0.1" name="weight" id="weight" value={formData.weight} onChange={handleChange} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="height" className="block text-sm font-medium text-slate-700">Altura (cm)</label>
          <input type="number" name="height" id="height" value={formData.height} onChange={handleChange} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-slate-700">Género</label>
          <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm">
            <option value="feminino">Feminino</option>
            <option value="masculino">Masculino</option>
          </select>
        </div>
        <div>
          <label htmlFor="activityLevel" className="block text-sm font-medium text-slate-700">Nível de Atividade</label>
          <select id="activityLevel" name="activityLevel" value={formData.activityLevel} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm">
            <option value="sedentario">Sedentário</option>
            <option value="leve">Leve</option>
            <option value="moderado">Moderado</option>
            <option value="ativo">Ativo</option>
            <option value="muito_ativo">Muito Ativo</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="goal" className="block text-sm font-medium text-slate-700">Qual é o seu objetivo principal?</label>
        <textarea id="goal" name="goal" rows={3} value={formData.goal} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm" placeholder="Ex: Perder peso, ganhar massa muscular, manter um estilo de vida saudável..."></textarea>
      </div>
      <div className="text-center pt-4">
        <button type="submit" disabled={isLoading} className="inline-flex items-center justify-center rounded-lg border border-transparent bg-teal-600 px-8 py-3 text-base font-medium text-white hover:bg-teal-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
          {isLoading ? 'A gerar o seu plano...' : 'Gerar Plano Personalizado'}
        </button>
      </div>
    </form>
  );
};

export default UserInputForm;
