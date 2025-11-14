export interface UserData {
  age: number;
  weight: number;
  height: number;
  gender: 'masculino' | 'feminino';
  activityLevel: 'sedentario' | 'leve' | 'moderado' | 'ativo' | 'muito_ativo';
  goal: string;
}

export interface Refeicao {
  descricao: string;
  calorias: number;
}

export interface PlanoDia {
  refeicoes: {
    pequeno_almoco: Refeicao;
    almoco: Refeicao;
    lanche: Refeicao;
    jantar: Refeicao;
  };
  treino: {
    descricao: string;
    duracao: number;
  };
  total_calorias: number;
}

export interface PlanoSemanal {
  segunda: PlanoDia;
  terca: PlanoDia;
  quarta: PlanoDia;
  quinta: PlanoDia;
  sexta: PlanoDia;
  sabado: PlanoDia;
  domingo: PlanoDia;
  lista_compras: string[];
}

export interface PlanoComHistorico extends PlanoSemanal {
  id: string;
  createdAt: string;
  userData: UserData;
  feedbackSubmitted?: boolean;
}

export interface CalorieAnalysisResult {
  prato: string;
  total_calorias: number;
  analise: string;
}
