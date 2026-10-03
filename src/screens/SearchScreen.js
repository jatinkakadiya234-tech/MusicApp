import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
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

export const SearchScreen = () => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { playSong } = useMusic();

  const categories = ['All', 'Synthwave', 'Ambient Electronic', 'Lo-Fi Beats', 'Pop Hits'];

  // Filter songs based on search query and selected category
  const filteredSongs = demoData.songs.filter((song) => {
    const matchesQuery =
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.album.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || song.category === selectedCategory;

    return matchesQuery && matchesCategory;
  });

  return (
    <View style={styles.container}>
      {/* Header & Search Input */}
      <View style={[styles.headerSection, { paddingTop: Math.max(insets.top + spacing.xs, spacing.lg) }]}>
        <Text style={styles.headerTitle}>Explore Music</Text>
        
        <View style={styles.searchBarContainer}>
          <Ionicons name="search" size={20} color={colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search songs, artists, or albums..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>

        {/* Category Filter Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryChipsRow}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.chip,
                selectedCategory === cat && styles.activeChip,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.chipText,
                  selectedCategory === cat && styles.activeChipText,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* If Search Query or Category Active -> Show Filtered Results */}
        {searchQuery.length > 0 || selectedCategory !== 'All' ? (
          <View>
            <Text style={styles.resultsHeader}>
              Results ({filteredSongs.length})
            </Text>

            {filteredSongs.length > 0 ? (
              filteredSongs.map((song, index) => (
                <SongListItem key={song.id} song={song} index={index} />
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <Ionicons name="search-outline" size={48} color={colors.textMuted} />
                <Text style={styles.emptyTitle}>No Music Found</Text>
                <Text style={styles.emptySubtitle}>
                  Try searching for another song, artist, or genre.
                </Text>
              </View>
            )}
          </View>
        ) : (
          /* Default Browse Genres Grid */
          <View>
            <Text style={styles.sectionTitle}>Browse Genres</Text>
            <View style={styles.genreGrid}>
              {demoData.genres.map((genre) => (
                <TouchableOpacity
                  key={genre.id}
                  style={[styles.genreCard, { backgroundColor: genre.color }]}
                  activeOpacity={0.85}
                  onPress={() => setSelectedCategory(genre.name)}
                >
                  <Text style={styles.genreName}>{genre.name}</Text>
                  <Image source={{ uri: genre.image }} style={styles.genreImage} />
                </TouchableOpacity>
              ))}
            </View>
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
  headerSection: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: typography.fontSize.header,
    fontWeight: typography.fontWeight.heavy,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  searchInput: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: typography.fontSize.sm,
    marginLeft: spacing.xs,
  },
  categoryChipsRow: {
    gap: spacing.xs + 2,
    paddingBottom: spacing.xs,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
  },
  activeChipText: {
    color: '#FFFFFF',
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.huge,
  },
  resultsHeader: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  genreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  genreCard: {
    width: '47%',
    height: 100,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'flex-start',
  },
  genreName: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: '#FFFFFF',
    zIndex: 2,
  },
  genreImage: {
    width: 70,
    height: 70,
    borderRadius: borderRadius.md,
    position: 'absolute',
    bottom: -10,
    right: -10,
    transform: [{ rotate: '15deg' }],
    opacity: 0.85,
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

export default SearchScreen;
