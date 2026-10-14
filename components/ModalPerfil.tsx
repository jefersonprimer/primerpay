import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Paleta } from '@/constants/Colors';
import {
  X,
  User,
  Camera,
  Settings,
  Bell,
  ChevronRight,
  Users,
  Building2,
  Link2,
  UserPlus,
  Repeat,
  LogOut,
  Landmark,
  Crown,
} from 'lucide-react-native';

import { USUARIO_MOCK } from '@/constants/Usuario';

interface ModalPerfilProps {
  visivel: boolean;
  onFechar: () => void;
}

export const ModalPerfil: React.FC<ModalPerfilProps> = ({ visivel, onFechar }) => {
  // Mock: simula "adicionar foto" alternando entre ícone e iniciais
  const [fotoAdicionada, setFotoAdicionada] = useState(false);

  const larguraBarraScore: `${number}%` = `${Math.min(100, Math.round((USUARIO_MOCK.primerScore / 1000) * 100))}%`;

  return (
    <Modal visible={visivel} transparent animationType="slide" onRequestClose={onFechar}>
      <TouchableOpacity style={styles.fundoModal} activeOpacity={1} onPress={onFechar}>
        <TouchableOpacity style={styles.cardSheet} activeOpacity={1} onPress={() => {}}>
          {/* Alça do bottom sheet */}
          <View style={styles.alca} />

          {/* Topo com fechar */}
          <View style={styles.topoModal}>
            <Text style={styles.tituloModal}>Minha Conta</Text>
            <TouchableOpacity style={styles.botaoFechar} onPress={onFechar} activeOpacity={0.7}>
              <X size={20} color={Paleta.textoSecundario} />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.conteudoScroll}
            bounces={false}>
            {/* Perfil: avatar clicável + nome */}
            <View style={styles.blocoPerfil}>
              <TouchableOpacity
                style={styles.areaAvatar}
                onPress={() => setFotoAdicionada((prev) => !prev)}
                activeOpacity={0.8}>
                {fotoAdicionada ? (
                  <View style={styles.avatarFoto}>
                    <Text style={styles.textoIniciais}>{USUARIO_MOCK.iniciais}</Text>
                  </View>
                ) : (
                  <View style={styles.avatarVazio}>
                    <User size={32} color={Paleta.primaria} />
                  </View>
                )}
                <View style={styles.badgeCamera}>
                  <Camera size={12} color="#FFFFFF" />
                </View>
                <View style={styles.badgeCrown}>
                  <Crown size={11} color="#FFFFFF" />
                </View>
              </TouchableOpacity>

              <Text style={styles.nomeUsuario}>{USUARIO_MOCK.nome}</Text>
              <Text style={styles.dicaFoto}>
                {fotoAdicionada ? 'Toque para alterar a foto' : 'Toque para adicionar foto'}
              </Text>

              {/* Agência e Conta */}
              <View style={styles.linhaAgenciaConta}>
                <View style={styles.cardDadoBancario}>
                  <Landmark size={14} color={Paleta.textoSecundario} />
                  <View>
                    <Text style={styles.labelDado}>Agência</Text>
                    <Text style={styles.valorDado}>{USUARIO_MOCK.agencia}</Text>
                  </View>
                </View>
                <View style={styles.cardDadoBancario}>
                  <Landmark size={14} color={Paleta.textoSecundario} />
                  <View>
                    <Text style={styles.labelDado}>Conta</Text>
                    <Text style={styles.valorDado}>{USUARIO_MOCK.conta}</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* PrimerScore */}
            <TouchableOpacity style={styles.cardScore} activeOpacity={0.8}>
              <View style={styles.topoScore}>
                <View>
                  <Text style={styles.labelScore}>PrimerScore</Text>
                  <View style={styles.linhaValorScore}>
                    <Text style={styles.valorScore}>{USUARIO_MOCK.primerScore}</Text>
                    <View style={styles.badgeFaixaScore}>
                      <Text style={styles.textoFaixaScore}>{USUARIO_MOCK.faixaScore}</Text>
                    </View>
                  </View>
                </View>
                <ChevronRight size={18} color={Paleta.textoMutado} />
              </View>
              <View style={styles.barraScore}>
                <View style={[styles.barraScorePreenchida, { width: larguraBarraScore }]} />
              </View>
              <Text style={styles.legendaScore}>Atualizado hoje · Score demonstrativo (mock)</Text>
            </TouchableOpacity>

            {/* Itens de menu */}
            <View style={styles.grupoMenu}>
              <ItemMenu icone={<Settings size={19} color={Paleta.textoPrincipal} />} texto="Configurações" onPress={onFechar} />
              <ItemMenu
                icone={<Bell size={19} color={Paleta.textoPrincipal} />}
                texto="Notificações"
                pontoNovo
                onPress={onFechar}
              />
              <ItemMenu icone={<Users size={19} color={Paleta.textoPrincipal} />} texto="Outras contas" onPress={onFechar} />
              <ItemMenu
                icone={<Building2 size={19} color={Paleta.textoPrincipal} />}
                texto="Abrir conta no Primer Empresas"
                onPress={onFechar}
              />
              <ItemMenu icone={<Link2 size={19} color={Paleta.textoPrincipal} />} texto="Open Finance" onPress={onFechar} />
              <ItemMenu icone={<UserPlus size={19} color={Paleta.textoPrincipal} />} texto="Convidar amigos" onPress={onFechar} />
              <ItemMenu icone={<Repeat size={19} color={Paleta.textoPrincipal} />} texto="Trocar conta" onPress={onFechar} />
            </View>

            <TouchableOpacity style={styles.itemSair} onPress={onFechar} activeOpacity={0.7}>
              <View style={styles.iconeItemMenu}>
                <LogOut size={19} color={Paleta.erro} />
              </View>
              <Text style={styles.textoSair}>Sair do app</Text>
            </TouchableOpacity>

            <Text style={styles.versaoApp}>PrimerPay MVP · v1.0 (demonstração)</Text>
          </ScrollView>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

