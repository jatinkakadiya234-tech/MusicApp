import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { SongListItem } from '../components/SongListItem';
import { demoData } from '../data/demoData';
import { colors, typography, spacing, borderRadius } from '../theme/theme';
import { useMusic } from '../context/MusicContext';

export const HomeScreen = ({ navigation }) => {
  const { playSong } = useMusic();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: spacing.huge }} showsVerticalScrollIndicator={false}>
      {/* App Header */}
      <Header
        onProfilePress={() => navigation.navigate('Profile')}
        onNotificationPress={() => {}}
      />

      {/* Featured Banner Hero */}
      <View style={styles.sectionContainer}>
        <View style={styles.heroCard}>
          <Image
            source={{ uri: demoData.albums[0].cover }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>FEATURED ALBUM</Text>
            </View>
            <Text style={styles.heroTitle}>{demoData.albums[0].title}</Text>
            <Text style={styles.heroSubtitle}>
              {demoData.albums[0].artist} • {demoData.albums[0].tracksCount} Tracks
            </Text>
            <TouchableOpacity
              style={styles.heroPlayButton}
              onPress={() => playSong(demoData.songs[0])}
            >
              <Ionicons name="play" size={18} color="#FFFFFF" />
              <Text style={styles.heroPlayText}>Play Album</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Recently Played Horizontal Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recently Played</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
          {demoData.songs.slice(0, 5).map((song) => (
            <TouchableOpacity
              key={song.id}
              style={styles.cardItem}
              onPress={() => playSong(song)}
              activeOpacity={0.8}
            >
              <Image source={{ uri: song.artwork }} style={styles.cardImage} />
              <Text style={styles.cardTitle} numberOfLines={1}>
                {song.title}
              </Text>
              <Text style={styles.cardSubtitle} numberOfLines={1}>
                {song.artist}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Trending Songs Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending Right Now</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        {demoData.songs.slice(0, 4).map((song, index) => (
          <SongListItem key={song.id} song={song} index={index} />
        ))}
      </View>

      {/* Top Artists Horizontal Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Artists</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
          {demoData.artists.map((artist) => (
            <TouchableOpacity
              key={artist.id}
              style={styles.artistItem}
              activeOpacity={0.8}
            >
              <Image source={{ uri: artist.image }} style={styles.artistImage} />
              <Text style={styles.artistName} numberOfLines={1}>
                {artist.name}
              </Text>
              <Text style={styles.artistRole}>Artist</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Featured Playlists Grid */}
      <View style={[styles.sectionContainer, { marginBottom: spacing.huge }]}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Playlists</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
          {demoData.playlists.map((playlist) => (
            <TouchableOpacity
              key={playlist.id}
              style={styles.playlistCard}
              activeOpacity={0.8}
            >
              <Image source={{ uri: playlist.cover }} style={styles.playlistImage} />
              <Text style={styles.playlistTitle} numberOfLines={1}>
                {playlist.title}
              </Text>
              <Text style={styles.playlistFollowers} numberOfLines={1}>
                {playlist.followers}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  sectionContainer: {
    marginTop: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  seeAllText: {
    fontSize: typography.fontSize.xs,
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
  },
  heroCard: {
    height: 180,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'flex-end',
    borderWidth: 1,
    borderColor: colors.border,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(9, 10, 15, 0.65)',
  },
  heroContent: {
    padding: spacing.lg,
  },
  heroBadge: {
    backgroundColor: colors.primary,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  heroBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.heavy,
    color: colors.textPrimary,
  },
  heroSubtitle: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  heroPlayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
    gap: 6,
  },
  heroPlayText: {
    color: '#FFFFFF',
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
  },
  horizontalList: {
    gap: spacing.md,
    paddingRight: spacing.lg,
  },
  cardItem: {
    width: 140,
  },
  cardImage: {
    width: 140,
    height: 140,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.xs,
  },
  cardTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
  },
  cardSubtitle: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  artistItem: {
    alignItems: 'center',
    width: 100,
  },
  artistImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: spacing.xs,
    borderWidth: 2,
    borderColor: colors.borderLight,
  },
  artistName: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  artistRole: {
    fontSize: 10,
    color: colors.textMuted,
  },
  playlistCard: {
    width: 160,
  },
  playlistImage: {
    width: 160,
    height: 160,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.xs,
  },
  playlistTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
  },
  playlistFollowers: {
    fontSize: typography.fontSize.xs,
    color: colors.textMuted,
  },
});

export default HomeScreen;
