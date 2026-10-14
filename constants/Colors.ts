export const Paleta = {
  primaria: '#6123E2', // Roxo PrimerPay (cor do ícone)
  primariaEscura: '#4C1D95',
  primariaClara: '#EDE9FE',
  primariaBorda: '#DDD6FE',

  azulBancario: '#2563EB',
  azulClaro: '#EFF6FF',
  azulBorda: '#BFDBFE',

  cinzaFundo: '#F8FAFC',
  cinzaCard: '#FFFFFF',
  cinzaBorda: '#E2E8F0',
  cinzaSuave: '#F1F5F9',

  textoPrincipal: '#0F172A',
  textoSecundario: '#64748B',
  textoMutado: '#94A3B8',

  sucesso: '#10B981',
  sucessoFundo: '#D1FAE5',
  atencao: '#F59E0B',
  atencaoFundo: '#FEF3C7',
  erro: '#EF4444',
  erroFundo: '#FEE2E2',
};

export default {
  light: {
    text: Paleta.textoPrincipal,
    background: Paleta.cinzaFundo,
    tint: Paleta.primaria,
    tabIconDefault: '#94A3B8',
    tabIconSelected: Paleta.primaria,
  },
  dark: {
    text: '#F8FAFC',
    background: '#0F172A',
    tint: '#A78BFA',
    tabIconDefault: '#64748B',
    tabIconSelected: '#A78BFA',
  },
};