interface ItemMenuProps {
  icone: React.ReactNode;
  texto: string;
  pontoNovo?: boolean;
  onPress: () => void;
}

const ItemMenu: React.FC<ItemMenuProps> = ({ icone, texto, pontoNovo, onPress }) => (
  <TouchableOpacity style={styles.itemMenu} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.iconeItemMenu}>{icone}</View>
    <Text style={styles.textoItem}>{texto}</Text>
    {pontoNovo && <View style={styles.pontoNovo} />}
    <ChevronRight size={18} color={Paleta.textoMutado} style={styles.chevronItem} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  fundoModal: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    justifyContent: 'flex-end',
  },
  cardSheet: {
    backgroundColor: Paleta.cinzaCard,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 10,
    paddingBottom: 28,
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  alca: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Paleta.cinzaBorda,
    alignSelf: 'center',
    marginBottom: 8,
  },
  topoModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  tituloModal: {
    fontSize: 18,
    fontWeight: '700',
    color: Paleta.textoPrincipal,
  },
  botaoFechar: {
    backgroundColor: Paleta.cinzaSuave,
    padding: 8,
    borderRadius: 20,
  },
  conteudoScroll: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  blocoPerfil: {
    alignItems: 'center',
    marginBottom: 16,
  },
  areaAvatar: {
    marginBottom: 10,
  },
  avatarVazio: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: Paleta.primariaClara,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Paleta.primariaBorda,
  },
  avatarFoto: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: Paleta.primaria,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Paleta.primariaBorda,
  },
  textoIniciais: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  badgeCamera: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Paleta.primariaEscura,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Paleta.cinzaCard,
  },
  badgeCrown: {
    position: 'absolute',
    top: -4,
    left: -4,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Paleta.atencao,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Paleta.cinzaCard,
  },
  nomeUsuario: {
    fontSize: 18,
    fontWeight: '700',
    color: Paleta.textoPrincipal,
  },
  dicaFoto: {
    fontSize: 12,
    color: Paleta.textoMutado,
    marginTop: 3,
    marginBottom: 14,
  },
  linhaAgenciaConta: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  cardDadoBancario: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Paleta.cinzaSuave,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: Paleta.cinzaBorda,
  },
  labelDado: {
    fontSize: 11,
    color: Paleta.textoSecundario,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  valorDado: {
    fontSize: 14,
    fontWeight: '700',
    color: Paleta.textoPrincipal,
    marginTop: 1,
  },
  cardScore: {
    backgroundColor: Paleta.cinzaSuave,
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Paleta.cinzaBorda,
  },
  topoScore: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  labelScore: {
    fontSize: 12,
    fontWeight: '700',
    color: Paleta.textoSecundario,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  linhaValorScore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 2,
  },
  valorScore: {
    fontSize: 26,
    fontWeight: '800',
    color: Paleta.textoPrincipal,
    letterSpacing: -0.5,
  },
  badgeFaixaScore: {
    backgroundColor: Paleta.atencaoFundo,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  textoFaixaScore: {
    fontSize: 12,
    fontWeight: '700',
    color: '#B45309',
  },
  barraScore: {
    height: 8,
    borderRadius: 4,
    backgroundColor: Paleta.cinzaBorda,
    overflow: 'hidden',
  },
  barraScorePreenchida: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: Paleta.atencao,
  },
  legendaScore: {
    fontSize: 11,
    color: Paleta.textoMutado,
    marginTop: 8,
  },
  grupoMenu: {
    borderTopWidth: 1,
    borderTopColor: Paleta.cinzaBorda,
    paddingTop: 4,
  },
  itemMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    gap: 12,
  },
  iconeItemMenu: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: Paleta.cinzaSuave,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Paleta.cinzaBorda,
  },
  textoItem: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: Paleta.textoPrincipal,
  },
  pontoNovo: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Paleta.erro,
  },
  chevronItem: {
    marginLeft: 4,
  },
  itemSair: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    gap: 12,
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: Paleta.cinzaBorda,
  },
  textoSair: {
    fontSize: 15,
    fontWeight: '600',
    color: Paleta.erro,
  },
  versaoApp: {
    fontSize: 11,
    color: Paleta.textoMutado,
    textAlign: 'center',
    marginTop: 10,
  },
});
