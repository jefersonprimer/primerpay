export interface Usuario {
  nome: string;
  iniciais: string;
  agencia: string;
  conta: string;
  primerScore: number;
  faixaScore: string;
}

// Dados mock do usuário padrão (MVP)
export const USUARIO_MOCK: Usuario = {
  nome: 'Marina Costa',
  iniciais: 'MC',
  agencia: '0001',
  conta: '12345-6',
  primerScore: 720,
  faixaScore: 'Regular',
};

/**
 * Função utilitária para extrair iniciais a partir de um nome completo
 */
export function extrairIniciais(nome: string): string {
  if (!nome) return '';
  const partes = nome.trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) return '';
  if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase();
  return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
}
