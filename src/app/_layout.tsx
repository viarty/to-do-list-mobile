import Header from '@/components/Header';
import '@/styles/global.css';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform, SafeAreaView } from 'react-native';
import Toast from 'react-native-toast-message';

import { toastConfig } from '@/components/ToastConfig';
import { NotesProvider } from '@/contexts/NotesContext';
import 'react-native-reanimated';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Poppins-Thin': require('../../assets/fonts/Poppins-Thin.ttf'),
    'Poppins-ThinItalic': require('../../assets/fonts/Poppins-ThinItalic.ttf'),
    'Poppins-ExtraLight': require('../../assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-ExtraLightItalic': require('../../assets/fonts/Poppins-ExtraLightItalic.ttf'),
    'Poppins-Light': require('../../assets/fonts/Poppins-Light.ttf'),
    'Poppins-LightItalic': require('../../assets/fonts/Poppins-LightItalic.ttf'),
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Italic': require('../../assets/fonts/Poppins-Italic.ttf'),
    'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-MediumItalic': require('../../assets/fonts/Poppins-MediumItalic.ttf'),
    'Poppins-SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-SemiBoldItalic': require('../../assets/fonts/Poppins-SemiBoldItalic.ttf'),
    'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-BoldItalic': require('../../assets/fonts/Poppins-BoldItalic.ttf'),
    'Poppins-ExtraBold': require('../../assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraBoldItalic': require('../../assets/fonts/Poppins-ExtraBoldItalic.ttf'),
    'Poppins-Black': require('../../assets/fonts/Poppins-Black.ttf'),
    'Poppins-BlackItalic': require('../../assets/fonts/Poppins-BlackItalic.ttf'),
  });

  const paddingTop = Platform.OS === 'android' ? 25 : 0;

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NotesProvider>
      <SafeAreaView style={{ paddingTop }} className="flex-1">
        <Header />
        <Slot />
        <StatusBar style="dark" />
      </SafeAreaView>
      <Toast config={toastConfig} />
    </NotesProvider>
  );
}
