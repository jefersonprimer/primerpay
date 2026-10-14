import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { formatarMoeda } from '@/utils/formatters';
import { Crown, CreditCard, Landmark, Zap, Banknote } from 'lucide-react-native';

interface CartaoDinheiroProps {
  creditoDisponivel?: number;
  limiteTotal?: number;
  onCartaoCredito?: () => void;
  onEmprestimo?: () => void;
  onAnteciparRecebiveis?: () => void;
}

export const CartaoDinheiro: React.FC<CartaoDinheiroProps> = ({
  creditoDisponivel = 8500,
  limiteTotal = 10000,
  onCartaoCredito,
  onEmprestimo,
  onAnteciparRecebiveis,
}) => {
  const emBreve = (nome: string) =>
    Alert.alert(nome, 'Recurso demonstrativo (MVP) — em breve!');

  const usado = Math.max(limiteTotal - creditoDisponivel, 0);
  const percentual = limiteTotal > 0 ? Math.min((usado / limiteTotal) * 100, 100) : 0;

  const opcoes = [
    {
      chave: 'cartao',
      rotulo: 'Cartão de crédito',
      Icone: CreditCard,
      acao: onCartaoCredito ?? (() => emBreve('Cartão de crédito')),
    },
    {
      chave: 'emprestimo',
      rotulo: 'Empréstimo',
      Icone: Landmark,
      acao: onEmprestimo ?? (() => emBreve('Empréstimo')),
    },
    {
      chave: 'antecipar',
      rotulo: 'Antecipar recebíveis',
      Icone: Zap,
      acao: onAnteciparRecebiveis ?? (() => emBreve('Antecipar recebíveis')),
    },
  ];

  return (
    <View style={styles.card}>
      <LinearGradient
        colors={['#0F172A', '#1B0F3B', '#2A1260']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradiente}>
        {/* Brilho decorativo premium */}
        <View style={styles.brilhoTopo} />
        <View style={styles.brilhoBase} />

        {/* Cabeçalho */}
        <View style={styles.topo}>
          <View style={styles.iconeDinheiro}>
            <Banknote size={18} color="#A78BFA" strokeWidth={2.2} />
          </View>
          <View style={styles.tituloWrap}>
            <Text style={styles.titulo}>Dinheiro</Text>
            <Text style={styles.subtitulo}>Crédito e limites</Text>
          </View>
          <View style={styles.badgePremium}>
            <Crown size={10} color="#FDE68A" strokeWidth={2.6} />
            <Text style={styles.textoPremium}>PREMIUM</Text>
          </View>
        </View>

        {/* Crédito disponível */}
        <Text style={styles.labelCredito}>CRÉDITO DISPONÍVEL</Text>
        <Text style={styles.valorCredito}>{formatarMoeda(creditoDisponivel)}</Text>

        {/* Barra de uso do limite */}
        <View style={styles.areaProgresso}>
          <View style={styles.trilhaProgresso}>
            <View style={[styles.barraProgresso, { width: `${percentual}%` }]} />
          </View>
          <Text style={styles.textoLimite}>
            {formatarMoeda(usado)} usados de {formatarMoeda(limiteTotal)}
          </Text>
        </View>

        {/* Opções de crédito */}
        <View style={styles.linhaOpcoes}>
          {opcoes.map(({ chave, rotulo, Icone, acao }) => (
            <TouchableOpacity
              key={chave}
              style={styles.opcao}
              onPress={acao}
              activeOpacity={0.7}
              accessibilityLabel={rotulo}>
              <View style={styles.iconeOpcao}>
                <Icone size={17} color="#A78BFA" strokeWidth={2.2} />
              </View>
              <Text style={styles.textoOpcao} numberOfLines={2}>
                {rotulo}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
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
  gradiente: {
    padding: 18,
    position: 'relative',
  },
  brilhoTopo: {
    position: 'absolute',
    top: -60,
    right: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(97, 35, 226, 0.25)',
  },
  brilhoBase: {
    position: 'absolute',
    bottom: -70,
    left: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(167, 139, 250, 0.12)',
  },
  topo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  iconeDinheiro: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: 'rgba(167, 139, 250, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(167, 139, 250, 0.3)',
  },
  tituloWrap: {
    flex: 1,
  },
  titulo: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  subtitulo: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 1,
  },
  badgePremium: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(253, 230, 138, 0.12)',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(253, 230, 138, 0.35)',
  },
  textoPremium: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FDE68A',
    letterSpacing: 0.8,
  },
  labelCredito: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 1,
    marginBottom: 4,
  },
  valorCredito: {
    fontSize: 34,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1,
    marginBottom: 14,
  },
  areaProgresso: {
    marginBottom: 16,
  },
  trilhaProgresso: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    marginBottom: 8,
  },
  barraProgresso: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: '#A78BFA',
  },
  textoLimite: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
  },
  linhaOpcoes: {
    flexDirection: 'row',
    gap: 8,
  },
  opcao: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 6,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  iconeOpcao: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: 'rgba(167, 139, 250, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(167, 139, 250, 0.28)',
  },
  textoOpcao: {
    fontSize: 11,
    fontWeight: '600',
    color: '#E2E8F0',
    textAlign: 'center',
    lineHeight: 14,
  },
});
