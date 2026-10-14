import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePayment } from '@/context/PaymentContext';
import { Paleta } from '@/constants/Colors';
import { formatarMoeda, formatarDataHora } from '@/utils/formatters';
import { BadgeStatus } from '@/components/BadgeStatus';
import { ModalComprovante } from '@/components/ModalComprovante';
import { Cobranca } from '@/types/pagamento';
import {
  TrendingUp,
  ShoppingBag,
  Coins,
  QrCode,
  CreditCard,
  ChevronRight,
  RotateCcw,
  Trash2,
  ReceiptText,
} from 'lucide-react-native';

export default function TelaHistorico() {
  const {
    cobrancas,
    totalVendidoHoje,
    totalVendasRealizadas,
    ticketMedioHoje,
    restaurarDadosExemplo,
    limparHistorico,
  } = usePayment();

  const [filtro, setFiltro] = useState<'TODOS' | 'PAGO' | 'PENDENTE'>('TODOS');
  const [cobrancaSelecionada, setCobrancaSelecionada] = useState<Cobranca | null>(null);
  const [modalComprovanteVisivel, setModalComprovanteVisivel] = useState<boolean>(false);

  const cobrancasFiltradas = cobrancas.filter((item) => {
    if (filtro === 'TODOS') return true;
    return item.status === filtro;
  });

  const abrirDetalheVenda = (item: Cobranca) => {
    if (item.status === 'PAGO' && item.comprovante) {
      setCobrancaSelecionada(item);
      setModalComprovanteVisivel(true);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        {/* Cabeçalho */}
        <View style={styles.cabecalho}>
          <View>
            <Text style={styles.titulo}>Painel de Vendas</Text>
            <Text style={styles.subtitulo}>Acompanhe o faturamento em tempo real</Text>
          </View>
          <TouchableOpacity
            style={styles.botaoReset}
            onPress={restaurarDadosExemplo}
            activeOpacity={0.7}>
            <RotateCcw size={16} color={Paleta.textoSecundario} />
          </TouchableOpacity>
        </View>

        {/* Cards de Métricas do Dia */}
        <View style={styles.gradeMetricas}>
          <View style={[styles.cardMetrica, styles.cardFaturamento]}>
            <View style={styles.topoCardMetrica}>
              <Text style={styles.labelMetrica}>FATURAMENTO HOJE</Text>
              <TrendingUp size={16} color={Paleta.primaria} />
            </View>
            <Text style={styles.valorMetricaPrincipal}>{formatarMoeda(totalVendidoHoje)}</Text>
            <Text style={styles.subMetrica}>Liquidação instantânea via Pix</Text>
          </View>

          <View style={styles.linhaMetricasDupla}>
            <View style={styles.cardMetricaPequeno}>
              <View style={styles.topoCardMetrica}>
                <Text style={styles.labelMetrica}>VENDAS</Text>
                <ShoppingBag size={14} color={Paleta.azulBancario} />
              </View>
              <Text style={styles.valorMetricaSecundario}>{totalVendasRealizadas}</Text>
              <Text style={styles.subMetrica}>Transações</Text>
            </View>

            <View style={styles.cardMetricaPequeno}>
              <View style={styles.topoCardMetrica}>
                <Text style={styles.labelMetrica}>TICKET MÉDIO</Text>
                <Coins size={14} color={Paleta.atencao} />
              </View>
              <Text style={styles.valorMetricaSecundario}>{formatarMoeda(ticketMedioHoje)}</Text>
              <Text style={styles.subMetrica}>Por transação</Text>
            </View>
          </View>
        </View>

        {/* Filtros de Vendas */}
        <View style={styles.secaoLista}>
          <View style={styles.barraFiltros}>
            <TouchableOpacity
              style={[styles.filtroBotao, filtro === 'TODOS' && styles.filtroAtivo]}
              onPress={() => setFiltro('TODOS')}
              activeOpacity={0.7}>
              <Text
                style={[
                  styles.textoFiltro,
                  filtro === 'TODOS' && styles.textoFiltroAtivo,
                ]}>
                Todas ({cobrancas.length})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.filtroBotao, filtro === 'PAGO' && styles.filtroAtivo]}
              onPress={() => setFiltro('PAGO')}
              activeOpacity={0.7}>
              <Text
                style={[
                  styles.textoFiltro,
                  filtro === 'PAGO' && styles.textoFiltroAtivo,
                ]}>
                Pagas ({cobrancas.filter((c) => c.status === 'PAGO').length})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.filtroBotao, filtro === 'PENDENTE' && styles.filtroAtivo]}
              onPress={() => setFiltro('PENDENTE')}
              activeOpacity={0.7}>
              <Text
                style={[
                  styles.textoFiltro,
                  filtro === 'PENDENTE' && styles.textoFiltroAtivo,
                ]}>
                Pendentes ({cobrancas.filter((c) => c.status === 'PENDENTE').length})
              </Text>
            </TouchableOpacity>
          </View>

          {/* Lista de Transações */}
          {cobrancasFiltradas.length > 0 ? (
            <View style={styles.listaContainer}>
              {cobrancasFiltradas.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.cardTransacao}
                  onPress={() => abrirDetalheVenda(item)}
                  activeOpacity={item.status === 'PAGO' ? 0.7 : 1}>
                  <View style={styles.ladoEsquerdoTransacao}>
                    <View
                      style={[
                        styles.iconeMetodo,
                        item.status === 'PAGO' ? styles.iconePago : styles.iconePendente,
                      ]}>
                      {item.metodo === 'PIX' ? (
                        <QrCode
                          size={18}
                          color={item.status === 'PAGO' ? Paleta.primaria : Paleta.atencao}
                        />
                      ) : (
                        <CreditCard
                          size={18}
                          color={item.status === 'PAGO' ? Paleta.primaria : Paleta.atencao}
                        />
                      )}
                    </View>

                    <View style={styles.detalhesTransacao}>
                      <Text style={styles.descricaoTransacao} numberOfLines={1}>
                        {item.descricao}
                      </Text>
                      <Text style={styles.dataTransacao}>
                        {formatarDataHora(item.pagoEm || item.criadoEm)} • {item.id}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.ladoDireitoTransacao}>
                    <Text
                      style={[
                        styles.valorTransacao,
                        item.status === 'PAGO' && styles.valorPago,
                      ]}>
                      {formatarMoeda(item.valor)}
                    </Text>
                    <View style={styles.badgeWrapper}>
                      <BadgeStatus status={item.status} tamanho="pequeno" />
                      {item.status === 'PAGO' && (
                        <ChevronRight size={14} color={Paleta.textoMutado} />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.vazioContainer}>
              <ReceiptText size={36} color={Paleta.textoMutado} />
              <Text style={styles.vazioTexto}>Nenhuma transação encontrada</Text>
            </View>
          )}
        </View>

        {/* Rodapé de Ações */}
        <View style={styles.rodapeAcoes}>
          <TouchableOpacity
            style={styles.botaoLimparTudo}
            onPress={limparHistorico}
            activeOpacity={0.7}>
            <Trash2 size={14} color={Paleta.textoSecundario} />
            <Text style={styles.textoLimparTudo}>Limpar Histórico</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal de Comprovante */}
      <ModalComprovante
        visivel={modalComprovanteVisivel}
        cobranca={cobrancaSelecionada}
        onFechar={() => setModalComprovanteVisivel(false)}
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
    paddingBottom: 36,
  },
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '800',
    color: Paleta.textoPrincipal,
  },
  subtitulo: {
    fontSize: 13,
    color: Paleta.textoSecundario,
    marginTop: 2,
  },
  botaoReset: {
    backgroundColor: Paleta.cinzaCard,
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Paleta.cinzaBorda,
  },
  gradeMetricas: {
    gap: 12,
    marginBottom: 24,
  },
  cardMetrica: {
    backgroundColor: Paleta.cinzaCard,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: Paleta.cinzaBorda,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardFaturamento: {
    borderLeftWidth: 4,
    borderLeftColor: Paleta.primaria,
  },
  linhaMetricasDupla: {
    flexDirection: 'row',
    gap: 12,
  },
  cardMetricaPequeno: {
    flex: 1,
    backgroundColor: Paleta.cinzaCard,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Paleta.cinzaBorda,
  },
  topoCardMetrica: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  labelMetrica: {
    fontSize: 11,
    fontWeight: '700',
    color: Paleta.textoSecundario,
    letterSpacing: 0.5,
  },
  valorMetricaPrincipal: {
    fontSize: 30,
    fontWeight: '800',
    color: Paleta.primaria,
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  valorMetricaSecundario: {
    fontSize: 20,
    fontWeight: '800',
    color: Paleta.textoPrincipal,
    marginBottom: 2,
  },
  subMetrica: {
    fontSize: 12,
    color: Paleta.textoMutado,
  },
  secaoLista: {
    marginBottom: 20,
  },
  barraFiltros: {
    flexDirection: 'row',
    backgroundColor: Paleta.cinzaSuave,
    padding: 4,
    borderRadius: 12,
    marginBottom: 14,
  },
  filtroBotao: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  filtroAtivo: {
    backgroundColor: Paleta.cinzaCard,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  textoFiltro: {
    fontSize: 12,
    fontWeight: '600',
    color: Paleta.textoSecundario,
  },
  textoFiltroAtivo: {
    color: Paleta.textoPrincipal,
    fontWeight: '700',
  },
  listaContainer: {
    gap: 10,
  },
  cardTransacao: {
    backgroundColor: Paleta.cinzaCard,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Paleta.cinzaBorda,
  },
  ladoEsquerdoTransacao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconeMetodo: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconePago: {
    backgroundColor: Paleta.primariaClara,
  },
  iconePendente: {
    backgroundColor: Paleta.atencaoFundo,
  },
  detalhesTransacao: {
    flex: 1,
  },
  descricaoTransacao: {
    fontSize: 14,
    fontWeight: '700',
    color: Paleta.textoPrincipal,
  },
  dataTransacao: {
    fontSize: 11,
    color: Paleta.textoMutado,
    marginTop: 2,
  },
  ladoDireitoTransacao: {
    alignItems: 'flex-end',
    gap: 4,
  },
  valorTransacao: {
    fontSize: 15,
    fontWeight: '700',
    color: Paleta.textoPrincipal,
  },
  valorPago: {
    color: Paleta.primariaEscura,
  },
  badgeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  vazioContainer: {
    backgroundColor: Paleta.cinzaCard,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Paleta.cinzaBorda,
    gap: 8,
  },
  vazioTexto: {
    fontSize: 13,
    color: Paleta.textoSecundario,
  },
  rodapeAcoes: {
    alignItems: 'center',
    marginTop: 10,
  },
  botaoLimparTudo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  textoLimparTudo: {
    fontSize: 12,
    color: Paleta.textoSecundario,
    fontWeight: '600',
  },
});
