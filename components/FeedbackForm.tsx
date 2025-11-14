import React, { useState } from 'react';

interface FeedbackFormProps {
  onSubmit: (feedback: { rating: 'like' | 'dislike'; comment: string }) => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmit }) => {
  const [rating, setRating] = useState<'like' | 'dislike' | null>(null);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating) {
      onSubmit({ rating, comment });
    } else {
      alert('Por favor, selecione uma avaliação (útil ou não útil).');
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200">
      <h3 className="text-xl font-bold text-center text-teal-600 mb-4">Este plano foi útil?</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-center gap-4">
          <button
            type="button"
            onClick={() => setRating('like')}
            className={`px-6 py-2 rounded-full text-lg flex items-center gap-2 transition-all duration-200 ${
              rating === 'like' ? 'bg-teal-600 text-white ring-2 ring-offset-2 ring-teal-500' : 'bg-slate-200 hover:bg-teal-100'
            }`}
          >
            👍 Útil
          </button>
          <button
            type="button"
            onClick={() => setRating('dislike')}
            className={`px-6 py-2 rounded-full text-lg flex items-center gap-2 transition-all duration-200 ${
              rating === 'dislike' ? 'bg-red-500 text-white ring-2 ring-offset-2 ring-red-400' : 'bg-slate-200 hover:bg-red-100'
            }`}
          >
            👎 Não foi útil
          </button>
        </div>
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-slate-700 text-center mb-2">
            Deixe um comentário (opcional):
          </label>
          <textarea
            id="comment"
            name="comment"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="block w-full rounded-md border-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
            placeholder="O que podemos melhorar?"
          ></textarea>
        </div>
        <div className="text-center pt-2">
          <button
            type="submit"
            disabled={!rating}
            className="inline-flex items-center justify-center rounded-lg border border-transparent bg-teal-600 px-6 py-2 text-base font-medium text-white hover:bg-teal-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors duration-200 shadow-md"
          >
            Enviar Feedback
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;