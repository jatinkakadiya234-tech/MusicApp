import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { NativeModules, View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import TrackPlayer, {
  useProgress,
  useTrackPlayerEvents,
  Event,
  State,
} from 'react-native-track-player';
import { demoData } from '../data/demoData';
import { setupTrackPlayer } from '../services/trackPlayerService';

const HTML_AUDIO_PLAYER = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="background:transparent;margin:0;padding:0;">
  <audio id="player" preload="auto" playsinline></audio>
  <script>
    const p = document.getElementById('player');
    
    p.ontimeupdate = () => {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'timeupdate',
        position: p.currentTime,
        duration: p.duration || 0
      }));
    };

    p.onended = () => {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'ended'
      }));
    };

    p.onplay = () => {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'state',
        playing: true
      }));
    };

    p.onpause = () => {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'state',
        playing: false
      }));
    };

    window.playAudio = (url) => {
      if (p.src !== url) {
        p.src = url;
      }
      p.play().catch(function(e) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'error',
          error: e.toString()
        }));
      });
    };

    window.pauseAudio = () => {
      p.pause();
    };

    window.seekAudio = (pos) => {
      p.currentTime = pos;
    };
  </script>
</body>
</html>
`;

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(demoData.songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likedSongIds, setLikedSongIds] = useState(
    demoData.songs.filter((s) => s.isLiked).map((s) => s.id)
  );
  const [isFullPlayerVisible, setIsFullPlayerVisible] = useState(false);
  const [queue] = useState(demoData.songs);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  const [fallbackPosition, setFallbackPosition] = useState(0);
  const [webAudioDuration, setWebAudioDuration] = useState(0);

  const webViewRef = useRef(null);
  const timerRef = useRef(null);

  const isMockPlayer = Boolean(NativeModules.TrackPlayerModule?.__isMock);

  // Native TrackPlayer progress hook
  const nativeProgress = useProgress(500);

  const formatSongForTrackPlayer = (song) => ({
    id: String(song.id),
    url: song.audioUrl,
    title: song.title,
    artist: song.artist,
    album: song.album || 'Single',
    artwork: song.artwork,
    duration: song.durationSec || 300,
  });

  // Initialize TrackPlayer on startup if running in native build
  useEffect(() => {
    let isMounted = true;
    const initPlayer = async () => {
      if (!isMockPlayer) {
        const ready = await setupTrackPlayer();
        if (isMounted && ready) {
          setIsPlayerReady(true);
          try {
            const initialTracks = demoData.songs.map(formatSongForTrackPlayer);
            await TrackPlayer.reset();
            await TrackPlayer.add(initialTracks);
          } catch (e) {
            console.log('TrackPlayer queue setup notice:', e);
          }
        }
      }
    };
    initPlayer();
    return () => {
      isMounted = false;
    };
  }, [isMockPlayer]);

  // Listen for native playback events from Android Lock Screen & Notification controls
  useTrackPlayerEvents(
    [Event.PlaybackActiveTrackChanged, Event.PlaybackState],
    async (event) => {
      if (isMockPlayer) return;
      try {
        if (event.type === Event.PlaybackActiveTrackChanged) {
          if (event.track) {
            const matchingSong = queue.find((s) => String(s.id) === String(event.track.id));
            if (matchingSong) setCurrentSong(matchingSong);
          }
        }

        if (event.type === Event.PlaybackState) {
          const rawState = event.state;
          const stateStr = typeof rawState === 'object' && rawState !== null ? rawState.state : rawState;
          setIsPlaying(
            stateStr === State.Playing ||
              stateStr === 'playing' ||
              stateStr === State.Buffering ||
              stateStr === 'buffering'
          );
        }
      } catch (_err) {}
    }
  );

  const onWebViewMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'timeupdate') {
        if (data.position !== undefined) {
          setFallbackPosition(Math.floor(data.position * 1000));
        }
        if (data.duration && data.duration > 0) {
          setWebAudioDuration(Math.floor(data.duration * 1000));
        }
      } else if (data.type === 'ended') {
        nextSong();
      } else if (data.type === 'state') {
        setIsPlaying(data.playing);
      }
    } catch (_e) {}
  };

  const playSong = async (song) => {
    if (!song) return;
    setCurrentSong(song);
    setFallbackPosition(0);
    setIsPlaying(true);

    if (isMockPlayer) {
      if (webViewRef.current && song.audioUrl) {
        const js = `window.playAudio('${song.audioUrl}'); true;`;
        webViewRef.current.injectJavaScript(js);
      }
      return;
    }

    try {
      if (!isPlayerReady) {
        const ready = await setupTrackPlayer();
        setIsPlayerReady(ready);
      }

      const songIndex = queue.findIndex((s) => String(s.id) === String(song.id));
      const playerQueue = await TrackPlayer.getQueue();

      if (playerQueue && playerQueue.length !== queue.length) {
        await TrackPlayer.reset();
        await TrackPlayer.add(queue.map(formatSongForTrackPlayer));
      }

      if (songIndex !== -1) {
        await TrackPlayer.skip(songIndex);
      } else {
        await TrackPlayer.reset();
        await TrackPlayer.add([formatSongForTrackPlayer(song)]);
      }

      await TrackPlayer.play();
    } catch (error) {
      console.log('TrackPlayer play notice:', error?.message || error);
    }
  };

  const nextSong = async () => {
    if (!currentSong) return;
    const currentIndex = queue.findIndex((s) => String(s.id) === String(currentSong.id));
    const nextIndex = (currentIndex + 1) % queue.length;
    const nextTrack = queue[nextIndex];
    await playSong(nextTrack);
  };

  const previousSong = async () => {
    if (!currentSong) return;
    const currentIndex = queue.findIndex((s) => String(s.id) === String(currentSong.id));
    const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
    const prevTrack = queue[prevIndex];
    await playSong(prevTrack);
  };

  // Timer tick for preview fallback when WebView position is inactive
  useEffect(() => {
    if (isPlaying && isMockPlayer && !fallbackPosition) {
      timerRef.current = setInterval(() => {
        setFallbackPosition((prev) => {
          const targetDurationSec = currentSong?.durationSec || 300;
          if (prev >= targetDurationSec * 1000) {
            nextSong();
            return 0;
          }
          return prev + 1000;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isMockPlayer, fallbackPosition, currentSong]);

  const togglePlayPause = async () => {
    if (isMockPlayer) {
      if (webViewRef.current) {
        if (isPlaying) {
          webViewRef.current.injectJavaScript('window.pauseAudio(); true;');
          setIsPlaying(false);
        } else {
          if (currentSong?.audioUrl) {
            webViewRef.current.injectJavaScript(`window.playAudio('${currentSong.audioUrl}'); true;`);
            setIsPlaying(true);
          }
        }
      }
      return;
    }

    try {
      const playbackObj = await TrackPlayer.getPlaybackState();
      const rawState = typeof playbackObj === 'object' && playbackObj !== null ? playbackObj.state : playbackObj;

      if (rawState === State.Playing || rawState === 'playing') {
        await TrackPlayer.pause();
        setIsPlaying(false);
      } else if (rawState === State.Paused || rawState === 'paused') {
        await TrackPlayer.play();
        setIsPlaying(true);
      } else {
        setIsPlaying((prev) => !prev);
      }
    } catch (_error) {
      setIsPlaying((prev) => !prev);
    }
  };

  const seekTo = async (millis) => {
    setFallbackPosition(millis);
    const seconds = millis / 1000;
    if (isMockPlayer && webViewRef.current) {
      webViewRef.current.injectJavaScript(`window.seekAudio(${seconds}); true;`);
    } else {
      try {
        await TrackPlayer.seekTo(seconds);
      } catch (_error) {}
    }
  };

  const toggleLikeSong = (songId) => {
    setLikedSongIds((prev) =>
      prev.includes(songId)
        ? prev.filter((id) => id !== songId)
        : [...prev, songId]
    );
  };

  const isSongLiked = (songId) => {
    return likedSongIds.includes(songId);
  };

  const formatTime = (millis) => {
    if (!millis || isNaN(millis)) return '0:00';
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Synchronize position & duration with UI components
  const positionMillis = isMockPlayer
    ? fallbackPosition
    : nativeProgress?.position
    ? Math.floor(nativeProgress.position * 1000)
    : fallbackPosition;

  const durationMillis = isMockPlayer && webAudioDuration > 0
    ? webAudioDuration
    : nativeProgress?.duration
    ? Math.floor(nativeProgress.duration * 1000)
    : (currentSong?.durationSec || 300) * 1000;

  const progressPercent =
    durationMillis > 0 ? (positionMillis / durationMillis) * 100 : 0;

  return (
    <MusicContext.Provider
      value={{
        currentSong,
        isPlaying,
        likedSongIds,
        isFullPlayerVisible,
        queue,
        positionMillis,
        durationMillis,
        progressPercent,
        formatTime,
        playSong,
        togglePlayPause,
        toggleLikeSong,
        isSongLiked,
        setIsFullPlayerVisible,
        nextSong,
        previousSong,
        seekTo,
      }}
    >
      {children}
      {isMockPlayer && (
        <View style={styles.hiddenWebView}>
          <WebView
            ref={webViewRef}
            originWhitelist={['*']}
            source={{ html: HTML_AUDIO_PLAYER }}
            mediaPlaybackRequiresUserAction={false}
            allowsInlineMediaPlayback={true}
            onMessage={onWebViewMessage}
            javaScriptEnabled={true}
          />
        </View>
      )}
    </MusicContext.Provider>
  );
};

const styles = StyleSheet.create({
  hiddenWebView: {
    width: 0,
    height: 0,
    position: 'absolute',
    opacity: 0,
    overflow: 'hidden',
  },
});

export const useMusic = () => useContext(MusicContext);
