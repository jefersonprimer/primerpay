import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import type { BottomTabBarProps } from 'expo-router/build/react-navigation/bottom-tabs';
import { Paleta } from '@/constants/Colors';

const ROTAS_VISIVEIS = ['index', 'cartao', 'emprestimo', 'shop', 'menu'];

export const TabBarCustom: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
  insets,
}) => {
  const rotas = state.routes.filter((rota) => ROTAS_VISIVEIS.includes(rota.name));

  const aoPressionar = (rota: (typeof state.routes)[number], focada: boolean) => {
    const evento = navigation.emit({
      type: 'tabPress',
      target: rota.key,
      canPreventDefault: true,
    });

    if (!focada && !evento.defaultPrevented) {
      navigation.navigate(rota.name, rota.params);
    }
  };

  const aoPressionarLongo = (rota: (typeof state.routes)[number]) => {
    navigation.emit({ type: 'tabLongPress', target: rota.key });
  };

  return (
    <View
      style={[styles.barra, { paddingBottom: Math.max(insets.bottom, 10) }]}
      accessibilityRole="tablist">
      {rotas.map((rota) => {
        const opcoes = descriptors[rota.key].options;
        const focada = rota.key === state.routes[state.index]?.key;
        const rotulo =
          typeof opcoes.tabBarLabel === 'string'
            ? opcoes.tabBarLabel
            : opcoes.title ?? rota.name;
        const cor = focada ? '#FFFFFF' : Paleta.textoMutado;

        return (
          <Pressable
            key={rota.key}
            style={focada ? styles.itemAtivo : styles.item}
            onPress={() => aoPressionar(rota, focada)}
            onLongPress={() => aoPressionarLongo(rota)}
            accessibilityRole="tab"
            accessibilityState={focada ? { selected: true } : {}}
            accessibilityLabel={opcoes.tabBarAccessibilityLabel ?? rotulo}
            accessibilityHint={rotulo}>
            {focada ? (
              <View style={styles.pillAtivo}>
                {opcoes.tabBarIcon?.({ focused: true, color: cor, size: 22 })}
              </View>
            ) : (
              <>
                {opcoes.tabBarIcon?.({ focused: false, color: cor, size: 22 })}
                <Text style={styles.rotulo} numberOfLines={1}>
                  {rotulo}
                </Text>
              </>
            )}
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  barra: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 10,
    paddingHorizontal: 6,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 12,
  },
  item: {
    flex: 1,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  itemAtivo: {
    flex: 1,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillAtivo: {
    width: 56,
    height: 56,
    borderRadius: 9999,
    backgroundColor: Paleta.primaria,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Paleta.primaria,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  rotulo: {
    fontSize: 10,
    fontWeight: '600',
    color: Paleta.textoMutado,
    letterSpacing: 0.2,
  },
});
