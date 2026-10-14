import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusPagamento } from '@/types/pagamento';
import { Paleta } from '@/constants/Colors';
import { CheckCircle2, Clock, XCircle } from 'lucide-react-native';

interface BadgeStatusProps {
  status: StatusPagamento;
  tamanho?: 'pequeno' | 'normal';
}

export const BadgeStatus: React.FC<BadgeStatusProps> = ({ status, tamanho = 'normal' }) => {
  const isPequeno = tamanho === 'pequeno';
  const iconSize = isPequeno ? 12 : 14;

  let bg = Paleta.sucessoFundo;
  let cor = Paleta.sucesso;
  let texto = 'Pago';
  let Icone = CheckCircle2;

  if (status === 'PENDENTE') {
    bg = Paleta.atencaoFundo;
    cor = Paleta.atencao;
    texto = 'Aguardando';
    Icone = Clock;
  } else if (status === 'CANCELADO') {
    bg = Paleta.erroFundo;
    cor = Paleta.erro;
    texto = 'Cancelado';
    Icone = XCircle;
  }

  return (
    <View style={[styles.badge, { backgroundColor: bg }, isPequeno && styles.badgePequeno]}>
      <Icone size={iconSize} color={cor} strokeWidth={2.4} style={styles.icone} />
      <Text style={[styles.texto, { color: cor }, isPequeno && styles.textoPequeno]}>{texto}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  badgePequeno: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 12,
  },
  icone: {
    marginRight: 5,
  },
  texto: {
    fontSize: 12,
    fontWeight: '700',
  },
  textoPequeno: {
    fontSize: 11,
    fontWeight: '600',
  },
});
