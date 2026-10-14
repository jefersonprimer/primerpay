export type TipoPagamento = 'PIX' | 'CARTAO_CREDITO' | 'CARTAO_DEBITO';

export type StatusPagamento = 'PENDENTE' | 'PAGO' | 'CANCELADO';

export interface ComprovantePagamento {
  idTransacao: string;
  autenticacaoBancaria: string;
  dataHora: string;
  pagador: string;
  recebedor: string;
  chaveRecebedor: string;
  valor: number;
  metodo: TipoPagamento;
}

export interface Cobranca {
  id: string;
  valor: number;
  descricao: string;
  metodo: TipoPagamento;
  status: StatusPagamento;
  criadoEm: string;
  pagoEm?: string;
  codigoPix: string;
  comprovante?: ComprovantePagamento;
}
