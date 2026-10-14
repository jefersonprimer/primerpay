import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronRight, CalendarClock } from 'lucide-react-native';
import { Paleta } from '@/constants/Colors';

interface BannerProximoPagamentoProps {
  diaSemana?: string;
  data?: string;
  onPress?: () => void;
}

export const BannerProximoPagamento: React.FC<BannerProximoPagamentoProps> = ({
  diaSemana = 'Sexta-feira',
  data = '09 de setembro',
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.banner}
      onPress={onPress}
      activeOpacity={0.75}
      accessibilityLabel="Próximo pagamento"
    >
      {/* Ícone */}
      <View style={styles.iconeContainer}>
        <CalendarClock size={20} color="#2563EB" strokeWidth={2.2} />
      </View>

      {/* Textos */}
      <View style={styles.textos}>
        <Text style={styles.titulo}>Próximo pagamento</Text>
        <Text style={styles.subtitulo}>
          {diaSemana},{' '}
          <Text style={styles.dataDestaque}>{data}</Text>
        </Text>
      </View>

      {/* Chevron */}
      <ChevronRight size={20} color={Paleta.textoMutado} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Paleta.cinzaCard,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Paleta.cinzaBorda,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    gap: 12,
  },
  iconeContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  textos: {
    flex: 1,
  },
  titulo: {
    fontSize: 15,
    fontWeight: '700',
    color: Paleta.textoPrincipal,
  },
  subtitulo: {
    fontSize: 12,
    fontWeight: '500',
    color: Paleta.textoSecundario,
    marginTop: 2,
  },
  dataDestaque: {
    fontWeight: '700',
    color: Paleta.textoPrincipal,
  },
});
