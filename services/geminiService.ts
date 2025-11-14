import { GoogleGenAI, Type } from "@google/genai";
import type { UserData, PlanoSemanal, CalorieAnalysisResult } from '../types';

// FIX: Per coding guidelines, API key should be passed directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// FIX: Refactored schema for better readability and maintainability.
const refeicaoSchema = {
  type: Type.OBJECT,
  properties: {
    descricao: { type: Type.STRING },
    calorias: { type: Type.INTEGER },
  },
  required: ['descricao', 'calorias'],
};

const planoDiaSchema = {
  type: Type.OBJECT,
  properties: {
    refeicoes: {
      type: Type.OBJECT,
      properties: {
        pequeno_almoco: refeicaoSchema,
        almoco: refeicaoSchema,
        lanche: refeicaoSchema,
        jantar: refeicaoSchema,
      },
      required: ['pequeno_almoco', 'almoco', 'lanche', 'jantar'],
    },
    treino: {
      type: Type.OBJECT,
      properties: {
        descricao: { type: Type.STRING },
        duracao: { type: Type.INTEGER },
      },
      required: ['descricao', 'duracao'],
    },
    total_calorias: { type: Type.INTEGER },
  },
  required: ['refeicoes', 'treino', 'total_calorias'],
};

const schema = {
  type: Type.OBJECT,
  properties: {
    segunda: planoDiaSchema,
    terca: planoDiaSchema,
    quarta: planoDiaSchema,
    quinta: planoDiaSchema,
    sexta: planoDiaSchema,
    sabado: planoDiaSchema,
    domingo: planoDiaSchema,
    lista_compras: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
    },
  },
  required: ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo', 'lista_compras'],
};


const activityLevelMap = {
  sedentario: 'Sedentário (pouco ou nenhum exercício)',
  leve: 'Levemente ativo (exercício leve 1-3 dias/semana)',
  moderado: 'Moderadamente ativo (exercício moderado 3-5 dias/semana)',
  ativo: 'Muito ativo (exercício intenso 6-7 dias/semana)',
  muito_ativo: 'Extremamente ativo (exercício muito intenso e trabalho físico)'
};

export const generatePlan = async (data: UserData): Promise<PlanoSemanal | null> => {
  const prompt = `
    Crie um plano de emagrecimento semanal detalhado em português de Portugal para uma pessoa com as seguintes características:
    - Idade: ${data.age} anos
    - Peso: ${data.weight} kg
    - Altura: ${data.height} cm
    - Género: ${data.gender}
    - Nível de atividade: ${activityLevelMap[data.activityLevel]}
    - Objetivo: ${data.goal}

    O plano deve incluir:
    1.  Um plano de refeições para 7 dias (Segunda a Domingo), com 4 refeições por dia: pequeno-almoço, almoço, lanche e jantar. Para cada refeição, forneça uma descrição e uma estimativa de calorias. As refeições devem ser saudáveis, equilibradas e usar ingredientes comuns em Portugal.
    2.  Um plano de treinos para 7 dias, alternando entre exercícios de cardio, força e dias de descanso. Para cada dia de treino, forneça uma descrição do treino e a duração em minutos. Os treinos devem ser adequados para fazer em casa ou num ginásio com equipamento básico.
    3.  Calcule o total de calorias para cada dia.
    4.  Uma lista de compras consolidada para a semana inteira, agrupando os ingredientes necessários para todas as refeições. A lista deve ser prática e organizada por categorias (ex: Frutas, Vegetais, Proteínas, Laticínios, Grãos, etc.).

    Responda exclusivamente no formato JSON, seguindo o schema fornecido.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: schema,
      },
    });

    const jsonText = response.text.trim();
    const plan = JSON.parse(jsonText);
    return plan as PlanoSemanal;
  } catch (error) {
    console.error("Error generating plan with Gemini:", error);
    throw new Error("Failed to parse plan from Gemini response.");
  }
};

const calorieAnalysisSchema = {
  type: Type.OBJECT,
  properties: {
    prato: { 
      type: Type.STRING,
      description: 'Nome ou breve descrição do prato na imagem.'
    },
    total_calorias: {
      type: Type.INTEGER,
      description: 'Estimativa do número total de calorias no prato.'
    },
    analise: {
      type: Type.STRING,
      description: 'Uma breve análise nutricional ou descrição dos componentes do prato.'
    }
  },
  required: ['prato', 'total_calorias', 'analise']
};

export const analyzeImage = async (base64Image: string, mimeType: string): Promise<CalorieAnalysisResult | null> => {
  const prompt = `
    Analise a imagem de comida fornecida. Identifique o prato e os seus principais ingredientes.
    Estime o número total de calorias.
    Forneça uma breve análise.
    Responda exclusivamente no formato JSON, seguindo o schema fornecido. Seja realista na sua estimativa.
    A análise deve ser em português de Portugal.
  `;

  const imagePart = {
    inlineData: {
      data: base64Image,
      mimeType: mimeType,
    },
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, { text: prompt }] },
      config: {
        responseMimeType: 'application/json',
        responseSchema: calorieAnalysisSchema,
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    return result as CalorieAnalysisResult;

  } catch (error) {
    console.error("Error analyzing image with Gemini:", error);
    throw new Error("Failed to parse analysis from Gemini response.");
  }
};
