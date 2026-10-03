import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { SongListItem } from '../components/SongListItem';
import { demoData } from '../data/demoData';
import { colors, typography, spacing, borderRadius } from '../theme/theme';
import { useMusic } from '../context/MusicContext';

export const LibraryScreen = () => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('liked'); // 'liked' | 'playlists' | 'albums'
  const { likedSongIds } = useMusic();

  const likedSongs = demoData.songs.filter(song => likedSongIds.includes(song.id));

  return (
    <View style={styles.container}>
      {/* Top Title & Add Button */}
      <View style={[styles.headerRow, { paddingTop: Math.max(insets.top + spacing.xs, spacing.lg) }]}>
        <Text style={styles.headerTitle}>Your Library</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Tabs Selector */}
      <View style={styles.tabSelectorRow}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'liked' && styles.activeTabButton]}
          onPress={() => setActiveTab('liked')}
        >
          <Text style={[styles.tabText, activeTab === 'liked' && styles.activeTabText]}>
            Liked Songs ({likedSongs.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'playlists' && styles.activeTabButton]}
          onPress={() => setActiveTab('playlists')}
        >
          <Text style={[styles.tabText, activeTab === 'playlists' && styles.activeTabText]}>
            Playlists
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'albums' && styles.activeTabButton]}
          onPress={() => setActiveTab('albums')}
        >
          <Text style={[styles.tabText, activeTab === 'albums' && styles.activeTabText]}>
            Albums
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content Scroll View */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Tab 1: Liked Songs */}
        {activeTab === 'liked' && (
          <View>
            {likedSongs.length > 0 ? (
              likedSongs.map((song, index) => (
                <SongListItem key={song.id} song={song} index={index} />
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <Ionicons name="heart-dislike-outline" size={48} color={colors.textMuted} />
                <Text style={styles.emptyTitle}>No Liked Songs Yet</Text>
                <Text style={styles.emptySubtitle}>
                  Tap the heart icon on any song to save it to your library.
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Tab 2: Playlists */}
        {activeTab === 'playlists' && (
          <View style={styles.gridContainer}>
            {demoData.playlists.map(playlist => (
              <TouchableOpacity
                key={playlist.id}
                style={styles.gridCard}
                activeOpacity={0.8}
              >
                <Image source={{ uri: playlist.cover }} style={styles.gridImage} />
                <Text style={styles.gridTitle} numberOfLines={1}>
                  {playlist.title}
                </Text>
                <Text style={styles.gridSubtitle} numberOfLines={1}>
                  {playlist.songsCount} Tracks • {playlist.followers}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Tab 3: Albums */}
        {activeTab === 'albums' && (
          <View style={styles.gridContainer}>
            {demoData.albums.map(album => (
              <TouchableOpacity
                key={album.id}
                style={styles.gridCard}
                activeOpacity={0.8}
              >
                <Image source={{ uri: album.cover }} style={styles.gridImage} />
                <Text style={styles.gridTitle} numberOfLines={1}>
                  {album.title}
                </Text>
                <Text style={styles.gridSubtitle} numberOfLines={1}>
                  {album.artist} • {album.year}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  headerTitle: {
    fontSize: typography.fontSize.header,
    fontWeight: typography.fontWeight.heavy,
    color: colors.textPrimary,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabSelectorRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeTabButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tabText: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.semibold,
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.huge,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  gridCard: {
    width: '47%',
    marginBottom: spacing.md,
  },
  gridImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.xs,
  },
  gridTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
  },
  gridSubtitle: {
    fontSize: typography.fontSize.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.huge,
  },
  emptyTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginTop: spacing.md,
  },
  emptySubtitle: {
    fontSize: typography.fontSize.xs,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 4,
  },
});

export default LibraryScreen;
