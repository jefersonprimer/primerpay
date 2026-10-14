import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { usePayment } from '@/context/PaymentContext';
import { Paleta } from '@/constants/Colors';
import { formatarMoeda } from '@/utils/formatters';
import { ModalComprovante } from '@/components/ModalComprovante';
import { Cobranca, TipoPagamento } from '@/types/pagamento';
import {
  Wallet,
  ShieldCheck,
  CreditCard,
  Building2,
  CheckCircle2,
  ArrowRight,
  QrCode,
} from 'lucide-react-native';

export default function TelaCliente() {
  const router = useRouter();
  const {
    cobrancaParaPagar,
    simularPagamento,
    cobrancas,
    selecionarCobrancaParaCliente,
  } = usePayment();

  const [metodoSelecionado, setMetodoSelecionado] = useState<TipoPagamento>('PIX');
  const [carregando, setCarregando] = useState<boolean>(false);
  const [modalComprovanteVisivel, setModalComprovanteVisivel] = useState<boolean>(false);
  const [cobrancaFinalizada, setCobrancaFinalizada] = useState<Cobranca | null>(null);

  // Cobranças pendentes disponíveis para simular
  const cobrancasPendentes = cobrancas.filter((c) => c.status === 'PENDENTE');

  // Cobrança atual para pagar (ou a primeira pendente se a selecionada já foi paga)
  const cobrancaAtiva =
    cobrancaParaPagar && cobrancaParaPagar.status === 'PENDENTE'
      ? cobrancaParaPagar
      : cobrancasPendentes[0] || null;

  const handlePagar = async () => {
    if (!cobrancaAtiva) return;

    setCarregando(true);
    try {
      const sucesso = await simularPagamento(
        cobrancaAtiva.id,
        'Cliente PrimerPay (Você)',
        metodoSelecionado
      );

      if (sucesso) {
        // Encontra a cobrança atualizada com o comprovante
        const atualizada = cobrancas.find((c) => c.id === cobrancaAtiva.id) || cobrancaAtiva;
        setCobrancaFinalizada({
          ...atualizada,
          status: 'PAGO',
          comprovante: {
            idTransacao: `E00038166${Date.now()}`,
            autenticacaoBancaria: 'A4.7E.99.10.BC.22.FE.01',
            dataHora: new Date().toISOString(),
            pagador: 'Cliente PrimerPay (Você)',
            recebedor: 'PrimerPay Comércio e Serviços Ltda',
            chaveRecebedor: 'comerciante@primerpay.com.br',
            valor: cobrancaAtiva.valor,
            metodo: metodoSelecionado,
          },
        });
        setModalComprovanteVisivel(true);
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        {/* Cabeçalho do Banco Simulado */}
        <View style={styles.cabecalhoBanco}>
          <View style={styles.logoBancoContainer}>
            <View style={styles.iconeBanco}>
              <Wallet size={20} color="#FFFFFF" />
            </View>
            <View>
              <Text style={styles.nomeBanco}>PrimerBank</Text>
              <Text style={styles.tipoConta}>Conta Digital • Ag 0001</Text>
            </View>
          </View>
          <View style={styles.saldoPill}>
            <Text style={styles.labelSaldo}>Saldo Disp.</Text>
            <Text style={styles.valorSaldo}>R$ 2.450,80</Text>
          </View>
        </View>

        {/* Se tem cobrança ativa para pagar */}
        {cobrancaAtiva ? (
          <View style={styles.cardPagamento}>
            <View style={styles.tagSimulacao}>
              <ShieldCheck size={14} color={Paleta.primaria} />
              <Text style={styles.textoTagSimulacao}>Pagamento Seguro Simulado</Text>
            </View>

            {/* Informações do Recebedor */}
            <View style={styles.areaRecebedor}>
              <View style={styles.iconeRecebedor}>
                <Building2 size={24} color={Paleta.textoSecundario} />
              </View>
              <Text style={styles.nomeRecebedor}>PrimerPay Comércio e Serviços</Text>
              <Text style={styles.chavePix}>CNPJ: 42.109.842/0001-90</Text>
              <Text style={styles.descricaoCompra}>&quot;{cobrancaAtiva.descricao}&quot;</Text>
            </View>

            {/* Valor da Cobrança */}
            <View style={styles.blocoValorTotal}>
              <Text style={styles.labelTotal}>VALOR A PAGAR</Text>
              <Text style={styles.valorTotalPagar}>{formatarMoeda(cobrancaAtiva.valor)}</Text>
              <Text style={styles.refId}>Código: {cobrancaAtiva.id}</Text>
            </View>

            {/* Escolha da Forma de Pagamento */}
            <Text style={styles.tituloOpcoes}>Escolha a forma de pagamento:</Text>

            <TouchableOpacity
              style={[
                styles.opcaoPagamento,
                metodoSelecionado === 'PIX' && styles.opcaoSelecionada,
              ]}
              onPress={() => setMetodoSelecionado('PIX')}
              activeOpacity={0.7}>
              <View style={styles.opcaoInfo}>
                <View style={styles.iconeOpcao}>
                  <QrCode
                    size={18}
                    color={metodoSelecionado === 'PIX' ? Paleta.primaria : Paleta.textoSecundario}
                  />
                </View>
                <View>
                  <Text style={styles.tituloMetodo}>Saldo da Conta Pix</Text>
                  <Text style={styles.subMetodo}>Instantâneo • Sem taxas</Text>
                </View>
              </View>
              <View style={[styles.radio, metodoSelecionado === 'PIX' && styles.radioAtivo]} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.opcaoPagamento,
                metodoSelecionado === 'CARTAO_CREDITO' && styles.opcaoSelecionada,
              ]}
              onPress={() => setMetodoSelecionado('CARTAO_CREDITO')}
              activeOpacity={0.7}>
              <View style={styles.opcaoInfo}>
                <View style={styles.iconeOpcao}>
                  <CreditCard
                    size={18}
                    color={
                      metodoSelecionado === 'CARTAO_CREDITO'
                        ? Paleta.primaria
                        : Paleta.textoSecundario
                    }
                  />
                </View>
                <View>
                  <Text style={styles.tituloMetodo}>Cartão de Crédito Primer</Text>
                  <Text style={styles.subMetodo}>Final 4921 • Em 1x</Text>
                </View>
              </View>
              <View
                style={[
                  styles.radio,
                  metodoSelecionado === 'CARTAO_CREDITO' && styles.radioAtivo,
                ]}
              />
            </TouchableOpacity>

            {/* Botão de Confirmação */}
            <TouchableOpacity
              style={[styles.botaoConfirmar, carregando && styles.botaoCarregando]}
              disabled={carregando}
              onPress={handlePagar}
              activeOpacity={0.85}>
              {carregando ? (
                <View style={styles.loadingWrapper}>
                  <ActivityIndicator size="small" color="#FFFFFF" />
                  <Text style={styles.textoBotaoConfirmar}>Processando pagamento...</Text>
                </View>
              ) : (
                <View style={styles.loadingWrapper}>
                  <ShieldCheck size={20} color="#FFFFFF" />
                  <Text style={styles.textoBotaoConfirmar}>
                    Confirmar e Pagar {formatarMoeda(cobrancaAtiva.valor)}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          /* Estado Vazio */
          <View style={styles.cardVazio}>
            <View style={styles.iconeVazio}>
              <CheckCircle2 size={44} color={Paleta.primaria} />
            </View>
            <Text style={styles.tituloVazio}>Nenhuma cobrança pendente</Text>
            <Text style={styles.subtituloVazio}>
              Não há pagamentos aguardando aprovação no momento. Gere um novo QR Code na aba Cobrar.
            </Text>

            <TouchableOpacity
              style={styles.botaoIrCobrar}
              onPress={() => router.push('/(tabs)')}
              activeOpacity={0.8}>
              <Text style={styles.textoIrCobrar}>Ir para a tela do Comerciante</Text>
              <ArrowRight size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        )}

        {/* Lista de cobranças pendentes alternativas (se houver mais de uma) */}
        {cobrancasPendentes.length > 1 && (
          <View style={styles.secaoOutrasCobrancas}>
            <Text style={styles.tituloOutras}>Outras cobranças aguardando:</Text>
            {cobrancasPendentes.map((cob) => (
              <TouchableOpacity
                key={cob.id}
                style={[
                  styles.itemPendente,
                  cobrancaAtiva?.id === cob.id && styles.itemPendenteAtivo,
                ]}
                onPress={() => selecionarCobrancaParaCliente(cob)}
                activeOpacity={0.7}>
                <View>
                  <Text style={styles.itemDescricao}>{cob.descricao}</Text>
                  <Text style={styles.itemId}>Ref: {cob.id}</Text>
                </View>
                <Text style={styles.itemValor}>{formatarMoeda(cob.valor)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Modal de Comprovante de Pagamento */}
      <ModalComprovante
        visivel={modalComprovanteVisivel}
        cobranca={cobrancaFinalizada}
        onFechar={() => {
          setModalComprovanteVisivel(false);
          router.push('/(tabs)/historico');
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Paleta.cinzaFundo,
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  cabecalhoBanco: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 4,
  },
  logoBancoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconeBanco: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: Paleta.azulBancario,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nomeBanco: {
    fontSize: 17,
    fontWeight: '800',
    color: Paleta.textoPrincipal,
    letterSpacing: 0.3,
  },
  tipoConta: {
    fontSize: 12,
    color: Paleta.textoSecundario,
  },
  saldoPill: {
    backgroundColor: Paleta.cinzaCard,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Paleta.cinzaBorda,
    alignItems: 'flex-end',
  },
  labelSaldo: {
    fontSize: 10,
    color: Paleta.textoSecundario,
    textTransform: 'uppercase',
  },
  valorSaldo: {
    fontSize: 13,
    fontWeight: '700',
    color: Paleta.primaria,
  },
  cardPagamento: {
    backgroundColor: Paleta.cinzaCard,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: Paleta.cinzaBorda,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  tagSimulacao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'center',
    backgroundColor: Paleta.primariaClara,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 16,
  },
  textoTagSimulacao: {
    fontSize: 12,
    fontWeight: '700',
    color: Paleta.primariaEscura,
  },
  areaRecebedor: {
    alignItems: 'center',
    marginBottom: 16,
  },
  iconeRecebedor: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Paleta.cinzaSuave,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  nomeRecebedor: {
    fontSize: 16,
    fontWeight: '700',
    color: Paleta.textoPrincipal,
    textAlign: 'center',
  },
  chavePix: {
    fontSize: 12,
    color: Paleta.textoSecundario,
    marginTop: 2,
  },
  descricaoCompra: {
    fontSize: 13,
    fontStyle: 'italic',
    color: Paleta.textoSecundario,
    marginTop: 6,
  },
  blocoValorTotal: {
    backgroundColor: Paleta.cinzaSuave,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginVertical: 14,
  },
  labelTotal: {
    fontSize: 11,
    fontWeight: '700',
    color: Paleta.textoSecundario,
    letterSpacing: 1,
  },
  valorTotalPagar: {
    fontSize: 32,
    fontWeight: '800',
    color: Paleta.textoPrincipal,
    marginVertical: 4,
  },
  refId: {
    fontSize: 12,
    color: Paleta.textoMutado,
  },
  tituloOpcoes: {
    fontSize: 13,
    fontWeight: '700',
    color: Paleta.textoSecundario,
    marginBottom: 10,
    marginTop: 4,
  },
  opcaoPagamento: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Paleta.cinzaBorda,
    marginBottom: 10,
    backgroundColor: Paleta.cinzaCard,
  },
  opcaoSelecionada: {
    borderColor: Paleta.primaria,
    backgroundColor: Paleta.primariaClara,
  },
  opcaoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconeOpcao: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Paleta.cinzaSuave,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tituloMetodo: {
    fontSize: 14,
    fontWeight: '700',
    color: Paleta.textoPrincipal,
  },
  subMetodo: {
    fontSize: 12,
    color: Paleta.textoSecundario,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Paleta.cinzaBorda,
  },
  radioAtivo: {
    borderColor: Paleta.primaria,
    backgroundColor: Paleta.primaria,
  },
  botaoConfirmar: {
    backgroundColor: Paleta.primaria,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
    shadowColor: Paleta.primaria,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  botaoCarregando: {
    backgroundColor: Paleta.primariaEscura,
  },
  loadingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  textoBotaoConfirmar: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  cardVazio: {
    backgroundColor: Paleta.cinzaCard,
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: Paleta.cinzaBorda,
  },
  iconeVazio: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Paleta.primariaClara,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  tituloVazio: {
    fontSize: 18,
    fontWeight: '700',
    color: Paleta.textoPrincipal,
  },
  subtituloVazio: {
    fontSize: 13,
    color: Paleta.textoSecundario,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
    marginBottom: 20,
  },
  botaoIrCobrar: {
    backgroundColor: Paleta.primaria,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  textoIrCobrar: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  secaoOutrasCobrancas: {
    marginTop: 20,
  },
  tituloOutras: {
    fontSize: 13,
    fontWeight: '700',
    color: Paleta.textoSecundario,
    marginBottom: 8,
  },
  itemPendente: {
    backgroundColor: Paleta.cinzaCard,
    padding: 14,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Paleta.cinzaBorda,
  },
  itemPendenteAtivo: {
    borderColor: Paleta.primaria,
    backgroundColor: Paleta.primariaClara,
  },
  itemDescricao: {
    fontSize: 14,
    fontWeight: '600',
    color: Paleta.textoPrincipal,
  },
  itemId: {
    fontSize: 11,
    color: Paleta.textoMutado,
  },
  itemValor: {
    fontSize: 15,
    fontWeight: '700',
    color: Paleta.primaria,
  },
});
