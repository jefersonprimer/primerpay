import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Paleta } from '@/constants/Colors';
import {
  Search,
  ShoppingBag,
  QrCode,
  CreditCard,
  Landmark,
  ReceiptText,
  Smartphone,
  Gift,
} from 'lucide-react-native';

const emBreve = (nome: string) => Alert.alert(nome, 'Recurso demonstrativo (MVP) — em breve!');

const PRODUTOS = [
  {
    chave: 'maquininha',
    nome: 'Maquininha PrimerPay',
    descricao: 'Débito, crédito e Pix',
    preco: 'A partir de R$ 4,99/mês',
    Icone: CreditCard,
    destaque: true,
  },
  {
    chave: 'qrcode',
    nome: 'QR Code Estático',
    descricao: 'Receba sem taxa',
    preco: 'Grátis',
    Icone: QrCode,
    destaque: false,
  },
  {
    chave: 'link',
    nome: 'Link de Pagamento',
    descricao: 'Cobre por WhatsApp',
    preco: 'Grátis',
    Icone: ReceiptText,
    destaque: false,
  },
  {
    chave: 'recarga',
    nome: 'Recarga e contas',
    descricao: 'Celular, energia e água',
    preco: 'Cashback de 2%',
    Icone: Smartphone,
    destaque: false,
  },
  {
    chave: 'giftcard',
    nome: 'Vale-presente',
    descricao: 'Presenteie seus clientes',
    preco: 'A partir de R$ 25,00',
    Icone: Gift,
    destaque: false,
  },
  {
    chave: 'conta',
    nome: 'Conta PrimerBank',
    descricao: 'Rende 100% do CDI',
    preco: 'Sem mensalidade',
    Icone: Landmark,
    destaque: false,
  },
];

export default function TelaShop() {
  const [busca, setBusca] = useState<string>('');

  const produtosFiltrados = PRODUTOS.filter((produto) =>
    produto.nome.toLowerCase().includes(busca.trim().toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {/* Busca */}
        <View style={styles.barraBusca}>
          <Search size={16} color={Paleta.textoMutado} />
          <TextInput
            style={styles.inputBusca}
            placeholder="Buscar produtos e serviços"
            placeholderTextColor={Paleta.textoMutado}
            value={busca}
            onChangeText={setBusca}
            returnKeyType="search"
          />
        </View>

        {/* Destaque */}
        <TouchableOpacity
          style={styles.cardDestaque}
          onPress={() => emBreve('Maquininha PrimerPay')}
          activeOpacity={0.85}
          accessibilityLabel="Conhecer a maquininha PrimerPay">
          <View style={styles.iconeDestaque}>
            <ShoppingBag size={22} color="#FFFFFF" />
          </View>
          <View style={styles.textoDestaque}>
            <Text style={styles.tituloDestaque}>Loja PrimerPay</Text>
            <Text style={styles.subtituloDestaque}>
              Equipamentos, assinaturas e soluções para vender mais
            </Text>
          </View>
        </TouchableOpacity>

        {/* Grade de produtos */}
        <Text style={styles.tituloSecao}>PRODUTOS</Text>
        {produtosFiltrados.length > 0 ? (
          <View style={styles.gradeProdutos}>
            {produtosFiltrados.map(({ chave, nome, descricao, preco, Icone, destaque }) => (
              <TouchableOpacity
                key={chave}
                style={[styles.cardProduto, destaque && styles.cardProdutoDestaque]}
                onPress={() => emBreve(nome)}
                activeOpacity={0.7}
                accessibilityLabel={nome}>
                <View style={[styles.iconeProduto, destaque && styles.iconeProdutoDestaque]}>
                  <Icone size={18} color={destaque ? '#FFFFFF' : Paleta.primaria} />
                </View>
                <Text style={styles.nomeProduto} numberOfLines={2}>
                  {nome}
                </Text>
                <Text style={styles.descricaoProduto} numberOfLines={2}>
                  {descricao}
                </Text>
                <Text style={styles.precoProduto} numberOfLines={1}>
                  {preco}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.cardVazio}>
            <Search size={30} color={Paleta.textoMutado} />
            <Text style={styles.textoVazio}>Nenhum produto encontrado</Text>
          </View>
        )}
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
  barraBusca: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Paleta.cinzaCard,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Paleta.cinzaBorda,
  },
  inputBusca: {
    flex: 1,
    fontSize: 14,
    color: Paleta.textoPrincipal,
    padding: 0,
  },
  cardDestaque: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: Paleta.primaria,
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
    shadowColor: Paleta.primaria,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  iconeDestaque: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  textoDestaque: {
    flex: 1,
  },
  tituloDestaque: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 3,
  },
  subtituloDestaque: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 16,
  },
  tituloSecao: {
    fontSize: 11,
    fontWeight: '700',
    color: Paleta.textoSecundario,
    letterSpacing: 1,
    marginBottom: 10,
  },
  gradeProdutos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  cardProduto: {
    width: '47.5%',
    flexGrow: 1,
    backgroundColor: Paleta.cinzaCard,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Paleta.cinzaBorda,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardProdutoDestaque: {
    borderColor: Paleta.primariaBorda,
    backgroundColor: Paleta.primariaClara,
  },
  iconeProduto: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: Paleta.primariaClara,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Paleta.primariaBorda,
    marginBottom: 6,
  },
  iconeProdutoDestaque: {
    backgroundColor: Paleta.primaria,
    borderColor: Paleta.primariaEscura,
  },
  nomeProduto: {
    fontSize: 14,
    fontWeight: '700',
    color: Paleta.textoPrincipal,
  },
  descricaoProduto: {
    fontSize: 12,
    color: Paleta.textoSecundario,
    lineHeight: 16,
  },
  precoProduto: {
    fontSize: 12,
    fontWeight: '700',
    color: Paleta.primariaEscura,
    marginTop: 2,
  },
  cardVazio: {
    backgroundColor: Paleta.cinzaCard,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: Paleta.cinzaBorda,
  },
  textoVazio: {
    fontSize: 13,
    color: Paleta.textoSecundario,
  },
});
