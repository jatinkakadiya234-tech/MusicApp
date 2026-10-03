import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { MusicProvider } from './src/context/MusicContext';
import AppNavigator from './src/navigation/AppNavigator';
import paperTheme from './src/theme/paperTheme';
import { colors } from './src/theme/theme';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={paperTheme}>
        <MusicProvider>
          <StatusBar barStyle="light-content" backgroundColor={colors.background} />
          <AppNavigator />
        </MusicProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
