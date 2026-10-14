import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import {
  ChevronRight,
  HelpCircle,
  MessageCircle,
  BookOpen,
  Search,
} from 'lucide-react-native';
import { Paleta } from '@/constants/Colors';

interface CartaoAjudaProps {
  onFalarConosco?: () => void;
  onDuvidasFrequentes?: () => void;
  onBuscar?: () => void;
}

export const CartaoAjuda: React.FC<CartaoAjudaProps> = ({
  onFalarConosco,
  onDuvidasFrequentes,
  onBuscar,
}) => {
  const emBreve = (nome: string) =>
    Alert.alert(nome, 'Recurso demonstrativo (MVP) — em breve!');

  const opcoes = [
    {
      chave: 'falar',
      rotulo: 'Fale com a gente',
      descricao: 'Chat, e-mail ou telefone',
      Icone: MessageCircle,
      corIcone: '#6123E2',
      corFundo: '#EDE9FE',
      corBorda: '#DDD6FE',
      acao: onFalarConosco ?? (() => emBreve('Fale com a gente')),
    },
    {
      chave: 'duvidas',
      rotulo: 'Principais dúvidas',
      descricao: 'Respostas rápidas para você',
      Icone: BookOpen,
      corIcone: '#2563EB',
      corFundo: '#EFF6FF',
      corBorda: '#BFDBFE',
      acao: onDuvidasFrequentes ?? (() => emBreve('Principais dúvidas')),
    },
    {
      chave: 'buscar',
      rotulo: 'Encontre o que precisa',
      descricao: 'Busque por assunto ou serviço',
      Icone: Search,
      corIcone: '#059669',
      corFundo: '#D1FAE5',
      corBorda: '#A7F3D0',
      acao: onBuscar ?? (() => emBreve('Buscar')),
    },
  ];

  return (
    <View style={styles.card}>
      {/* Cabeçalho */}
      <View style={styles.cabecalho}>
        <View style={styles.iconeCabecalho}>
          <HelpCircle size={18} color={Paleta.primaria} strokeWidth={2.2} />
        </View>
        <View style={styles.textoCabecalho}>
          <Text style={styles.titulo}>Precisa de ajuda?</Text>
          <Text style={styles.subtitulo}>
            Estamos aqui para te ajudar no que precisar
          </Text>
        </View>
      </View>

      {/* Opções */}
      <View style={styles.listaOpcoes}>
        {opcoes.map(
          ({ chave, rotulo, descricao, Icone, corIcone, corFundo, corBorda, acao }, index) => (
            <TouchableOpacity
              key={chave}
              style={[
                styles.opcao,
                index < opcoes.length - 1 && styles.opcaoBorda,
              ]}
              onPress={acao}
              activeOpacity={0.7}
              accessibilityLabel={rotulo}
            >
              <View
                style={[
                  styles.iconeOpcao,
                  { backgroundColor: corFundo, borderColor: corBorda },
                ]}
              >
                <Icone size={18} color={corIcone} strokeWidth={2.2} />
              </View>

              <View style={styles.textoOpcao}>
                <Text style={styles.rotuloOpcao}>{rotulo}</Text>
                <Text style={styles.descricaoOpcao}>{descricao}</Text>
              </View>

              <ChevronRight size={18} color={Paleta.textoMutado} />
            </TouchableOpacity>
          ),
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Paleta.cinzaCard,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Paleta.cinzaBorda,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  iconeCabecalho: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: Paleta.primariaClara,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Paleta.primariaBorda,
  },
  textoCabecalho: {
    flex: 1,
  },
  titulo: {
    fontSize: 15,
    fontWeight: '700',
    color: Paleta.textoPrincipal,
  },
  subtitulo: {
    fontSize: 12,
    fontWeight: '500',
    color: Paleta.textoSecundario,
    marginTop: 1,
  },
  listaOpcoes: {
    gap: 0,
  },
  opcao: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  opcaoBorda: {
    borderBottomWidth: 1,
    borderBottomColor: Paleta.cinzaBorda,
  },
  iconeOpcao: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  textoOpcao: {
    flex: 1,
  },
  rotuloOpcao: {
    fontSize: 14,
    fontWeight: '600',
    color: Paleta.textoPrincipal,
  },
  descricaoOpcao: {
    fontSize: 12,
    fontWeight: '500',
    color: Paleta.textoSecundario,
    marginTop: 1,
  },
});
