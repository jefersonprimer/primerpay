import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Paleta } from '@/constants/Colors';
import {
  User,
  BarChart3,
  Smartphone,
  Settings,
  CircleHelp,
  Info,
  LogOut,
  ChevronRight,
  Crown,
} from 'lucide-react-native';

const emBreve = (nome: string) => Alert.alert(nome, 'Recurso demonstrativo (MVP) — em breve!');

export default function TelaMenu() {
  const router = useRouter();

  const preferencias = [
    { chave: 'config', rotulo: 'Configurações', Icone: Settings, acao: () => emBreve('Configurações') },
    { chave: 'ajuda', rotulo: 'Ajuda e suporte', Icone: CircleHelp, acao: () => emBreve('Ajuda e suporte') },
    { chave: 'sobre', rotulo: 'Sobre o app', Icone: Info, acao: () => emBreve('Sobre o app') },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        {/* Perfil */}
        <View style={styles.cardPerfil}>
          <View style={styles.avatar}>
            <User size={22} color={Paleta.primaria} />
            <View style={styles.badgePremium}>
              <Crown size={9} color="#FFFFFF" />
            </View>
          </View>
          <View style={styles.infoPerfil}>
            <Text style={styles.nomePerfil}>PrimerPay Café & Bistrô</Text>
            <Text style={styles.emailPerfil}>comerciante@primerpay.com</Text>
          </View>
        </View>

        {/* Conta */}
        <Text style={styles.tituloSecao}>CONTA</Text>
        <View style={styles.cardSecao}>
          <TouchableOpacity
            style={styles.linha}
            onPress={() => router.push('/(tabs)/historico')}
            activeOpacity={0.7}
            accessibilityLabel="Histórico de vendas">
            <View style={styles.iconeLinha}>
              <BarChart3 size={16} color={Paleta.primaria} />
            </View>
            <View style={styles.textoLinha}>
              <Text style={styles.rotuloLinha}>Histórico de vendas</Text>
              <Text style={styles.detalheLinha}>Extrato e comprovantes</Text>
            </View>
            <ChevronRight size={16} color={Paleta.textoMutado} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.linha, styles.linhaBorda]}
            onPress={() => router.push('/(tabs)/cliente')}
            activeOpacity={0.7}
            accessibilityLabel="Pagamentos como cliente">
            <View style={styles.iconeLinha}>
              <Smartphone size={16} color={Paleta.primaria} />
            </View>
            <View style={styles.textoLinha}>
              <Text style={styles.rotuloLinha}>Pagar como cliente</Text>
              <Text style={styles.detalheLinha}>Simular Pix e cartão</Text>
            </View>
            <ChevronRight size={16} color={Paleta.textoMutado} />
          </TouchableOpacity>
        </View>

        {/* Preferências */}
        <Text style={styles.tituloSecao}>PREFERÊNCIAS</Text>
        <View style={styles.cardSecao}>
          {preferencias.map(({ chave, rotulo, Icone, acao }, indice) => (
            <TouchableOpacity
              key={chave}
              style={[styles.linha, indice < preferencias.length - 1 && styles.linhaBorda]}
              onPress={acao}
              activeOpacity={0.7}
              accessibilityLabel={rotulo}>
              <View style={styles.iconeLinha}>
                <Icone size={16} color={Paleta.primaria} />
              </View>
              <View style={styles.textoLinha}>
                <Text style={styles.rotuloLinha}>{rotulo}</Text>
              </View>
              <ChevronRight size={16} color={Paleta.textoMutado} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Sair */}
        <TouchableOpacity
          style={styles.botaoSair}
          onPress={() => emBreve('Sair da conta')}
          activeOpacity={0.7}
          accessibilityLabel="Sair da conta">
          <LogOut size={16} color={Paleta.erro} />
          <Text style={styles.textoSair}>Sair da conta</Text>
        </TouchableOpacity>

        <Text style={styles.versao}>PrimerPay v1.0.0</Text>
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
  cardPerfil: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: Paleta.cinzaCard,
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Paleta.cinzaBorda,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Paleta.primariaClara,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Paleta.primariaBorda,
  },
  badgePremium: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Paleta.atencao,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Paleta.cinzaCard,
  },
  infoPerfil: {
    flex: 1,
  },
  nomePerfil: {
    fontSize: 16,
    fontWeight: '700',
    color: Paleta.textoPrincipal,
  },
  emailPerfil: {
    fontSize: 12,
    color: Paleta.textoSecundario,
    marginTop: 2,
  },
  tituloSecao: {
    fontSize: 11,
    fontWeight: '700',
    color: Paleta.textoSecundario,
    letterSpacing: 1,
    marginBottom: 10,
  },
  cardSecao: {
    backgroundColor: Paleta.cinzaCard,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Paleta.cinzaBorda,
    marginBottom: 20,
    overflow: 'hidden',
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
  },
  linhaBorda: {
    borderBottomWidth: 1,
    borderBottomColor: Paleta.cinzaBorda,
  },
  iconeLinha: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: Paleta.primariaClara,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Paleta.primariaBorda,
  },
  textoLinha: {
    flex: 1,
  },
  rotuloLinha: {
    fontSize: 14,
    fontWeight: '700',
    color: Paleta.textoPrincipal,
  },
  detalheLinha: {
    fontSize: 12,
    color: Paleta.textoMutado,
    marginTop: 2,
  },
  botaoSair: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Paleta.erroFundo,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  textoSair: {
    fontSize: 14,
    fontWeight: '700',
    color: Paleta.erro,
  },
  versao: {
    fontSize: 11,
    color: Paleta.textoMutado,
    textAlign: 'center',
    marginTop: 16,
  },
});
