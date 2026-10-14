import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Paleta } from '@/constants/Colors';
import { formatarMoeda } from '@/utils/formatters';
import { CreditCard, Nfc, Lock, FileText, ChevronRight, Sparkles } from 'lucide-react-native';

const emBreve = (nome: string) => Alert.alert(nome, 'Recurso demonstrativo (MVP) — em breve!');

const AJUSTES = [
  { chave: 'limite', rotulo: 'Ajustar limite', detalhe: 'R$ 10.000,00', Icone: Sparkles },
  { chave: 'extrato', rotulo: 'Extrato do cartão', detalhe: 'Últimos 90 dias', Icone: FileText },
  { chave: 'bloqueio', rotulo: 'Bloquear cartão', detalhe: 'Acesso imediato', Icone: Lock },
  { chave: 'contactless', rotulo: 'Pagamento por aproximação', detalhe: 'Ativado', Icone: Nfc },
];

export default function TelaCartao() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        {/* Cartão físico (visual) */}
        <View style={styles.cartao}>
          <View style={styles.brilhoCartao} />
          <View style={styles.topoCartao}>
            <View>
              <Text style={styles.nomeCartao}>PrimerPay</Text>
              <Text style={styles.tipoCartao}>Business • Débito</Text>
            </View>
            <CreditCard size={22} color="#A78BFA" strokeWidth={2.2} />
          </View>

          <Text style={styles.numeroCartao}>•••• •••• •••• 4821</Text>

          <View style={styles.rodapeCartao}>
            <View>
              <Text style={styles.labelCartao}>TITULAR</Text>
              <Text style={styles.valorCartao}>PRIMER CAFE & BISTRO</Text>
            </View>
            <View>
              <Text style={styles.labelCartao}>VALIDADE</Text>
              <Text style={styles.valorCartao}>12/30</Text>
            </View>
          </View>
        </View>

        {/* Fatura atual */}
        <View style={styles.cardFatura}>
          <View style={styles.topoFatura}>
            <Text style={styles.labelFatura}>FATURA ATUAL</Text>
            <View style={styles.badgePago}>
              <Text style={styles.textoPago}>EM DIA</Text>
            </View>
          </View>
          <Text style={styles.valorFatura}>{formatarMoeda(0)}</Text>
          <Text style={styles.subFatura}>Fechamento em 25/10 • Vencimento em 02/11</Text>
        </View>

        {/* Ajustes do cartão */}
        <Text style={styles.tituloSecao}>AJUSTES DO CARTÃO</Text>
        <View style={styles.cardAjustes}>
          {AJUSTES.map(({ chave, rotulo, detalhe, Icone }, indice) => (
            <TouchableOpacity
              key={chave}
              style={[styles.linhaAjuste, indice < AJUSTES.length - 1 && styles.linhaBorda]}
              onPress={() => emBreve(rotulo)}
              activeOpacity={0.7}
              accessibilityLabel={rotulo}>
              <View style={styles.iconeLinha}>
                <Icone size={16} color={Paleta.primaria} />
              </View>
              <View style={styles.textoLinha}>
                <Text style={styles.rotuloLinha}>{rotulo}</Text>
                <Text style={styles.detalheLinha}>{detalhe}</Text>
              </View>
              <ChevronRight size={16} color={Paleta.textoMutado} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
  cartao: {
    backgroundColor: '#0F172A',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#1E293B',
    overflow: 'hidden',
    shadowColor: '#6123E2',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 6,
  },
  brilhoCartao: {
    position: 'absolute',
    top: -70,
    right: -50,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(97, 35, 226, 0.16)',
  },
  topoCartao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 26,
  },
  nomeCartao: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  tipoCartao: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  numeroCartao: {
    fontSize: 20,
    fontWeight: '700',
    color: '#E2E8F0',
    letterSpacing: 3,
    marginBottom: 22,
  },
  rodapeCartao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  labelCartao: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 1,
    marginBottom: 3,
  },
  valorCartao: {
    fontSize: 12,
    fontWeight: '700',
    color: '#E2E8F0',
    letterSpacing: 0.5,
  },
  cardFatura: {
    backgroundColor: Paleta.cinzaCard,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Paleta.cinzaBorda,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  topoFatura: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  labelFatura: {
    fontSize: 11,
    fontWeight: '700',
    color: Paleta.textoSecundario,
    letterSpacing: 0.8,
  },
  badgePago: {
    backgroundColor: Paleta.sucessoFundo,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Paleta.primariaBorda,
  },
  textoPago: {
    fontSize: 10,
    fontWeight: '800',
    color: Paleta.primariaEscura,
    letterSpacing: 0.5,
  },
  valorFatura: {
    fontSize: 30,
    fontWeight: '800',
    color: Paleta.textoPrincipal,
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  subFatura: {
    fontSize: 12,
    color: Paleta.textoMutado,
  },
  tituloSecao: {
    fontSize: 11,
    fontWeight: '700',
    color: Paleta.textoSecundario,
    letterSpacing: 1,
    marginBottom: 10,
  },
  cardAjustes: {
    backgroundColor: Paleta.cinzaCard,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Paleta.cinzaBorda,
    overflow: 'hidden',
  },
  linhaAjuste: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
  },
  linhaBorda: {
    borderBottomWidth: 1,
    borderBottomColor: Paleta.cinzaBorda,
  },
  iconeLinha: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: Paleta.primariaClara,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Paleta.primariaBorda,
  },
  textoLinha: {
    flex: 1,
  },
  rotuloLinha: {
    fontSize: 14,
    fontWeight: '700',
    color: Paleta.textoPrincipal,
  },
  detalheLinha: {
    fontSize: 12,
    color: Paleta.textoMutado,
    marginTop: 2,
  },
});
