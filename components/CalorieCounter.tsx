import React, { useState, useRef } from 'react';
import { analyzeImage } from '../services/geminiService';
import type { CalorieAnalysisResult } from '../types';

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64String = (reader.result as string).split(',')[1];
            resolve(base64String);
        };
        reader.onerror = error => reject(error);
    });
};

const CalorieCounter: React.FC = () => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [result, setResult] = useState<CalorieAnalysisResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
            setResult(null);
            setError(null);
        }
    };

    const handleAnalyze = async () => {
        if (!imageFile) return;
        setIsLoading(true);
        setError(null);
        setResult(null);
        try {
            const base64Image = await fileToBase64(imageFile);
            const analysisResult = await analyzeImage(base64Image, imageFile.type);
            if(analysisResult){
                setResult(analysisResult);
            } else {
                setError('Não foi possível analisar a imagem. Tente novamente.');
            }
        } catch (err) {
            console.error(err);
            setError('Ocorreu um erro ao analisar a imagem. Verifique a consola para mais detalhes.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mt-12 bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200">
            <h3 className="text-2xl font-bold text-center text-teal-600 mb-2">Contador de Calorias por IA</h3>
            <p className="text-center text-slate-500 mb-6">Tire uma foto da sua refeição e descubra as calorias!</p>

            <div className="flex flex-col items-center gap-6">
                <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                    className="hidden"
                />
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full max-w-sm inline-flex items-center justify-center rounded-lg border-2 border-dashed border-slate-300 hover:border-teal-400 bg-slate-50 px-8 py-10 text-base font-medium text-slate-500 hover:text-teal-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                    {imagePreview ? (
                        <img src={imagePreview} alt="Pré-visualização da refeição" className="max-h-48 rounded-lg object-contain" />
                    ) : (
                        <div className="text-center">
                            <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 4v.01M28 8L36 8a4 4 0 014 4v4m0 8v4a4 4 0 01-4 4H12a4 4 0 01-4-4V12a4 4 0 014-4h4m16-4l-4 4m0 0l-4-4m4 4v12m-12 4h.01M16 20h.01M20 16h.01M24 20h.01M28 16h.01M16 16h.01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            <span className="mt-2 block">Tirar Foto ou Carregar Imagem</span>
                        </div>
                    )}
                </button>

                {imageFile && (
                    <button
                        onClick={handleAnalyze}
                        disabled={isLoading}
                        className="inline-flex items-center justify-center rounded-lg border border-transparent bg-teal-600 px-8 py-3 text-base font-medium text-white hover:bg-teal-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                    >
                        {isLoading ? 'A analisar...' : 'Analisar Refeição'}
                    </button>
                )}
            </div>

            {isLoading && (
                 <div className="flex items-center justify-center my-6">
                    <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-teal-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-slate-600">A IA está a contar as calorias...</p>
                </div>
            )}

            {error && (
                <div className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            {result && !isLoading && (
                <div className="mt-8 text-center bg-teal-50 p-6 rounded-lg border border-teal-200 animate-fade-in">
                    <p className="text-xl font-semibold text-slate-800">{result.prato}</p>
                    <p className="text-6xl font-bold text-teal-600 my-2">{result.total_calorias}<span className="text-2xl font-medium text-slate-500"> kcal</span></p>
                    <p className="text-slate-600 max-w-prose mx-auto">{result.analise}</p>
                </div>
            )}
            <style>{`.animate-fade-in { animation: fadeIn 0.5s ease-in-out; } @keyframes fadeIn { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }`}</style>
        </div>
    );
};

export default CalorieCounter;
