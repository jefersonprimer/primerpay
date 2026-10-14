import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Cobranca } from '@/types/pagamento';
import { Paleta } from '@/constants/Colors';
import { formatarMoeda, formatarDataHora } from '@/utils/formatters';
import { CheckCircle2, X } from 'lucide-react-native';

interface ModalComprovanteProps {
  visivel: boolean;
  cobranca: Cobranca | null;
  onFechar: () => void;
}

export const ModalComprovante: React.FC<ModalComprovanteProps> = ({ visivel, cobranca, onFechar }) => {
  if (!cobranca || !cobranca.comprovante) return null;

  const { comprovante } = cobranca;

  return (
    <Modal visible={visivel} transparent animationType="fade" onRequestClose={onFechar}>
      <View style={styles.fundoModal}>
        <View style={styles.cardRecibo}>
          {/* Botão fechar */}
          <TouchableOpacity style={styles.botaoFechar} onPress={onFechar} activeOpacity={0.7}>
            <X size={20} color={Paleta.textoSecundario} />
          </TouchableOpacity>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.conteudoRecibo}>
            {/* Cabeçalho do Recibo */}
            <View style={styles.iconeSucessoContainer}>
              <CheckCircle2 size={46} color={Paleta.sucesso} strokeWidth={2.4} />
            </View>

            <Text style={styles.tituloRecibo}>Comprovante de Pagamento</Text>
            <Text style={styles.subtituloRecibo}>Pix instantâneo confirmado</Text>

            <View style={styles.divisorLinha} />

            {/* Valor */}
            <View style={styles.areaValor}>
              <Text style={styles.labelValor}>Valor transferido</Text>
              <Text style={styles.valorPrincipal}>{formatarMoeda(cobranca.valor)}</Text>
            </View>

            {/* Tabela de Dados */}
            <View style={styles.blocoDados}>
              <View style={styles.linhaInfo}>
                <Text style={styles.labelInfo}>Descrição</Text>
                <Text style={styles.valorInfo}>{cobranca.descricao}</Text>
              </View>

              <View style={styles.linhaInfo}>
                <Text style={styles.labelInfo}>Data e hora</Text>
                <Text style={styles.valorInfo}>{formatarDataHora(comprovante.dataHora)}</Text>
              </View>

              <View style={styles.linhaInfo}>
                <Text style={styles.labelInfo}>Recebedor</Text>
                <Text style={styles.valorInfo} numberOfLines={1}>
                  {comprovante.recebedor}
                </Text>
              </View>

              <View style={styles.linhaInfo}>
                <Text style={styles.labelInfo}>Chave Pix</Text>
                <Text style={styles.valorInfo}>{comprovante.chaveRecebedor}</Text>
              </View>

              <View style={styles.linhaInfo}>
                <Text style={styles.labelInfo}>Pagador</Text>
                <Text style={styles.valorInfo}>{comprovante.pagador}</Text>
              </View>

              <View style={styles.divisorLinha} />

              <View style={styles.linhaInfo}>
                <Text style={styles.labelInfo}>ID Transação</Text>
                <Text style={[styles.valorInfo, styles.textoMonospace]} numberOfLines={1}>
                  {comprovante.idTransacao}
                </Text>
              </View>

              <View style={styles.linhaInfo}>
                <Text style={styles.labelInfo}>Autenticação</Text>
                <Text style={[styles.valorInfo, styles.textoMonospace]}>
                  {comprovante.autenticacaoBancaria}
                </Text>
              </View>
            </View>

            <TouchableOpacity style={styles.botaoOk} onPress={onFechar} activeOpacity={0.8}>
              <Text style={styles.textoBotaoOk}>Fechar Comprovante</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  fundoModal: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cardRecibo: {
    backgroundColor: Paleta.cinzaCard,
    width: '100%',
    maxWidth: 420,
    maxHeight: '90%',
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  botaoFechar: {
    position: 'absolute',
    top: 18,
    right: 18,
    zIndex: 10,
    backgroundColor: Paleta.cinzaSuave,
    padding: 8,
    borderRadius: 20,
  },
  conteudoRecibo: {
    padding: 24,
    alignItems: 'center',
  },
  iconeSucessoContainer: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: Paleta.sucessoFundo,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 12,
  },
  tituloRecibo: {
    fontSize: 20,
    fontWeight: '700',
    color: Paleta.textoPrincipal,
    textAlign: 'center',
  },
  subtituloRecibo: {
    fontSize: 13,
    color: Paleta.textoSecundario,
    marginTop: 4,
  },
  divisorLinha: {
    height: 1,
    backgroundColor: Paleta.cinzaBorda,
    width: '100%',
    marginVertical: 16,
  },
  areaValor: {
    alignItems: 'center',
    width: '100%',
    backgroundColor: Paleta.cinzaSuave,
    paddingVertical: 14,
    borderRadius: 14,
  },
  labelValor: {
    fontSize: 12,
    color: Paleta.textoSecundario,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: '600',
  },
  valorPrincipal: {
    fontSize: 28,
    fontWeight: '800',
    color: Paleta.primaria,
    marginTop: 4,
  },
  blocoDados: {
    width: '100%',
    gap: 12,
  },
  linhaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelInfo: {
    fontSize: 13,
    color: Paleta.textoSecundario,
  },
  valorInfo: {
    fontSize: 13,
    fontWeight: '600',
    color: Paleta.textoPrincipal,
    maxWidth: '65%',
    textAlign: 'right',
  },
  textoMonospace: {
    fontSize: 11,
    color: Paleta.textoSecundario,
  },
  botaoOk: {
    backgroundColor: Paleta.primaria,
    width: '100%',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  textoBotaoOk: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
