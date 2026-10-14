import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Paleta } from '@/constants/Colors';
import { Delete } from 'lucide-react-native';

interface TecladoPOSProps {
  onDigitarNumero: (num: string) => void;
  onApagar: () => void;
  onAdicionarRapido: (centavosAdicionais: number) => void;
  onLimpar: () => void;
}

export const TecladoPOS: React.FC<TecladoPOSProps> = ({
  onDigitarNumero,
  onApagar,
  onAdicionarRapido,
  onLimpar,
}) => {
  const botoesNumericos = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['C', '0', 'DEL'],
  ];

  return (
    <View style={styles.container}>
      {/* Botões de atalho rápido */}
      <View style={styles.linhaAtalhos}>
        <TouchableOpacity
          style={styles.botaoAtalho}
          onPress={() => onAdicionarRapido(500)}
          activeOpacity={0.7}>
          <Text style={styles.textoAtalho}>+ R$ 5</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoAtalho}
          onPress={() => onAdicionarRapido(1000)}
          activeOpacity={0.7}>
          <Text style={styles.textoAtalho}>+ R$ 10</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoAtalho}
          onPress={() => onAdicionarRapido(5000)}
          activeOpacity={0.7}>
          <Text style={styles.textoAtalho}>+ R$ 50</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botaoAtalho, styles.botaoLimpar]}
          onPress={onLimpar}
          activeOpacity={0.7}>
          <Text style={[styles.textoAtalho, styles.textoLimpar]}>Zerar</Text>
        </TouchableOpacity>
      </View>

      {/* Grade numérica */}
      <View style={styles.grade}>
        {botoesNumericos.map((linha, indexLinha) => (
          <View key={`linha-${indexLinha}`} style={styles.linha}>
            {linha.map((item) => {
              if (item === 'DEL') {
                return (
                  <TouchableOpacity
                    key={item}
                    style={[styles.tecla, styles.teclaAcao]}
                    onPress={onApagar}
                    activeOpacity={0.6}>
                    <Delete size={22} color={Paleta.textoSecundario} />
                  </TouchableOpacity>
                );
              }

              if (item === 'C') {
                return (
                  <TouchableOpacity
                    key={item}
                    style={[styles.tecla, styles.teclaAcao]}
                    onPress={onLimpar}
                    activeOpacity={0.6}>
                    <Text style={styles.textoTeclaAcao}>C</Text>
                  </TouchableOpacity>
                );
              }

              return (
                <TouchableOpacity
                  key={item}
                  style={styles.tecla}
                  onPress={() => onDigitarNumero(item)}
                  activeOpacity={0.6}>
                  <Text style={styles.textoTecla}>{item}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 6,
  },
  linhaAtalhos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 8,
  },
  botaoAtalho: {
    flex: 1,
    backgroundColor: Paleta.cinzaSuave,
    paddingVertical: 9,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Paleta.cinzaBorda,
  },
  botaoLimpar: {
    backgroundColor: '#FEE2E2',
    borderColor: '#FECACA',
  },
  textoAtalho: {
    fontSize: 13,
    fontWeight: '600',
    color: Paleta.textoPrincipal,
  },
  textoLimpar: {
    color: Paleta.erro,
  },
  grade: {
    gap: 8,
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  tecla: {
    flex: 1,
    backgroundColor: Paleta.cinzaCard,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Paleta.cinzaBorda,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  teclaAcao: {
    backgroundColor: Paleta.cinzaSuave,
  },
  textoTecla: {
    fontSize: 22,
    fontWeight: '600',
    color: Paleta.textoPrincipal,
  },
  textoTeclaAcao: {
    fontSize: 18,
    fontWeight: '700',
    color: Paleta.textoSecundario,
  },
});
