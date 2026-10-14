import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from 'react-native';
import {
  ChevronRight,
  Banknote,
  Receipt,
  UserPlus,
} from 'lucide-react-native';
import { Paleta } from '@/constants/Colors';

interface BannerItem {
  id: string;
  titulo: string;
  descricao: string;
  corIconeFundo: string;
  corIconeBorda: string;
  corIcone: string;
  Icone: React.ElementType;
}

const BANNERS: BannerItem[] = [
  {
    id: 'emprestimo',
    titulo: 'Até R$ 2.000 disponível',
    descricao: 'Solicite seu empréstimo agora, rápido e sem burocracia.',
    corIconeFundo: '#EDE9FE',
    corIconeBorda: '#DDD6FE',
    corIcone: '#6123E2',
    Icone: Banknote,
  },
  {
    id: 'boletos',
    titulo: 'Pague boletos em até 12x',
    descricao: 'No crédito, direto no app. Sem complicação.',
    corIconeFundo: '#EFF6FF',
    corIconeBorda: '#BFDBFE',
    corIcone: '#2563EB',
    Icone: Receipt,
  },
  {
    id: 'convite',
    titulo: 'Convide para o PrimerPay',
    descricao: 'Coisas boas são para compartilhar. Indique e ganhe benefícios!',
    corIconeFundo: '#D1FAE5',
    corIconeBorda: '#A7F3D0',
    corIcone: '#059669',
    Icone: UserPlus,
  },
];

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BANNER_WIDTH = SCREEN_WIDTH - 32; // padding 16 de cada lado
const AUTO_PLAY_INTERVAL = 4500;

interface CarouselBannersProps {
  onPressBanner?: (id: string) => void;
}

export const CarouselBanners: React.FC<CarouselBannersProps> = ({
  onPressBanner,
}) => {
  const [indiceAtivo, setIndiceAtivo] = useState(0);
  const flatListRef = useRef<FlatList<BannerItem>>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-play
  const iniciarAutoPlay = useCallback(() => {
    pararAutoPlay();
    timerRef.current = setInterval(() => {
      setIndiceAtivo((prev) => {
        const proximo = (prev + 1) % BANNERS.length;
        flatListRef.current?.scrollToIndex({ index: proximo, animated: true });
        return proximo;
      });
    }, AUTO_PLAY_INTERVAL);
  }, []);

  const pararAutoPlay = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    iniciarAutoPlay();
    return pararAutoPlay;
  }, [iniciarAutoPlay, pararAutoPlay]);

  const onMomentumScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const index = Math.round(e.nativeEvent.contentOffset.x / BANNER_WIDTH);
      setIndiceAtivo(index);
      // Reinicia o auto-play ao interagir manualmente
      iniciarAutoPlay();
    },
    [iniciarAutoPlay],
  );

  const renderBanner = ({ item }: { item: BannerItem }) => {
    const { Icone } = item;
    return (
      <TouchableOpacity
        style={[styles.banner, { width: BANNER_WIDTH }]}
        activeOpacity={0.8}
        onPress={() => onPressBanner?.(item.id)}
        accessibilityLabel={item.titulo}
      >
        {/* Ícone */}
        <View
          style={[
            styles.iconeContainer,
            {
              backgroundColor: item.corIconeFundo,
              borderColor: item.corIconeBorda,
            },
          ]}
        >
          <Icone size={20} color={item.corIcone} strokeWidth={2.2} />
        </View>

        {/* Textos */}
        <View style={styles.textos}>
          <Text style={styles.titulo} numberOfLines={1}>
            {item.titulo}
          </Text>
          <Text style={styles.descricao} numberOfLines={2}>
            {item.descricao}
          </Text>
        </View>

        {/* Chevron */}
        <ChevronRight size={20} color={Paleta.textoMutado} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={BANNERS}
        renderItem={renderBanner}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={BANNER_WIDTH}
        decelerationRate="fast"
        onMomentumScrollEnd={onMomentumScrollEnd}
        onScrollBeginDrag={pararAutoPlay}
        getItemLayout={(_, index) => ({
          length: BANNER_WIDTH,
          offset: BANNER_WIDTH * index,
          index,
        })}
        contentContainerStyle={styles.listaConteudo}
      />

      {/* Dots */}
      <View style={styles.dots}>
        {BANNERS.map((item, i) => (
          <View
            key={item.id}
            style={[
              styles.dot,
              i === indiceAtivo ? styles.dotAtivo : styles.dotInativo,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  listaConteudo: {
    // sem padding horizontal — o banner já ocupa BANNER_WIDTH
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Paleta.cinzaCard,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Paleta.cinzaBorda,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    gap: 12,
  },
  iconeContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  textos: {
    flex: 1,
  },
  titulo: {
    fontSize: 14,
    fontWeight: '700',
    color: Paleta.textoPrincipal,
  },
  descricao: {
    fontSize: 12,
    fontWeight: '500',
    color: Paleta.textoSecundario,
    marginTop: 2,
    lineHeight: 16,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    gap: 6,
  },
  dot: {
    borderRadius: 4,
    height: 6,
  },
  dotAtivo: {
    width: 20,
    backgroundColor: Paleta.primaria,
  },
  dotInativo: {
    width: 6,
    backgroundColor: Paleta.cinzaBorda,
  },
});
