import React from 'react';
import type { PlanoComHistorico } from '../types';

interface WeightChartProps {
    history: PlanoComHistorico[];
}

const WeightChart: React.FC<WeightChartProps> = ({ history }) => {
    const dataPoints = history
        .map(plan => ({
            date: new Date(plan.id), 
            weight: plan.userData.weight
        }))
        .filter(p => p.date && !isNaN(p.date.getTime()) && p.weight)
        .sort((a, b) => a.date.getTime() - b.date.getTime());

    if (dataPoints.length < 2) {
        return (
             <div className="mt-12 bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200">
                <h3 className="text-2xl font-bold text-center text-teal-600 mb-2">Evolução do Peso</h3>
                <div className="text-center text-slate-500 py-8">
                    <p>Gere pelo menos dois planos para começar a visualizar o seu progresso aqui.</p>
                </div>
            </div>
        )
    }

    const width = 500;
    const height = 200;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const weights = dataPoints.map(d => d.weight);
    const dates = dataPoints.map(d => d.date.getTime());

    const minWeight = Math.min(...weights) - 2;
    const maxWeight = Math.max(...weights) + 2;
    const minDate = Math.min(...dates);
    const maxDate = Math.max(...dates);

    const xScale = (date: number) => ((date - minDate) / (maxDate - minDate)) * chartWidth;
    const yScale = (weight: number) => chartHeight - ((weight - minWeight) / (maxWeight - minWeight)) * chartHeight;

    const linePath = dataPoints
        .map((point, i) => {
            const x = xScale(point.date.getTime());
            const y = yScale(point.weight);
            return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
        })
        .join(' ');
        
    const formatDate = (date: Date) => {
        return date.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit' });
    }

    return (
        <div className="mt-12 bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200">
            <h3 className="text-2xl font-bold text-center text-teal-600 mb-4">Evolução do Peso</h3>
            <div className="flex justify-center">
                <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-lg" aria-labelledby="chart-title">
                    <title id="chart-title">Gráfico de evolução do peso</title>
                    <g transform={`translate(${margin.left}, ${margin.top})`}>
                        <g className="text-xs text-slate-500">
                            {[maxWeight, minWeight].map((weight, i) => (
                                <g key={i}>
                                    <text x={-10} y={yScale(weight)} dy="0.32em" textAnchor="end">{Math.round(weight)} kg</text>
                                    <line x1="0" x2={chartWidth} y1={yScale(weight)} y2={yScale(weight)} stroke="#e2e8f0" strokeDasharray="2,2" />
                                </g>
                            ))}
                        </g>

                        <g className="text-xs text-slate-500">
                            <text x={xScale(minDate)} y={chartHeight + 20} textAnchor="start">{formatDate(new Date(minDate))}</text>
                            <text x={xScale(maxDate)} y={chartHeight + 20} textAnchor="end">{formatDate(new Date(maxDate))}</text>
                        </g>
                        
                        <path d={linePath} fill="none" stroke="#0d9488" strokeWidth="2" />

                        {dataPoints.map((point, i) => (
                            <g key={i} className="group">
                                <circle
                                    cx={xScale(point.date.getTime())}
                                    cy={yScale(point.weight)}
                                    r="4"
                                    fill="#0d9488"
                                    className="cursor-pointer"
                                />
                                <text 
                                    x={xScale(point.date.getTime())}
                                    y={yScale(point.weight) - 10}
                                    textAnchor="middle"
                                    className="text-xs font-semibold fill-slate-700 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    {point.weight.toFixed(1)}kg
                                </text>
                            </g>
                        ))}
                    </g>
                </svg>
            </div>
        </div>
    );
};

export default WeightChart;