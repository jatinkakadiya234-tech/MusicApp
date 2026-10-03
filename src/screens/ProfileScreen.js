import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { demoData } from '../data/demoData';
import { colors, typography, spacing, borderRadius } from '../theme/theme';

export const ProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const { userProfile } = demoData;
  const [isHighAudio, setIsHighAudio] = useState(true);
  const [isOfflineOnly, setIsOfflineOnly] = useState(false);
  const [isNotifications, setIsNotifications] = useState(true);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.scrollContent, { paddingTop: Math.max(insets.top + spacing.xs, spacing.lg) }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Info Header */}
      <View style={styles.profileHeader}>
        <Image source={{ uri: userProfile.avatar }} style={styles.avatar} />
        <Text style={styles.userName}>{userProfile.name}</Text>
        <Text style={styles.userHandle}>{userProfile.handle}</Text>
        <View style={styles.planBadge}>
          <Ionicons name="shield-checkmark" size={14} color={colors.primary} />
          <Text style={styles.planBadgeText}>{userProfile.plan}</Text>
        </View>
      </View>

      {/* Listening Stats Grid */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{userProfile.stats.playlistsCount}</Text>
          <Text style={styles.statLabel}>Playlists</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>{userProfile.stats.likedSongsCount}</Text>
          <Text style={styles.statLabel}>Liked Songs</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>{userProfile.stats.hoursListened}</Text>
          <Text style={styles.statLabel}>Listening</Text>
        </View>
      </View>

      {/* Favorite Genres Chips */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Favorite Genres</Text>
        <View style={styles.genresRow}>
          {userProfile.favoriteGenres.map((genre, i) => (
            <View key={i} style={styles.genreChip}>
              <Text style={styles.genreChipText}>{genre}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* App Settings List */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Audio & Settings</Text>

        <View style={styles.settingCard}>
          <View style={styles.settingRow}>
            <Ionicons name="musical-notes-outline" size={20} color={colors.primary} />
            <Text style={styles.settingText}>Lossless Hi-Fi Audio Quality</Text>
            <Switch
              value={isHighAudio}
              onValueChange={setIsHighAudio}
              trackColor={{ false: colors.border, true: colors.primary }}
            />
          </View>

          <View style={styles.settingRow}>
            <Ionicons name="cloud-offline-outline" size={20} color={colors.primary} />
            <Text style={styles.settingText}>Offline Mode Only</Text>
            <Switch
              value={isOfflineOnly}
              onValueChange={setIsOfflineOnly}
              trackColor={{ false: colors.border, true: colors.primary }}
            />
          </View>

          <View style={styles.settingRow}>
            <Ionicons name="notifications-outline" size={20} color={colors.primary} />
            <Text style={styles.settingText}>New Release Alerts</Text>
            <Switch
              value={isNotifications}
              onValueChange={setIsNotifications}
              trackColor={{ false: colors.border, true: colors.primary }}
            />
          </View>
        </View>
      </View>

      {/* Account Actions */}
      <TouchableOpacity style={styles.logoutButton}>
        <Ionicons name="log-out-outline" size={20} color={colors.error} />
        <Text style={styles.logoutText}>Log Out Account</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.huge,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    paddingTop: spacing.md,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: colors.primary,
    marginBottom: spacing.md,
  },
  userName: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.heavy,
    color: colors.textPrimary,
  },
  userHandle: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  planBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surfaceElevated,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: borderRadius.full,
    borderColor: colors.border,
    borderWidth: 1,
    marginTop: spacing.md,
  },
  planBadgeText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: typography.fontWeight.semibold,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    borderColor: colors.border,
    borderWidth: 1,
  },
  statValue: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.heavy,
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  genresRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs + 2,
  },
  genreChip: {
    backgroundColor: colors.surfaceElevated,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
  genreChipText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
  },
  settingCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderColor: colors.border,
    borderWidth: 1,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  settingText: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: typography.fontSize.xs + 1,
    marginLeft: spacing.md,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.md,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: borderRadius.md,
    borderColor: colors.error,
    borderWidth: 1,
    marginTop: spacing.md,
  },
  logoutText: {
    color: colors.error,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
  },
});

export default ProfileScreen;
