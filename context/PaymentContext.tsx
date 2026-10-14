import React, { createContext, useContext, useState } from 'react';
import { Cobranca, ComprovantePagamento, TipoPagamento } from '@/types/pagamento';
import { gerarCodigoPix } from '@/utils/formatters';

interface PaymentContextData {
  cobrancas: Cobranca[];
  cobrancaAtual: Cobranca | null;
  cobrancaParaPagar: Cobranca | null;
  criarCobranca: (valor: number, descricao: string, metodo?: TipoPagamento) => Cobranca;
  simularPagamento: (cobrancaId: string, nomePagador?: string, metodoUsado?: TipoPagamento) => Promise<boolean>;
  cancelarCobranca: (cobrancaId: string) => void;
  selecionarCobrancaParaCliente: (cobranca: Cobranca | null) => void;
  limparHistorico: () => void;
  restaurarDadosExemplo: () => void;
  totalVendidoHoje: number;
  totalVendasRealizadas: number;
  ticketMedioHoje: number;
  saldoEmConta: number;
}

// Saldo inicial mockado da conta do comerciante (MVP)
const SALDO_INICIAL = 1250.4;

const DADOS_INICIAIS: Cobranca[] = [
  {
    id: 'PIX-9482',
    valor: 45.9,
    descricao: 'Almoço Executivo + Bebida',
    metodo: 'PIX',
    status: 'PAGO',
    criadoEm: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    pagoEm: new Date(Date.now() - 1000 * 60 * 34).toISOString(),
    codigoPix: gerarCodigoPix('PIX-9482', 45.9),
    comprovante: {
      idTransacao: 'E000381662026101211158392019',
      autenticacaoBancaria: '9A.4F.88.B1.0C.33.FE.41',
      dataHora: new Date(Date.now() - 1000 * 60 * 34).toISOString(),
      pagador: 'Lucas Silva Costa',
      recebedor: 'PrimerPay Comércio e Serviços Ltda',
      chaveRecebedor: 'comerciante@primerpay.com.br',
      valor: 45.9,
      metodo: 'PIX',
    },
  },
  {
    id: 'PIX-9481',
    valor: 18.5,
    descricao: 'Café Especial + Pão de Queijo',
    metodo: 'PIX',
    status: 'PAGO',
    criadoEm: new Date(Date.now() - 1000 * 60 * 110).toISOString(),
    pagoEm: new Date(Date.now() - 1000 * 60 * 109).toISOString(),
    codigoPix: gerarCodigoPix('PIX-9481', 18.5),
    comprovante: {
      idTransacao: 'E000381662026101210059182341',
      autenticacaoBancaria: '3D.8B.12.AA.9E.54.01.2C',
      dataHora: new Date(Date.now() - 1000 * 60 * 109).toISOString(),
      pagador: 'Mariana Duarte Souza',
      recebedor: 'PrimerPay Comércio e Serviços Ltda',
      chaveRecebedor: 'comerciante@primerpay.com.br',
      valor: 18.5,
      metodo: 'PIX',
    },
  },
  {
    id: 'PIX-9480',
    valor: 89.0,
    descricao: 'Kit Presente Artesanal',
    metodo: 'PIX',
    status: 'PAGO',
    criadoEm: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    pagoEm: new Date(Date.now() - 1000 * 60 * 238).toISOString(),
    codigoPix: gerarCodigoPix('PIX-9480', 89.0),
    comprovante: {
      idTransacao: 'E000381662026101208194481023',
      autenticacaoBancaria: 'F1.7A.6C.44.89.BB.90.11',
      dataHora: new Date(Date.now() - 1000 * 60 * 238).toISOString(),
      pagador: 'Carlos Eduardo Mendes',
      recebedor: 'PrimerPay Comércio e Serviços Ltda',
      chaveRecebedor: 'comerciante@primerpay.com.br',
      valor: 89.0,
      metodo: 'PIX',
    },
  },
];

