import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Paleta } from '@/constants/Colors';
import { QrCode, HandCoins, Smartphone } from 'lucide-react-native';

// Cor oficial da marca Pix (BCB)
const COR_PIX = '#32BCAD';

// Logo oficial do Pix (viewBox 0 0 24 24)
const CAMINHO_LOGO_PIX =
  'M5.283 18.36a3.505 3.505 0 0 0 2.493-1.032l3.6-3.6a.684.684 0 0 1 .946 0l3.613 3.613a3.504 3.504 0 0 0 2.493 1.032h.71l-4.56 4.56a3.647 3.647 0 0 1-5.156 0L4.85 18.36ZM18.428 5.627a3.505 3.505 0 0 0-2.493 1.032l-3.613 3.614a.67.67 0 0 1-.946 0l-3.6-3.6A3.505 3.505 0 0 0 5.283 5.64h-.434l4.573-4.572a3.646 3.646 0 0 1 5.156 0l4.559 4.559ZM1.068 9.422 3.79 6.699h1.492a2.483 2.483 0 0 1 1.744.722l3.6 3.6a1.73 1.73 0 0 0 2.443 0l3.614-3.613a2.482 2.482 0 0 1 1.744-.723h1.767l2.737 2.737a3.646 3.646 0 0 1 0 5.156l-2.736 2.736h-1.768a2.482 2.482 0 0 1-1.744-.722l-3.613-3.613a1.77 1.77 0 0 0-2.444 0l-3.6 3.6a2.483 2.483 0 0 1-1.744.722H3.791l-2.723-2.723a3.646 3.646 0 0 1 0-5.156';

interface AtalhosPixProps {
  areaPixAberta: boolean;
  onAlternarAreaPix: () => void;
  onPagar: () => void;
}

export const AtalhosPix: React.FC<AtalhosPixProps> = ({ areaPixAberta, onAlternarAreaPix, onPagar }) => {
  const emBreve = (nome: string) =>
    Alert.alert(nome, 'Recurso demonstrativo (MVP) — em breve!');

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.itemAtalho}
        onPress={onAlternarAreaPix}
        activeOpacity={0.7}
        accessibilityLabel="Abrir Área Pix e Transferir">
        <View style={[styles.iconeCaixa, areaPixAberta && styles.iconeCaixaAtivo]}>
          <Svg width={22} height={22} viewBox="0 0 24 24">
            <Path d={CAMINHO_LOGO_PIX} fill={COR_PIX} />
          </Svg>
        </View>
        <Text style={[styles.textoAtalho, areaPixAberta && styles.textoAtalhoAtivo]} numberOfLines={2}>
          Área Pix e{'\n'}Transferir
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.itemAtalho} onPress={onPagar} activeOpacity={0.7}>
        <View style={styles.iconeCaixa}>
          <QrCode size={22} color={Paleta.primaria} />
        </View>
        <Text style={styles.textoAtalho}>Pagar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.itemAtalho} onPress={() => emBreve('Pegar emprestado')} activeOpacity={0.7}>
        <View style={styles.iconeCaixa}>
          <HandCoins size={22} color={Paleta.primaria} />
        </View>
        <Text style={styles.textoAtalho} numberOfLines={2}>
          Pegar{'\n'}emprestado
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.itemAtalho} onPress={() => emBreve('Recarga de celular')} activeOpacity={0.7}>
        <View style={styles.iconeCaixa}>
          <Smartphone size={22} color={Paleta.primaria} />
        </View>
        <Text style={styles.textoAtalho} numberOfLines={2}>
          Recarga de{'\n'}celular
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Paleta.cinzaCard,
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Paleta.cinzaBorda,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  itemAtalho: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 2,
  },
  iconeCaixa: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: Paleta.cinzaSuave,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Paleta.cinzaBorda,
  },
  iconeCaixaAtivo: {
    backgroundColor: '#E6FFFB',
    borderColor: COR_PIX,
  },
  textoAtalho: {
    fontSize: 11,
    fontWeight: '600',
    color: Paleta.textoPrincipal,
    textAlign: 'center',
    lineHeight: 14,
  },
  textoAtalhoAtivo: {
    color: COR_PIX,
  },
});
