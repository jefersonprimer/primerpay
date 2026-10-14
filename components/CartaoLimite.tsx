import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import {
  ChevronRight,
  CreditCard,
  TrendingUp,
  FileText,
  Gauge,
  Layers,
} from 'lucide-react-native';
import { Paleta } from '@/constants/Colors';
import { formatarMoeda } from '@/utils/formatters';

interface CartaoLimiteProps {
  faturaAtual?: number;
  limiteDisponivel?: number;
  onConstruirLimite?: () => void;
  onFaturaAtual?: () => void;
  onLimiteDisponivel?: () => void;
  onMeusCartoes?: () => void;
}

export const CartaoLimite: React.FC<CartaoLimiteProps> = ({
  faturaAtual = 347.9,
  limiteDisponivel = 8500,
  onConstruirLimite,
  onFaturaAtual,
  onLimiteDisponivel,
  onMeusCartoes,
}) => {
  const emBreve = (nome: string) =>
    Alert.alert(nome, 'Recurso demonstrativo (MVP) — em breve!');

  const opcoes = [
    {
      chave: 'construir',
      rotulo: 'Construir limite',
      Icone: TrendingUp,
      corIcone: '#6123E2',
      corFundo: '#EDE9FE',
      corBorda: '#DDD6FE',
      valor: null,
      acao: onConstruirLimite ?? (() => emBreve('Construir limite')),
    },
    {
      chave: 'fatura',
      rotulo: 'Fatura atual',
      Icone: FileText,
      corIcone: '#DC2626',
      corFundo: '#FEE2E2',
      corBorda: '#FECACA',
      valor: formatarMoeda(faturaAtual),
      acao: onFaturaAtual ?? (() => emBreve('Fatura atual')),
    },
    {
      chave: 'limite',
      rotulo: 'Limite disponível',
      Icone: Gauge,
      corIcone: '#059669',
      corFundo: '#D1FAE5',
      corBorda: '#A7F3D0',
      valor: formatarMoeda(limiteDisponivel),
      acao: onLimiteDisponivel ?? (() => emBreve('Limite disponível')),
    },
    {
      chave: 'cartoes',
      rotulo: 'Meus cartões',
      Icone: Layers,
      corIcone: '#2563EB',
      corFundo: '#EFF6FF',
      corBorda: '#BFDBFE',
      valor: null,
      acao: onMeusCartoes ?? (() => emBreve('Meus cartões')),
    },
  ];

  return (
    <View style={styles.card}>
      {/* Cabeçalho */}
      <View style={styles.cabecalho}>
        <View style={styles.iconeCartao}>
          <CreditCard size={18} color={Paleta.primaria} strokeWidth={2.2} />
        </View>
        <Text style={styles.tituloCabecalho}>Cartão de crédito</Text>
      </View>

      {/* Opções */}
      <View style={styles.listaOpcoes}>
        {opcoes.map(({ chave, rotulo, Icone, corIcone, corFundo, corBorda, valor, acao }, index) => (
          <TouchableOpacity
            key={chave}
            style={[
              styles.opcao,
              index < opcoes.length - 1 && styles.opcaoBorda,
            ]}
            onPress={acao}
            activeOpacity={0.7}
            accessibilityLabel={rotulo}
          >
            <View
              style={[
                styles.iconeOpcao,
                { backgroundColor: corFundo, borderColor: corBorda },
              ]}
            >
              <Icone size={18} color={corIcone} strokeWidth={2.2} />
            </View>

            <View style={styles.textoOpcao}>
              <Text style={styles.rotuloOpcao}>{rotulo}</Text>
              {valor && <Text style={styles.valorOpcao}>{valor}</Text>}
            </View>

            <ChevronRight size={18} color={Paleta.textoMutado} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Paleta.cinzaCard,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Paleta.cinzaBorda,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  iconeCartao: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: Paleta.primariaClara,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Paleta.primariaBorda,
  },
  tituloCabecalho: {
    fontSize: 15,
    fontWeight: '700',
    color: Paleta.textoPrincipal,
  },
  listaOpcoes: {
    gap: 0,
  },
  opcao: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  opcaoBorda: {
    borderBottomWidth: 1,
    borderBottomColor: Paleta.cinzaBorda,
  },
  iconeOpcao: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  textoOpcao: {
    flex: 1,
  },
  rotuloOpcao: {
    fontSize: 14,
    fontWeight: '600',
    color: Paleta.textoPrincipal,
  },
  valorOpcao: {
    fontSize: 12,
    fontWeight: '500',
    color: Paleta.textoSecundario,
    marginTop: 1,
  },
});