const PaymentContext = createContext<PaymentContextData>({} as PaymentContextData);

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cobrancas, setCobrancas] = useState<Cobranca[]>(DADOS_INICIAIS);
  const [cobrancaAtual, setCobrancaAtual] = useState<Cobranca | null>(null);
  const [cobrancaParaPagar, setCobrancaParaPagar] = useState<Cobranca | null>(null);

  const criarCobranca = (valor: number, descricao: string, metodo: TipoPagamento = 'PIX'): Cobranca => {
    const idNumero = Math.floor(1000 + Math.random() * 9000);
    const novoId = `PIX-${idNumero}`;
    const agoraIso = new Date().toISOString();

    const novaCobranca: Cobranca = {
      id: novoId,
      valor,
      descricao: descricao.trim() || 'Venda no Balcão',
      metodo,
      status: 'PENDENTE',
      criadoEm: agoraIso,
      codigoPix: gerarCodigoPix(novoId, valor),
    };

    setCobrancas((prev) => [novaCobranca, ...prev]);
    setCobrancaAtual(novaCobranca);
    setCobrancaParaPagar(novaCobranca);

    return novaCobranca;
  };

  const simularPagamento = async (
    cobrancaId: string,
    nomePagador: string = 'Cliente PrimerPay',
    metodoUsado: TipoPagamento = 'PIX'
  ): Promise<boolean> => {
    // Simula tempo de processamento bancário (1.2 segundos)
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const agoraIso = new Date().toISOString();
    const hashAutenticacao = Array.from({ length: 8 }, () =>
      Math.floor(Math.random() * 256)
        .toString(16)
        .padStart(2, '0')
        .toUpperCase()
    ).join('.');

    const idTransacao = `E00038166${new Date().toISOString().slice(0, 10).replace(/-/g, '')}${Math.floor(
      10000000 + Math.random() * 90000000
    )}`;

    let cobrancaAtualizada: Cobranca | null = null;

    setCobrancas((prev) =>
      prev.map((cob) => {
        if (cob.id === cobrancaId) {
          const comprovante: ComprovantePagamento = {
            idTransacao,
            autenticacaoBancaria: hashAutenticacao,
            dataHora: agoraIso,
            pagador: nomePagador,
            recebedor: 'PrimerPay Comércio e Serviços Ltda',
            chaveRecebedor: 'comerciante@primerpay.com.br',
            valor: cob.valor,
            metodo: metodoUsado,
          };

          cobrancaAtualizada = {
            ...cob,
            status: 'PAGO',
            pagoEm: agoraIso,
            metodo: metodoUsado,
            comprovante,
          };
          return cobrancaAtualizada;
        }
        return cob;
      })
    );

    if (cobrancaAtual?.id === cobrancaId && cobrancaAtualizada) {
      setCobrancaAtual(cobrancaAtualizada);
    }
    if (cobrancaParaPagar?.id === cobrancaId && cobrancaAtualizada) {
      setCobrancaParaPagar(cobrancaAtualizada);
    }

    return true;
  };

  const cancelarCobranca = (cobrancaId: string) => {
    setCobrancas((prev) =>
      prev.map((c) => (c.id === cobrancaId ? { ...c, status: 'CANCELADO' } : c))
    );
    if (cobrancaAtual?.id === cobrancaId) {
      setCobrancaAtual((prev) => (prev ? { ...prev, status: 'CANCELADO' } : null));
    }
    if (cobrancaParaPagar?.id === cobrancaId) {
      setCobrancaParaPagar(null);
    }
  };

  const selecionarCobrancaParaCliente = (cobranca: Cobranca | null) => {
    setCobrancaParaPagar(cobranca);
  };

  const limparHistorico = () => {
    setCobrancas([]);
    setCobrancaAtual(null);
    setCobrancaParaPagar(null);
  };

  const restaurarDadosExemplo = () => {
    setCobrancas(DADOS_INICIAIS);
    setCobrancaAtual(null);
    setCobrancaParaPagar(null);
  };

  const vendasPagas = cobrancas.filter((c) => c.status === 'PAGO');
  const totalVendidoHoje = vendasPagas.reduce((acc, c) => acc + c.valor, 0);
  const totalVendasRealizadas = vendasPagas.length;
  const ticketMedioHoje = totalVendasRealizadas > 0 ? totalVendidoHoje / totalVendasRealizadas : 0;
  const saldoEmConta = SALDO_INICIAL + totalVendidoHoje;

  return (
    <PaymentContext.Provider
      value={{
        cobrancas,
        cobrancaAtual,
        cobrancaParaPagar,
        criarCobranca,
        simularPagamento,
        cancelarCobranca,
        selecionarCobrancaParaCliente,
        limparHistorico,
        restaurarDadosExemplo,
        totalVendidoHoje,
        totalVendasRealizadas,
        ticketMedioHoje,
        saldoEmConta,
      }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment deve ser usado dentro de um PaymentProvider');
  }
  return context;
};
