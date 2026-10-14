import { AtalhosPix } from "@/components/AtalhosPix";
import { BannerDinheiroAdicional } from "@/components/BannerDinheiroAdicional";
import { BannerEmprestimo } from "@/components/BannerEmprestimo";
import { BannerProximoPagamento } from "@/components/BannerProximoPagamento";
import { CarouselBanners } from "@/components/CarouselBanners";
import { CartaoAjuda } from "@/components/CartaoAjuda";
import { CartaoLimite } from "@/components/CartaoLimite";
import { ModalCobrancaQRCode } from "@/components/ModalCobrancaQRCode";
import { ModalPerfil } from "@/components/ModalPerfil";
import { TecladoPOS } from "@/components/TecladoPOS";
import { Paleta } from "@/constants/Colors";
import { usePayment } from "@/context/PaymentContext";
import { USUARIO_MOCK } from "@/constants/Usuario";
import { Cobranca } from "@/types/pagamento";
import { centavosParaReais, formatarMoeda } from "@/utils/formatters";
import { useRouter } from "expo-router";
import {
  ArrowRight,
  CircleAlert,
  Crown,
  Eye,
  EyeOff,
  Bell,
  QrCode,
  Wallet,
} from "lucide-react-native";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TelaComerciante() {
  const router = useRouter();
  const {
    criarCobranca,
    cobrancaAtual,
    selecionarCobrancaParaCliente,
    saldoEmConta,
  } = usePayment();

  // Valor em centavos (ex: 2500 = R$ 25,00) para evitar problemas de ponto flutuante
  const [centavos, setCentavos] = useState<number>(0);
  const [descricao, setDescricao] = useState<string>("");
  const [modalQrVisivel, setModalQrVisivel] = useState<boolean>(false);
  const [modalPerfilVisivel, setModalPerfilVisivel] = useState<boolean>(false);
  const [saldoVisivel, setSaldoVisivel] = useState<boolean>(true);
  const [areaPixAberta, setAreaPixAberta] = useState<boolean>(false);
  const [cobrancaExibida, setCobrancaExibida] = useState<Cobranca | null>(null);

  const valorReais = centavosParaReais(centavos);

  const handleDigitarNumero = (num: string) => {
    const stringAtual = centavos.toString();
    if (stringAtual.length >= 8) return; // Limite de R$ 999.999,99

    const novoCentavos = parseInt(stringAtual + num, 10);
    setCentavos(isNaN(novoCentavos) ? 0 : novoCentavos);
  };

  const handleApagar = () => {
    const stringAtual = centavos.toString();
    if (stringAtual.length <= 1) {
      setCentavos(0);
    } else {
      setCentavos(parseInt(stringAtual.slice(0, -1), 10));
    }
  };

  const handleAdicionarRapido = (centavosAdicionais: number) => {
    setCentavos((prev) => prev + centavosAdicionais);
  };

  const handleLimpar = () => {
    setCentavos(0);
  };

  const handleGerarCobranca = () => {
    if (valorReais <= 0) return;

    const nova = criarCobranca(
      valorReais,
      descricao || "Venda no Balcão",
      "PIX",
    );
    setCobrancaExibida(nova);
    setModalQrVisivel(true);
    setCentavos(0);
    setDescricao("");
  };

  const handleSimularComoCliente = (cob: Cobranca) => {
    selecionarCobrancaParaCliente(cob);
    router.push("/(tabs)/cliente");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header da Home — avatar, olho do saldo, avisos e menu */}
      <View style={styles.headerHome}>
        <TouchableOpacity
          style={styles.botaoAvatar}
          onPress={() => setModalPerfilVisivel(true)}
          activeOpacity={0.7}
          accessibilityLabel="Abrir perfil"
        >
          <View style={styles.avatarAnelExterno}>
            <View style={styles.avatarAnelInterno}>
              <Text style={styles.textoIniciaisAvatar}>
                {USUARIO_MOCK.iniciais}
              </Text>
            </View>
            <View style={styles.badgePremium}>
              <Crown size={10} color="#FFFFFF" />
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.acoesHeader}>
          <TouchableOpacity
            style={styles.botaoHeader}
            onPress={() => setSaldoVisivel((prev) => !prev)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessibilityLabel={
              saldoVisivel ? "Ocultar saldo" : "Mostrar saldo"
            }
          >
            {saldoVisivel ? (
              <Eye size={22} color={Paleta.textoPrincipal} />
            ) : (
              <EyeOff size={22} color={Paleta.textoPrincipal} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoHeader}
            disabled
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessibilityLabel="Avisos"
          >
            <CircleAlert size={22} color={Paleta.textoPrincipal} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoHeader}
            onPress={() => {/* TODO: abrir tela de notificações */}}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessibilityLabel="Notificações"
          >
            <Bell size={22} color={Paleta.textoPrincipal} />
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.flexContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Cabeçalho do Estabelecimento */}
          <View style={styles.cabecalho}>
            {cobrancaAtual && cobrancaAtual.status === "PENDENTE" && (
              <TouchableOpacity
                style={styles.badgeCobrancaPendente}
                onPress={() => {
                  setCobrancaExibida(cobrancaAtual);
                  setModalQrVisivel(true);
                }}
                activeOpacity={0.7}
              >
                <QrCode size={14} color={Paleta.atencao} />
                <Text style={styles.textoBadgePendente}>Ver QR Ativo</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Saldo em Conta — clique abre o extrato (Histórico) */}
          <TouchableOpacity
            style={styles.cardSaldo}
            onPress={() => router.push("/(tabs)/historico")}
            activeOpacity={0.85}
            accessibilityLabel="Ver extrato da conta"
          >
            <View style={styles.linhaSaldoTopo}>
              <View style={styles.iconeSaldo}>
                <Wallet size={18} color={Paleta.primaria} />
              </View>
              <Text style={styles.labelSaldo}>Saldo em conta</Text>
              <TouchableOpacity
                style={styles.botaoOlho}
                onPress={() => setSaldoVisivel((prev) => !prev)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                {saldoVisivel ? (
                  <Eye size={16} color={Paleta.textoSecundario} />
                ) : (
                  <EyeOff size={16} color={Paleta.textoSecundario} />
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.linhaSaldoValor}>
              <Text style={styles.valorSaldo}>
                {saldoVisivel ? formatarMoeda(saldoEmConta) : "R$ ••••••"}
              </Text>
              <View style={styles.badgeExtrato}>
                <Text style={styles.textoExtrato}>Ver extrato</Text>
                <ArrowRight size={14} color={Paleta.primaria} />
              </View>
            </View>
          </TouchableOpacity>

          {/* Atalhos Pix — Área Pix, Pagar, Empréstimo, Recarga */}
          <AtalhosPix
            areaPixAberta={areaPixAberta}
            onAlternarAreaPix={() => setAreaPixAberta((prev) => !prev)}
            onPagar={() => router.push("/(tabs)/cliente")}
          />

          {/* Banner Dinheiro Adicional — opções de crédito disponível */}
          <BannerDinheiroAdicional
            onPress={() => router.push("/(tabs)/cartao")}
          />

          {/* Carousel de Banners Promocionais */}
          <CarouselBanners
            onPressBanner={(id) => {
              if (id === "emprestimo") router.push("/(tabs)/emprestimo");
              if (id === "boletos") router.push("/(tabs)/cartao");
            }}
          />

          {/* Cartão de Crédito — limite, fatura, meus cartões */}
          <CartaoLimite
            onConstruirLimite={() => router.push("/(tabs)/cartao")}
            onFaturaAtual={() => router.push("/(tabs)/cartao")}
            onLimiteDisponivel={() => router.push("/(tabs)/cartao")}
            onMeusCartoes={() => router.push("/(tabs)/cartao")}
          />

          {/* Empréstimo — valor disponível */}
          <BannerEmprestimo onPress={() => router.push("/(tabs)/emprestimo")} />

          {/* Próximo pagamento */}
          <BannerProximoPagamento
            onPress={() => router.push("/(tabs)/cartao")}
          />

          {/* Ajuda — fale conosco, dúvidas, busca */}
          <CartaoAjuda />

          {/* Maquininha — visível dentro da Área Pix e Transferir */}
          {areaPixAberta && (
            <>
              {/* Display de Valor da Maquininha */}
              <View style={styles.cardValor}>
                <Text style={styles.labelValor}>VALOR A COBRAR</Text>
                <Text
                  style={[
                    styles.displayValor,
                    valorReais === 0 && styles.displayValorVazio,
                  ]}
                >
                  {formatarMoeda(valorReais)}
                </Text>

                {/* Input de Descrição Opcional */}
                <View style={styles.containerDescricao}>
                  <TextInput
                    style={styles.inputDescricao}
                    placeholder="Descrição (ex: Almoço executivo, café...)"
                    placeholderTextColor={Paleta.textoMutado}
                    value={descricao}
                    onChangeText={setDescricao}
                    maxLength={40}
                  />
                </View>
              </View>

              {/* Teclado Estilo POS */}
              <View style={styles.secaoTeclado}>
                <TecladoPOS
                  onDigitarNumero={handleDigitarNumero}
                  onApagar={handleApagar}
                  onAdicionarRapido={handleAdicionarRapido}
                  onLimpar={handleLimpar}
                />
              </View>

              {/* Botão de Ação Principal */}
              <TouchableOpacity
                style={[
                  styles.botaoCobrar,
                  valorReais <= 0 && styles.botaoCobrarDesabilitado,
                ]}
                disabled={valorReais <= 0}
                onPress={handleGerarCobranca}
                activeOpacity={0.85}
              >
                <QrCode size={22} color="#FFFFFF" />
                <Text style={styles.textoBotaoCobrar}>
                  {valorReais > 0
                    ? `Gerar QR Code Pix (${formatarMoeda(valorReais)})`
                    : "Digite o valor para cobrar"}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modal do QR Code gerado */}
      <ModalCobrancaQRCode
        visivel={modalQrVisivel}
        cobranca={cobrancaExibida}
        onFechar={() => setModalQrVisivel(false)}
        onSimularComoCliente={handleSimularComoCliente}
      />

      {/* Bottom sheet do perfil (mock) */}
      <ModalPerfil
        visivel={modalPerfilVisivel}
        onFechar={() => setModalPerfilVisivel(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Paleta.cinzaFundo,
  },
  flexContainer: {
    flex: 1,
  },
  headerHome: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  acoesHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  botaoHeader: {
    padding: 8,
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 28,
  },
  cabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  ladoEsquerdo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flexShrink: 1,
  },
  botaoAvatar: {
    borderRadius: 24,
  },
  avatarAnelExterno: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: Paleta.primariaClara,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: Paleta.primariaBorda,
  },
  avatarAnelInterno: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Paleta.primaria,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Paleta.primariaBorda,
  },
  textoIniciaisAvatar: {
    fontSize: 13,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  badgePremium: {
    position: "absolute",
    top: -3,
    right: -3,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Paleta.atencao,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Paleta.cinzaFundo,
  },
  lojaInfo: {
    flexShrink: 1,
  },
  nomeLoja: {
    fontSize: 16,
    fontWeight: "700",
    color: Paleta.textoPrincipal,
  },
  statusOnline: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 2,
  },
  pontoVerde: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: Paleta.sucesso,
  },
  textoStatus: {
    fontSize: 12,
    color: Paleta.textoSecundario,
    fontWeight: "500",
  },
  badgeCobrancaPendente: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: Paleta.atencaoFundo,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  textoBadgePendente: {
    fontSize: 12,
    fontWeight: "700",
    color: "#B45309",
  },
  cardSaldo: {
    backgroundColor: Paleta.cinzaCard,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Paleta.cinzaBorda,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  linhaSaldoTopo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  iconeSaldo: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: Paleta.primariaClara,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Paleta.primariaBorda,
  },
  labelSaldo: {
    flex: 1,
    fontSize: 13,
    fontWeight: "600",
    color: Paleta.textoSecundario,
  },
  botaoOlho: {
    padding: 4,
  },
  linhaSaldoValor: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  valorSaldo: {
    fontSize: 26,
    fontWeight: "800",
    color: Paleta.textoPrincipal,
    letterSpacing: -0.5,
  },
  badgeExtrato: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: Paleta.primariaClara,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Paleta.primariaBorda,
  },
  textoExtrato: {
    fontSize: 12,
    fontWeight: "700",
    color: Paleta.primariaEscura,
  },
  cardValor: {
    backgroundColor: Paleta.cinzaCard,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Paleta.cinzaBorda,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  labelValor: {
    fontSize: 12,
    fontWeight: "700",
    color: Paleta.textoSecundario,
    letterSpacing: 1,
    marginBottom: 6,
  },
  displayValor: {
    fontSize: 40,
    fontWeight: "800",
    color: Paleta.primariaEscura,
    letterSpacing: -1,
    marginBottom: 14,
  },
  displayValorVazio: {
    color: Paleta.textoMutado,
  },
  containerDescricao: {
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: Paleta.cinzaBorda,
    paddingTop: 12,
  },
  inputDescricao: {
    backgroundColor: Paleta.cinzaSuave,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    fontSize: 14,
    color: Paleta.textoPrincipal,
    borderWidth: 1,
    borderColor: Paleta.cinzaBorda,
    textAlign: "center",
  },
  secaoTeclado: {
    marginBottom: 16,
  },
  botaoCobrar: {
    backgroundColor: Paleta.primaria,
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    shadowColor: Paleta.primaria,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  botaoCobrarDesabilitado: {
    backgroundColor: "#94A3B8",
    shadowOpacity: 0,
    elevation: 0,
  },
  textoBotaoCobrar: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
