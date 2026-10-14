import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Paleta } from '@/constants/Colors';
import { formatarMoeda } from '@/utils/formatters';
import {
  HandCoins,
  Zap,
  ShieldCheck,
  CalendarClock,
  ChevronRight,
} from 'lucide-react-native';

const emBreve = (nome: string) => Alert.alert(nome, 'Recurso demonstrativo (MVP) — em breve!');

const VANTAGENS = [
  { chave: 'imediata', rotulo: 'Aprovação imediata', detalhe: 'Análise em segundos', Icone: Zap },
  {
    chave: 'garantia',
    rotulo: 'Sem garantia',
    detalhe: 'Apenas recebíveis Pix',
    Icone: ShieldCheck,
  },
  {
    chave: 'parcelas',
    rotulo: 'Até 12x',
    detalhe: 'Parcelas no recebível',
    Icone: CalendarClock,
  },
];

export default function TelaEmprestimo() {
  const limiteDisponivel = 12500;
  const limiteTotal = 20000;
  const usado = limiteTotal - limiteDisponivel;
  const percentual = Math.min((usado / limiteTotal) * 100, 100);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        {/* Crédito pré-aprovado */}
        <View style={styles.cardCredito}>
          <View style={styles.topoCredito}>
            <View style={styles.iconeCredito}>
              <HandCoins size={18} color={Paleta.primaria} strokeWidth={2.2} />
            </View>
            <Text style={styles.labelCredito}>CRÉDITO PRÉ-APROVADO</Text>
          </View>

          <Text style={styles.valorCredito}>{formatarMoeda(limiteDisponivel)}</Text>
          <Text style={styles.subCredito}>disponível para o seu negócio</Text>

          <View style={styles.areaProgresso}>
            <View style={styles.trilhaProgresso}>
              <View style={[styles.barraProgresso, { width: `${percentual}%` }]} />
            </View>
            <Text style={styles.textoLimite}>
              {formatarMoeda(usado)} utilizados de {formatarMoeda(limiteTotal)}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.botaoSimular}
            onPress={() => emBreve('Simular empréstimo')}
            activeOpacity={0.85}
            accessibilityLabel="Simular empréstimo">
            <Text style={styles.textoBotao}>Simular empréstimo</Text>
            <ChevronRight size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Vantagens */}
        <Text style={styles.tituloSecao}>POR QUE PEGAR AQUI</Text>
        <View style={styles.listaVantagens}>
          {VANTAGENS.map(({ chave, rotulo, detalhe, Icone }) => (
            <View key={chave} style={styles.cardVantagem}>
              <View style={styles.iconeVantagem}>
                <Icone size={16} color={Paleta.azulBancario} />
              </View>
              <View style={styles.textoVantagem}>
                <Text style={styles.rotuloVantagem}>{rotulo}</Text>
                <Text style={styles.detalheVantagem}>{detalhe}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Contratações */}
        <Text style={styles.tituloSecao}>MINHAS CONTRATAÇÕES</Text>
        <View style={styles.cardVazio}>
          <HandCoins size={32} color={Paleta.textoMutado} />
          <Text style={styles.textoVazio}>Nenhum empréstimo ativo</Text>
          <Text style={styles.subtextoVazio}>
            Simule agora e veja as parcelas antes de contratar.
          </Text>
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
  cardCredito: {
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
  topoCredito: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  iconeCredito: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: Paleta.primariaClara,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Paleta.primariaBorda,
  },
  labelCredito: {
    fontSize: 11,
    fontWeight: '700',
    color: Paleta.textoSecundario,
    letterSpacing: 1,
  },
  valorCredito: {
    fontSize: 34,
    fontWeight: '800',
    color: Paleta.primaria,
    letterSpacing: -1,
    marginBottom: 2,
  },
  subCredito: {
    fontSize: 13,
    color: Paleta.textoSecundario,
    marginBottom: 16,
  },
  areaProgresso: {
    marginBottom: 18,
  },
  trilhaProgresso: {
    height: 6,
    borderRadius: 3,
    backgroundColor: Paleta.cinzaSuave,
    overflow: 'hidden',
    marginBottom: 8,
  },
  barraProgresso: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: Paleta.primaria,
  },
  textoLimite: {
    fontSize: 12,
    color: Paleta.textoMutado,
    fontWeight: '500',
  },
  botaoSimular: {
    backgroundColor: Paleta.primaria,
    paddingVertical: 15,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: Paleta.primaria,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  tituloSecao: {
    fontSize: 11,
    fontWeight: '700',
    color: Paleta.textoSecundario,
    letterSpacing: 1,
    marginBottom: 10,
  },
  listaVantagens: {
    gap: 10,
    marginBottom: 20,
  },
  cardVantagem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Paleta.cinzaCard,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: Paleta.cinzaBorda,
  },
  iconeVantagem: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: Paleta.azulClaro,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Paleta.azulBorda,
  },
  textoVantagem: {
    flex: 1,
  },
  rotuloVantagem: {
    fontSize: 14,
    fontWeight: '700',
    color: Paleta.textoPrincipal,
  },
  detalheVantagem: {
    fontSize: 12,
    color: Paleta.textoMutado,
    marginTop: 2,
  },
  cardVazio: {
    backgroundColor: Paleta.cinzaCard,
    borderRadius: 16,
    padding: 28,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: Paleta.cinzaBorda,
  },
  textoVazio: {
    fontSize: 14,
    fontWeight: '700',
    color: Paleta.textoPrincipal,
  },
  subtextoVazio: {
    fontSize: 12,
    color: Paleta.textoSecundario,
    textAlign: 'center',
  },
});
