import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Platform, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationBar } from 'expo-navigation-bar';
import 'react-native-reanimated';

import { PaymentProvider } from '@/context/PaymentContext';
import { Paleta } from '@/constants/Colors';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Sincroniza barras do sistema (StatusBar e NavigationBar) com o fundo do app
  useEffect(() => {
    if (Platform.OS === 'android') {
      RNStatusBar.setBackgroundColor(Paleta.cinzaFundo);
      RNStatusBar.setBarStyle('dark-content');
      try {
        NavigationBar.setStyle('dark');
      } catch {}
    }
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <PaymentProvider>
      {/* Sincroniza a Ilha Dinâmica / Notch / Barra de Status superior */}
      <StatusBar style="dark" />
      {/* Sincroniza a Barra de Botões do sistema inferior */}
      {Platform.OS === 'android' && <NavigationBar style="dark" />}
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: Paleta.cinzaFundo },
        }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{
            presentation: 'modal',
            headerTitle: 'Sobre o PrimerPay',
            headerStyle: { backgroundColor: Paleta.cinzaFundo },
            headerTintColor: Paleta.textoPrincipal,
            headerShadowVisible: false,
          }}
        />
      </Stack>
    </PaymentProvider>
  );
}
