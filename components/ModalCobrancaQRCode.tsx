import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Share } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Cobranca } from '@/types/pagamento';
import { Paleta } from '@/constants/Colors';
import { formatarMoeda } from '@/utils/formatters';
import { BadgeStatus } from './BadgeStatus';
import { Copy, Check, X, Smartphone, ArrowRight, Share2 } from 'lucide-react-native';

interface ModalCobrancaQRCodeProps {
  visivel: boolean;
  cobranca: Cobranca | null;
  onFechar: () => void;
  onSimularComoCliente: (cobranca: Cobranca) => void;
}

export const ModalCobrancaQRCode: React.FC<ModalCobrancaQRCodeProps> = ({
  visivel,
  cobranca,
  onFechar,
  onSimularComoCliente,
}) => {
  const [copiado, setCopiado] = useState(false);

  if (!cobranca) return null;

  const copiarPix = () => {
    // Simulação visual de cópia
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  };

  const compartilharPix = async () => {
    try {
      await Share.share({
        message: `PrimerPay: Cobrança Pix de ${formatarMoeda(cobranca.valor)}\nCódigo Pix:\n${cobranca.codigoPix}`,
      });
    } catch {}
  };

  const isPago = cobranca.status === 'PAGO';

  return (
    <Modal visible={visivel} transparent animationType="slide" onRequestClose={onFechar}>
      <View style={styles.fundoModal}>
        <View style={styles.cardModal}>
          {/* Topo com fechar */}
          <View style={styles.topoModal}>
            <View>
              <Text style={styles.tituloModal}>Cobrança Pix</Text>
              <Text style={styles.idCobranca}>Ref: {cobranca.id}</Text>
            </View>
            <TouchableOpacity style={styles.botaoFechar} onPress={onFechar} activeOpacity={0.7}>
              <X size={20} color={Paleta.textoSecundario} />
            </TouchableOpacity>
          </View>

          {/* Valor e Descrição */}
          <View style={styles.blocoValor}>
            <Text style={styles.valorTexto}>{formatarMoeda(cobranca.valor)}</Text>
            <Text style={styles.descricaoTexto}>{cobranca.descricao}</Text>
            <View style={styles.statusWrapper}>
              <BadgeStatus status={cobranca.status} />
            </View>
          </View>

          {/* Área do QR Code */}
          <View style={[styles.areaQrCode, isPago && styles.areaQrCodePago]}>
            <QRCode
              value={cobranca.codigoPix || 'pix-primerpay-mock'}
              size={180}
              color={isPago ? Paleta.primariaEscura : Paleta.textoPrincipal}
              backgroundColor="#FFFFFF"
            />
            {isPago && (
              <View style={styles.overlayPago}>
                <View style={styles.badgePagoCelebracao}>
                  <Text style={styles.textoPagoCelebracao}>✓ PAGO COM SUCESSO</Text>
                </View>
              </View>
            )}
          </View>

          {/* Botões de Ação Pix */}
          <View style={styles.acoesCopia}>
            <TouchableOpacity style={styles.botaoCopia} onPress={copiarPix} activeOpacity={0.7}>
              {copiado ? (
                <>
                  <Check size={16} color={Paleta.primaria} />
                  <Text style={[styles.textoAcao, { color: Paleta.primaria }]}>Código Copiado!</Text>
                </>
              ) : (
                <>
                  <Copy size={16} color={Paleta.textoPrincipal} />
                  <Text style={styles.textoAcao}>Copiar Código Pix</Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.botaoCompartilhar} onPress={compartilharPix} activeOpacity={0.7}>
              <Share2 size={16} color={Paleta.textoSecundario} />
            </TouchableOpacity>
          </View>

          {/* Botão de Destaque MVP: Simular Pagamento do Cliente */}
          {!isPago ? (
            <TouchableOpacity
              style={styles.botaoSimularCliente}
              onPress={() => {
                onFechar();
                onSimularComoCliente(cobranca);
              }}
              activeOpacity={0.85}>
              <View style={styles.conteudoSimular}>
                <Smartphone size={20} color="#FFFFFF" />
                <Text style={styles.textoSimular}>Simular Pagamento do Cliente</Text>
              </View>
              <ArrowRight size={18} color="#FFFFFF" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.botaoSimularCliente, { backgroundColor: Paleta.primaria }]}
              onPress={onFechar}
              activeOpacity={0.85}>
              <Text style={styles.textoSimular}>Concluir Venda</Text>
            </TouchableOpacity>
          )}

          <Text style={styles.avisoFooter}>
            {isPago
              ? 'Transação confirmada e registrada no histórico de vendas.'
              : 'Mostre este QR Code para o cliente escanear ou use o botão de simulação acima.'}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  fundoModal: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    justifyContent: 'flex-end',
  },
  cardModal: {
    backgroundColor: Paleta.cinzaCard,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  topoModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 12,
  },
  tituloModal: {
    fontSize: 20,
    fontWeight: '700',
    color: Paleta.textoPrincipal,
  },
  idCobranca: {
    fontSize: 12,
    color: Paleta.textoSecundario,
    marginTop: 2,
  },
  botaoFechar: {
    backgroundColor: Paleta.cinzaSuave,
    padding: 8,
    borderRadius: 20,
  },
  blocoValor: {
    alignItems: 'center',
    marginBottom: 16,
  },
  valorTexto: {
    fontSize: 34,
    fontWeight: '800',
    color: Paleta.primaria,
    letterSpacing: -0.5,
  },
  descricaoTexto: {
    fontSize: 14,
    color: Paleta.textoSecundario,
    marginTop: 4,
  },
  statusWrapper: {
    marginTop: 8,
  },
  areaQrCode: {
    padding: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: Paleta.cinzaBorda,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
    position: 'relative',
  },
  areaQrCodePago: {
    borderColor: Paleta.primaria,
  },
  overlayPago: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgePagoCelebracao: {
    backgroundColor: Paleta.primaria,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  textoPagoCelebracao: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },
  acoesCopia: {
    flexDirection: 'row',
    width: '100%',
    gap: 8,
    marginBottom: 16,
  },
  botaoCopia: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Paleta.cinzaSuave,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Paleta.cinzaBorda,
  },
  botaoCompartilhar: {
    backgroundColor: Paleta.cinzaSuave,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Paleta.cinzaBorda,
  },
  textoAcao: {
    fontSize: 14,
    fontWeight: '600',
    color: Paleta.textoPrincipal,
  },
  botaoSimularCliente: {
    backgroundColor: Paleta.azulBancario,
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    shadowColor: Paleta.azulBancario,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  conteudoSimular: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  textoSimular: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  avisoFooter: {
    fontSize: 12,
    color: Paleta.textoMutado,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});
