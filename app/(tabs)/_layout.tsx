import React from 'react';
import { Tabs } from 'expo-router';
import { Paleta } from '@/constants/Colors';
import { TabBarCustom } from '@/components/TabBarCustom';
import {
  House,
  CreditCard,
  HandCoins,
  ShoppingBag,
  Menu,
  Smartphone,
  BarChart3,
} from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBarCustom {...props} />}
      screenOptions={{
        tabBarActiveTintColor: Paleta.primaria,
        tabBarInactiveTintColor: Paleta.textoMutado,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        headerStyle: {
          backgroundColor: Paleta.cinzaFundo,
        },
        headerTitleStyle: {
          fontWeight: '700',
          color: Paleta.textoPrincipal,
        },
        headerShadowVisible: false,
        sceneStyle: {
          backgroundColor: Paleta.cinzaFundo,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <House size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="cartao"
        options={{
          title: 'Cartão',
          headerTitle: 'Meu Cartão',
          tabBarIcon: ({ color }) => <CreditCard size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="emprestimo"
        options={{
          title: 'Empréstimo',
          headerTitle: 'Empréstimo',
          tabBarIcon: ({ color }) => <HandCoins size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: 'Shop',
          headerTitle: 'Shop',
          tabBarIcon: ({ color }) => <ShoppingBag size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          headerTitle: 'Menu',
          tabBarIcon: ({ color }) => <Menu size={22} color={color} />,
        }}
      />
      {/* Telas fora da tab bar — acessíveis via Home/Menu */}
      <Tabs.Screen
        name="cliente"
        options={{
          title: 'Pagar (Cliente)',
          headerTitle: 'PrimerBank • Pagamento Pix',
          tabBarIcon: ({ color }) => <Smartphone size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="historico"
        options={{
          title: 'Histórico',
          headerTitle: 'Painel de Vendas',
          tabBarIcon: ({ color }) => <BarChart3 size={22} color={color} />,
        }}
      />
    </Tabs>
  );
}
