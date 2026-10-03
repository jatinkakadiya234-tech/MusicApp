import { MD3DarkTheme } from 'react-native-paper';
import { colors } from './theme';

export const paperTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: colors.primary,
    secondary: colors.secondary,
    background: colors.background,
    surface: colors.surface,
    surfaceVariant: colors.surfaceElevated,
    onBackground: colors.textPrimary,
    onSurface: colors.textPrimary,
    outline: colors.border,
    error: colors.error,
  },
};

export default paperTheme;
