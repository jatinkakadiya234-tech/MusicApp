import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useMusic } from '../context/MusicContext';
import { colors, typography, spacing, borderRadius } from '../theme/theme';

export const FullPlayerModal = () => {
  const {
    currentSong,
    isPlaying,
    isFullPlayerVisible,
    setIsFullPlayerVisible,
    togglePlayPause,
    toggleLikeSong,
    isSongLiked,
    nextSong,
    previousSong,
    queue,
    playSong,
    positionMillis,
    durationMillis,
    progressPercent,
    formatTime,
    seekTo,
  } = useMusic();

  const [activeTab, setActiveTab] = useState('player'); // 'player' | 'lyrics' | 'queue'
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  if (!currentSong) return null;

  const liked = isSongLiked(currentSong.id);

  return (
    <Modal
      visible={isFullPlayerVisible}
      animationType="slide"
      transparent={false}
      onRequestClose={() => setIsFullPlayerVisible(false)}
    >
      <SafeAreaView style={styles.container}>
        {/* Top Bar */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setIsFullPlayerVisible(false)}
          >
            <Ionicons name="chevron-down" size={28} color={colors.textPrimary} />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text style={styles.headerSubtitle}>PLAYING FROM ALBUM</Text>
            <Text style={styles.headerTitle} numberOfLines={1}>
              {currentSong.album}
            </Text>
          </View>

          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="ellipsis-horizontal" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Tab Selector Bar */}
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'player' && styles.activeTabItem]}
            onPress={() => setActiveTab('player')}
          >
            <Text style={[styles.tabText, activeTab === 'player' && styles.activeTabText]}>
              Player
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'lyrics' && styles.activeTabItem]}
            onPress={() => setActiveTab('lyrics')}
          >
            <Text style={[styles.tabText, activeTab === 'lyrics' && styles.activeTabText]}>
              Lyrics
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'queue' && styles.activeTabItem]}
            onPress={() => setActiveTab('queue')}
          >
            <Text style={[styles.tabText, activeTab === 'queue' && styles.activeTabText]}>
              Queue ({queue.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab 1: Full Player View */}
        {activeTab === 'player' && (
          <ScrollView contentContainerStyle={styles.playerContent} showsVerticalScrollIndicator={false}>
            {/* Main Artwork */}
            <View style={styles.artworkContainer}>
              <Image source={{ uri: currentSong.artwork }} style={styles.largeArtwork} />
            </View>

            {/* Song Meta */}
            <View style={styles.metaRow}>
              <View style={styles.songInfoContainer}>
                <Text style={styles.songTitle}>{currentSong.title}</Text>
                <Text style={styles.artistName}>{currentSong.artist}</Text>
              </View>

              <TouchableOpacity
                style={styles.likeButton}
                onPress={() => toggleLikeSong(currentSong.id)}
              >
                <Ionicons
                  name={liked ? 'heart' : 'heart-outline'}
                  size={28}
                  color={liked ? colors.heartActive : colors.textSecondary}
                />
              </TouchableOpacity>
            </View>

            {/* Dynamic Scrub Bar */}
            <TouchableOpacity
              style={styles.scrubContainer}
              activeOpacity={0.9}
              onPress={(e) => {
                // Quick seek touch estimation
                const touchX = e.nativeEvent.locationX;
                const width = 300; // approximate container width
                const pct = Math.max(0, Math.min(1, touchX / width));
                seekTo(pct * durationMillis);
              }}
            >
              <View style={styles.scrubBarTrack}>
                <View
                  style={[
                    styles.scrubBarProgress,
                    { width: `${Math.min(Math.max(progressPercent, 0), 100)}%` },
                  ]}
                />
                <View
                  style={[
                    styles.scrubThumb,
                    { left: `${Math.min(Math.max(progressPercent, 0), 98)}%` },
                  ]}
                />
              </View>
              <View style={styles.timeRow}>
                <Text style={styles.timeText}>{formatTime(positionMillis)}</Text>
                <Text style={styles.timeText}>
                  {durationMillis > 1000 ? formatTime(durationMillis) : currentSong.duration}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Main Audio Controls */}
            <View style={styles.mainControlsRow}>
              <TouchableOpacity onPress={() => setIsShuffle(prev => !prev)}>
                <Ionicons
                  name="shuffle"
                  size={24}
                  color={isShuffle ? colors.primary : colors.textMuted}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={previousSong}>
                <Ionicons name="play-skip-back" size={32} color={colors.textPrimary} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.largePlayButton} onPress={togglePlayPause}>
                <Ionicons
                  name={isPlaying ? 'pause' : 'play'}
                  size={36}
                  color={colors.textOnPrimary}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={nextSong}>
                <Ionicons name="play-skip-forward" size={32} color={colors.textPrimary} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setIsRepeat(prev => !prev)}>
                <Ionicons
                  name="repeat"
                  size={24}
                  color={isRepeat ? colors.primary : colors.textMuted}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}

        {/* Tab 2: Lyrics View */}
        {activeTab === 'lyrics' && (
          <ScrollView contentContainerStyle={styles.lyricsContainer} showsVerticalScrollIndicator={false}>
            <Text style={styles.lyricsTitle}>Lyrics</Text>
            <Text style={styles.lyricsText}>{currentSong.lyrics}</Text>
          </ScrollView>
        )}

        {/* Tab 3: Queue View */}
        {activeTab === 'queue' && (
          <ScrollView contentContainerStyle={styles.queueContainer} showsVerticalScrollIndicator={false}>
            <Text style={styles.queueHeader}>Next Up in Queue</Text>
            {queue.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.queueItem,
                  item.id === currentSong.id && styles.activeQueueItem,
                ]}
                onPress={() => playSong(item)}
              >
                <Text style={styles.queueIndex}>{index + 1}</Text>
                <Image source={{ uri: item.artwork }} style={styles.queueArtwork} />
                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      styles.queueTitle,
                      item.id === currentSong.id && { color: colors.primary },
                    ]}
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>
                  <Text style={styles.queueArtist} numberOfLines={1}>
                    {item.artist}
                  </Text>
                </View>
                <Ionicons
                  name={item.id === currentSong.id && isPlaying ? 'volume-high' : 'reorder-two'}
                  size={20}
                  color={item.id === currentSong.id ? colors.primary : colors.textMuted}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  headerCenter: {
    alignItems: 'center',
    flex: 1,
  },
  headerSubtitle: {
    fontSize: 10,
    color: colors.textSecondary,
    letterSpacing: 1,
    fontWeight: typography.fontWeight.semibold,
  },
  headerTitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textPrimary,
    fontWeight: typography.fontWeight.bold,
    marginTop: 2,
  },
  iconButton: {
    padding: spacing.xs,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.lg,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tabItem: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  activeTabItem: {
    backgroundColor: colors.surfaceElevated,
  },
  tabText: {
    fontSize: typography.fontSize.sm,
    color: colors.textMuted,
    fontWeight: typography.fontWeight.medium,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
  },
  playerContent: {
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  artworkContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    marginBottom: spacing.xxl,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 10,
  },
  largeArtwork: {
    width: '100%',
    height: '100%',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: spacing.xl,
  },
  songInfoContainer: {
    flex: 1,
    marginRight: spacing.md,
  },
  songTitle: {
    fontSize: typography.fontSize.xxl,
    color: colors.textPrimary,
    fontWeight: typography.fontWeight.bold,
    marginBottom: 4,
  },
  artistName: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
  likeButton: {
    padding: spacing.xs,
  },
  scrubContainer: {
    width: '100%',
    marginBottom: spacing.xxl,
    paddingVertical: spacing.xs,
  },
  scrubBarTrack: {
    height: 4,
    backgroundColor: colors.surfaceElevated,
    borderRadius: 2,
    position: 'relative',
    justifyContent: 'center',
  },
  scrubBarProgress: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  scrubThumb: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.textPrimary,
    position: 'absolute',
    top: -5,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xs + 2,
  },
  timeText: {
    fontSize: typography.fontSize.xs,
    color: colors.textMuted,
  },
  mainControlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: spacing.lg,
  },
  largePlayButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  lyricsContainer: {
    padding: spacing.xxl,
  },
  lyricsTitle: {
    fontSize: typography.fontSize.xl,
    color: colors.textPrimary,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.lg,
  },
  lyricsText: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    lineHeight: 28,
  },
  queueContainer: {
    padding: spacing.lg,
  },
  queueHeader: {
    fontSize: typography.fontSize.lg,
    color: colors.textPrimary,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.md,
  },
  queueItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.md,
  },
  activeQueueItem: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: borderRadius.md,
  },
  queueIndex: {
    color: colors.textMuted,
    fontSize: typography.fontSize.sm,
    width: 20,
  },
  queueArtwork: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.sm,
  },
  queueTitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textPrimary,
    fontWeight: typography.fontWeight.semibold,
  },
  queueArtist: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
});

export default FullPlayerModal;
