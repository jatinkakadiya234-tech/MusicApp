import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../theme/theme';
import { demoData } from '../data/demoData';

export const Header = ({ title, showAvatar = true, onProfilePress, onNotificationPress }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.headerContainer, { paddingTop: Math.max(insets.top + spacing.xs, spacing.md) }]}>
      <View style={styles.leftSection}>
        {showAvatar && (
          <TouchableOpacity onPress={onProfilePress} activeOpacity={0.8}>
            <Image
              source={{ uri: demoData.userProfile.avatar }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        )}
        <View style={styles.titleContainer}>
          <Text style={styles.greeting}>Good Evening</Text>
          <Text style={styles.titleText}>{title || demoData.userProfile.name}</Text>
        </View>
      </View>

      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.iconButton} onPress={onNotificationPress}>
          <Ionicons name="notifications-outline" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="settings-outline" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: colors.background,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  titleContainer: {
    justifyContent: 'center',
  },
  greeting: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  titleText: {
    fontSize: typography.fontSize.lg,
    color: colors.textPrimary,
    fontWeight: typography.fontWeight.bold,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
});

export default Header;
