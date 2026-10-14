import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronRight, DollarSign } from 'lucide-react-native';
import { Paleta } from '@/constants/Colors';

interface BannerDinheiroAdicionalProps {
  onPress?: () => void;
}

export const BannerDinheiroAdicional: React.FC<BannerDinheiroAdicionalProps> = ({
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.banner}
      onPress={onPress}
      activeOpacity={0.75}
      accessibilityLabel="Dinheiro adicional — opções de crédito disponível"
    >
      {/* Ícone à esquerda */}
      <View style={styles.iconeContainer}>
        <DollarSign size={20} color={Paleta.primaria} strokeWidth={2.4} />
      </View>

      {/* Textos */}
      <View style={styles.textos}>
        <Text style={styles.titulo}>Dinheiro adicional</Text>
        <Text style={styles.subtitulo}>Opções de crédito disponível</Text>
      </View>

      {/* Chevron à direita */}
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
    backgroundColor: Paleta.primariaClara,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Paleta.primariaBorda,
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
});
