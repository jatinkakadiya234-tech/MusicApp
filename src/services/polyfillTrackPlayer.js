import { NativeModules } from 'react-native';

// Polyfill native TrackPlayerModule mock if unlinked (e.g. inside Expo Go) to prevent Capability load crash
if (!NativeModules.TrackPlayerModule) {
  const mockTrackPlayerModule = {
    __isMock: true,
    CAPABILITY_PLAY: 0,
    CAPABILITY_PLAY_FROM_ID: 1,
    CAPABILITY_PLAY_FROM_SEARCH: 2,
    CAPABILITY_PAUSE: 3,
    CAPABILITY_STOP: 4,
    CAPABILITY_SEEK_TO: 5,
    CAPABILITY_SKIP: 6,
    CAPABILITY_SKIP_TO_NEXT: 7,
    CAPABILITY_SKIP_TO_PREVIOUS: 8,
    CAPABILITY_JUMP_FORWARD: 9,
    CAPABILITY_JUMP_BACKWARD: 10,
    CAPABILITY_SET_RATING: 11,
    CAPABILITY_LIKE: 12,
    CAPABILITY_DISLIKE: 13,
    CAPABILITY_BOOKMARK: 14,
    STATE_NONE: 0,
    STATE_READY: 1,
    STATE_PLAYING: 2,
    STATE_PAUSED: 3,
    STATE_STOPPED: 4,
    STATE_BUFFERING: 5,
    STATE_CONNECTING: 6,
    setupPlayer: async () => {},
    updateOptions: async () => {},
    add: async () => {},
    remove: async () => {},
    skip: async () => {},
    skipToNext: async () => {},
    skipToPrevious: async () => {},
    reset: async () => {},
    play: async () => {},
    pause: async () => {},
    stop: async () => {},
    seekTo: async () => {},
    setVolume: async () => {},
    setRate: async () => {},
    getQueue: async () => [],
    getTrack: async () => null,
    getActiveTrack: async () => null,
    getActiveTrackIndex: async () => -1,
    getPlaybackState: async () => ({ state: 'none' }),
    getProgress: async () => ({ position: 0, duration: 0 }),
    addListener: () => ({ remove: () => {} }),
    removeListeners: () => {},
  };

  try {
    Object.defineProperty(NativeModules, 'TrackPlayerModule', {
      value: mockTrackPlayerModule,
      writable: true,
      configurable: true,
      enumerable: true,
    });
  } catch (_e) {
    NativeModules.TrackPlayerModule = mockTrackPlayerModule;
  }
}
