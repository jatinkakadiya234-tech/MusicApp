import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMusic } from '../context/MusicContext';
import { colors, typography, spacing, borderRadius } from '../theme/theme';

export const SongListItem = ({ song, index, onPress }) => {
  const { currentSong, isPlaying, playSong, toggleLikeSong, isSongLiked } = useMusic();

  const isCurrent = currentSong && currentSong.id === song.id;
  const liked = isSongLiked(song.id);

  const handlePress = () => {
    if (onPress) {
      onPress(song);
    } else {
      playSong(song);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, isCurrent && styles.activeContainer]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      {/* Index or Equalizer Icon */}
      <View style={styles.indexContainer}>
        {isCurrent && isPlaying ? (
          <Ionicons name="volume-high" size={18} color={colors.primary} />
        ) : (
          <Text style={[styles.indexText, isCurrent && { color: colors.primary }]}>
            {index !== undefined ? index + 1 : ''}
          </Text>
        )}
      </View>

      {/* Artwork */}
      <Image source={{ uri: song.artwork }} style={styles.artwork} />

      {/* Title & Artist */}
      <View style={styles.infoContainer}>
        <Text
          style={[styles.title, isCurrent && { color: colors.primary }]}
          numberOfLines={1}
        >
          {song.title}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {song.artist} • {song.album}
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => toggleLikeSong(song.id)}
        >
          <Ionicons
            name={liked ? 'heart' : 'heart-outline'}
            size={20}
            color={liked ? colors.heartActive : colors.textMuted}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="ellipsis-vertical" size={18} color={colors.textMuted} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.xs,
  },
  activeContainer: {
    backgroundColor: colors.surfaceElevated,
  },
  indexContainer: {
    width: 24,
    alignItems: 'center',
    marginRight: spacing.xs,
  },
  indexText: {
    fontSize: typography.fontSize.xs,
    color: colors.textMuted,
    fontWeight: typography.fontWeight.semibold,
  },
  artwork: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.sm,
    marginRight: spacing.md,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: typography.fontSize.sm,
    color: colors.textPrimary,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: 2,
  },
  artist: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  actionButton: {
    padding: spacing.xs,
  },
});

export default SongListItem;
