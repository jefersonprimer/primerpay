import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Paleta } from '@/constants/Colors';
import { QrCode, Smartphone, BarChart3 } from 'lucide-react-native';

export default function ModalScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.badgeVersao}>
        <Text style={styles.textoBadge}>PrimerPay MVP • v1.0</Text>
      </View>

      <Text style={styles.titulo}>Como Funciona a Demonstração</Text>
      <Text style={styles.descricaoGeral}>
        Um ecossistema completo simulado para comerciantes e clientes com liquidação instantânea.
      </Text>

      <View style={styles.cardPasso}>
        <View style={styles.iconePasso}>
          <QrCode size={20} color={Paleta.primaria} />
        </View>
        <View style={styles.infoPasso}>
          <Text style={styles.tituloPasso}>1. Comerciante (Aba Cobrar)</Text>
          <Text style={styles.textoPasso}>
            Digite qualquer valor no teclado numérico estilo maquininha e gere o QR Code Pix na hora.
          </Text>
        </View>
      </View>

      <View style={styles.cardPasso}>
        <View style={styles.iconePasso}>
          <Smartphone size={20} color={Paleta.azulBancario} />
        </View>
        <View style={styles.infoPasso}>
          <Text style={styles.tituloPasso}>2. Cliente (Aba Pagar)</Text>
          <Text style={styles.textoPasso}>
            Veja os detalhes da cobrança, escolha a forma de pagamento e autorize a transação em tempo real.
          </Text>
        </View>
      </View>

      <View style={styles.cardPasso}>
        <View style={styles.iconePasso}>
          <BarChart3 size={20} color={Paleta.atencao} />
        </View>
        <View style={styles.infoPasso}>
          <Text style={styles.tituloPasso}>3. Histórico e Comprovantes</Text>
          <Text style={styles.textoPasso}>
            Acompanhe o faturamento consolidado do dia e clique em qualquer venda para emitir o recibo.
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.botaoEntendido}
        onPress={() => router.back()}
        activeOpacity={0.8}>
        <Text style={styles.textoBotao}>Começar Agora</Text>
      </TouchableOpacity>

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Paleta.cinzaFundo,
    padding: 24,
    justifyContent: 'center',
  },
  badgeVersao: {
    backgroundColor: Paleta.primariaClara,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  textoBadge: {
    fontSize: 12,
    fontWeight: '700',
    color: Paleta.primariaEscura,
  },
  titulo: {
    fontSize: 24,
    fontWeight: '800',
    color: Paleta.textoPrincipal,
    marginBottom: 6,
  },
  descricaoGeral: {
    fontSize: 14,
    color: Paleta.textoSecundario,
    marginBottom: 24,
    lineHeight: 20,
  },
  cardPasso: {
    flexDirection: 'row',
    backgroundColor: Paleta.cinzaCard,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Paleta.cinzaBorda,
    marginBottom: 12,
    gap: 14,
    alignItems: 'flex-start',
  },
  iconePasso: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Paleta.cinzaSuave,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoPasso: {
    flex: 1,
  },
  tituloPasso: {
    fontSize: 14,
    fontWeight: '700',
    color: Paleta.textoPrincipal,
    marginBottom: 2,
  },
  textoPasso: {
    fontSize: 12,
    color: Paleta.textoSecundario,
    lineHeight: 17,
  },
  botaoEntendido: {
    backgroundColor: Paleta.primaria,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
