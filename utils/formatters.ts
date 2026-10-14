/**
 * Formata um número para a moeda brasileira (ex: R$ 49,90)
 */
export function formatarMoeda(valor: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(valor);
}

/**
 * Converte centavos em número float (ex: 1250 -> 12.50)
 */
export function centavosParaReais(centavos: number): number {
  return centavos / 100;
}

/**
 * Formata data e hora para exibição amigável
 */
export function formatarDataHora(dataIso: string): string {
  try {
    const data = new Date(dataIso);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(data);
  } catch {
    return dataIso;
  }
}

/**
 * Formata horário curto (ex: 14:32)
 */
export function formatarHora(dataIso: string): string {
  try {
    const data = new Date(dataIso);
    return new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(data);
  } catch {
    return '';
  }
}

/**
 * Gera um payload simulado de Pix Copia e Cola no padrão EMV
 */
export function gerarCodigoPix(id: string, valor: number): string {
  const chave = 'comerciante@primerpay.com.br';
  const nome = 'PRIMERPAY COMERCIO';
  const cidade = 'SAO PAULO';
  const txid = id.replace(/[^A-Za-z0-9]/g, '').slice(-12).toUpperCase();
  const valorFormatado = valor.toFixed(2);

  return `00020126580014br.gov.bcb.pix0136${chave}520400005303986540${valorFormatado.length}${valorFormatado}5802BR5918${nome}6009${cidade}62160512${txid}6304E8A2`;
}
