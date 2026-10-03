import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMusic } from '../context/MusicContext';
import { colors, typography, spacing, borderRadius } from '../theme/theme';

export const MiniPlayerBar = () => {
  const {
    currentSong,
    isPlaying,
    progressPercent,
    togglePlayPause,
    toggleLikeSong,
    isSongLiked,
    setIsFullPlayerVisible,
  } = useMusic();

  if (!currentSong) return null;

  const liked = isSongLiked(currentSong.id);

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.95}
      onPress={() => setIsFullPlayerVisible(true)}
    >
      {/* Dynamic Progress Line */}
      <View style={styles.progressBarBackground}>
        <View
          style={[
            styles.progressBarActive,
            { width: `${Math.min(Math.max(progressPercent, 0), 100)}%` },
          ]}
        />
      </View>

      <View style={styles.content}>
        {/* Artwork */}
        <Image source={{ uri: currentSong.artwork }} style={styles.artwork} />

        {/* Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {currentSong.title}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {currentSong.artist} • {currentSong.album}
          </Text>
        </View>

        {/* Controls */}
        <View style={styles.controlsRow}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={(e) => {
              e.stopPropagation();
              toggleLikeSong(currentSong.id);
            }}
          >
            <Ionicons
              name={liked ? 'heart' : 'heart-outline'}
              size={22}
              color={liked ? colors.heartActive : colors.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.playButton}
            onPress={(e) => {
              e.stopPropagation();
              togglePlayPause();
            }}
          >
            <Ionicons
              name={isPlaying ? 'pause' : 'play'}
              size={20}
              color={colors.textOnPrimary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.playerBackground,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  progressBarBackground: {
    height: 3,
    backgroundColor: colors.playerProgressBackground,
    width: '100%',
    marginBottom: spacing.xs,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarActive: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  artwork: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.sm,
    marginRight: spacing.md,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: typography.fontSize.sm,
    color: colors.textPrimary,
    fontWeight: typography.fontWeight.semibold,
  },
  artist: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconButton: {
    padding: spacing.xs,
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MiniPlayerBar;
