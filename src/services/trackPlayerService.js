import TrackPlayer, {
  Event,
  Capability,
  AppKilledPlaybackBehavior,
} from 'react-native-track-player';

/**
 * Initializes TrackPlayer with Android Notification & Lock Screen Media Controls capabilities.
 */
export const setupTrackPlayer = async () => {
  let isSetup = false;
  try {
    await TrackPlayer.getActiveTrack();
    isSetup = true;
  } catch (_error) {
    try {
      await TrackPlayer.setupPlayer({
        autoHandleBacgroundOptions: true,
      });

      await TrackPlayer.updateOptions({
        android: {
          appKilledPlaybackBehavior:
            AppKilledPlaybackBehavior?.StopPlaybackAndRemoveNotification ||
            'stop-playback-and-remove-notification',
        },
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.SeekTo,
          Capability.Stop,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
        notificationCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.SeekTo,
        ],
      });
      isSetup = true;
    } catch (err) {
      console.log('TrackPlayer setup notice:', err?.message || err);
    }
  }
  return isSetup;
};

/**
 * PlaybackService registers listeners for Lock Screen & Notification media control buttons
 * as well as Bluetooth/Headset buttons.
 */
export const PlaybackService = async function () {
  try {
    TrackPlayer.addEventListener(Event.RemotePlay, () => {
      TrackPlayer.play().catch(() => {});
    });

    TrackPlayer.addEventListener(Event.RemotePause, () => {
      TrackPlayer.pause().catch(() => {});
    });

    TrackPlayer.addEventListener(Event.RemoteNext, () => {
      TrackPlayer.skipToNext().catch(() => {});
    });

    TrackPlayer.addEventListener(Event.RemotePrevious, () => {
      TrackPlayer.skipToPrevious().catch(() => {});
    });

    TrackPlayer.addEventListener(Event.RemoteSeek, (event) => {
      TrackPlayer.seekTo(event.position).catch(() => {});
    });

    TrackPlayer.addEventListener(Event.RemoteStop, () => {
      TrackPlayer.stop().catch(() => {});
    });
  } catch (err) {
    console.log('PlaybackService setup notice:', err?.message || err);
  }
};
