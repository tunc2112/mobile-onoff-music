import React, {useEffect, useRef} from 'react';
import {Animated, Easing, Image, Modal, StyleSheet, View} from 'react-native';
import TrackPlayer, {
  TrackPlayerEvents,
  usePlaybackState,
  useTrackPlayerEvents,
  useTrackPlayerProgress,
} from 'react-native-track-player';
import Progress from './Progress';
import {useDispatch, useSelector} from 'react-redux';
import {unitH, unitW} from '../../asset/styles/size';
import {setIsPlayingAction} from '../../redux/actions';
import {
  ContainerView,
  PlayingBar,
  Text1,
  Text2,
  TextTheme,
} from '../../asset/styles/themes';
import IconCustom from '../../components/IconCustom';

export default function Playmusic({modalVisible, setModalVisible}) {
  const progress = useTrackPlayerProgress();
  const playbackState = usePlaybackState();
  const dispatch = useDispatch();

  const song = useSelector((state) => state.songPlaying);
  const listMusic = useSelector((state) => state.listMusic);
  const listPlay = useSelector((state) => state.listPlay);

  // console.log('Playmusic rendered', song.id);

  useTrackPlayerEvents([TrackPlayerEvents.PLAYBACK_TRACK_CHANGED], (event) => {
    console.log('song changed', event);
    if (event.type === TrackPlayerEvents.PLAYBACK_TRACK_CHANGED) {
      if (event.nextTrack != null) {
        if (event.track == null || event.track == song.id) {
          dispatch(setIsPlayingAction(listMusic[event.nextTrack - 1]));
        }
      }
    }
  });

  const isPlaying = [
    TrackPlayer.STATE_PLAYING,
    TrackPlayer.STATE_BUFFERING,
  ].includes(playbackState);
  // console.log(playbackState, TrackPlayer.STATE_BUFFERING);

  const trackPlayerInit = async () => {
    await TrackPlayer.setupPlayer({
      maxCacheSize: 1048576,
    });
    return true;
  };

  useEffect(() => {
    trackPlayerInit();
    TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SEEK_TO,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_SKIP,
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SEEK_TO,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_SKIP,
      ],
      notificationCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SEEK_TO,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_SKIP,
      ],
    });

    TrackPlayer.setupPlayer().then(async () => {
      await TrackPlayer.reset();
      await TrackPlayer.add(listPlay);
      await TrackPlayer.skip(String(song.id));
      // await TrackPlayer.play();
    });
    // startSpin;
  }, []);
  useEffect(() => {
    TrackPlayer.skip(String(song.id));
  }, [song]);

  const playmussic = () => {
    if (!isPlaying) {
      TrackPlayer.play();
    } else {
      TrackPlayer.pause();
    }
  };
  const nextMusic = () => {
    // TrackPlayer.skipToNext();
    dispatch(setIsPlayingAction(listMusic[song.id]));
  };
  const prevMusic = () => {
    if (song.id > 1) {
      // TrackPlayer.skipToPrevious();
      dispatch(setIsPlayingAction(listMusic[song.id - 2]));
    }
  };
  const toggleRepeat = () => {};
  const changeProgressTo = async (time) => {
    const targetTime = time[0];
    await TrackPlayer.seekTo(targetTime);
  };
  const spinValue = useRef(new Animated.Value(0)).current;
  // const startSpin = () => {
  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 10000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ).start();
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  return (
    <View>
      <PlayingBar onPress={() => setModalVisible(true)}>
        <Progress
          time={progress.duration}
          position={progress.position}
          handleUpdateProgress={async (time) => await changeProgressTo(time)}
        />
        <View style={styles.playingbar}>
          <Image source={{uri: song?.image}} style={styles.imagesongbottom} />
          <View>
            <Text1>{song.name}</Text1>
            <TextTheme>{song.singer}</TextTheme>
          </View>
          <View style={styles.control}>
            <IconCustom
              name={'md-play-skip-back'}
              size={22}
              handlePress={() => prevMusic()}
            />
            <TextTheme style={{marginHorizontal: 20 * unitW}}>
              <IconCustom
                name={isPlaying ? 'md-pause' : 'md-play'}
                size={22}
                handlePress={playmussic}
              />
            </TextTheme>
            <IconCustom
              name={'md-play-skip-forward'}
              size={22}
              handlePress={nextMusic}
            />
          </View>
        </View>
      </PlayingBar>
      <Modal animationType="slide" visible={modalVisible}>
        <ContainerView style={{alignItems: 'center'}}>
          <View style={styles.hearderPopup}>
            <IconCustom
              style={styles.lable}
              name="md-chevron-down"
              size={32}
              handlePress={() => setModalVisible(false)}
            />
            <View>
              <Text1 style={styles.title}>{song.name}</Text1>
              <Text2 style={styles.lable}>{song.singer}</Text2>
            </View>
            <IconCustom
              style={styles.options}
              name="md-ellipsis-vertical"
              size={24}
            />
          </View>
          <Animated.Image
            style={[styles.imagesong, {transform: [{rotate: spin}]}]}
            source={{uri: song.image}}
          />
          <View style={styles.slider}>
            <Progress
              time={song.time}
              position={progress.position}
              handleUpdateProgress={async (time) =>
                await changeProgressTo(time)
              }
            />
          </View>
          {/* <Button title="ok" onPress={()=>setModalVisible(false)}/> */}
          <TextTheme style={styles.nameplay}>{song.name}</TextTheme>
          <TextTheme style={styles.singerplay}>{song.singer}</TextTheme>
          <View style={styles.plpau}>
            <IconCustom name={'md-shuffle-outline'} size={28} />
            <IconCustom
              name={'md-play-skip-back'}
              size={28}
              handlePress={() => prevMusic()}
            />
            <IconCustom
              name={
                isPlaying ? 'md-pause-circle-outline' : 'md-play-circle-outline'
              }
              size={80}
              handlePress={playmussic}
              style={{fontWeight: '100'}}
            />
            <IconCustom
              name={'md-play-skip-forward'}
              size={28}
              handlePress={nextMusic}
            />
            <IconCustom
              name={'md-repeat-outline'}
              size={28}
              handlePress={toggleRepeat}
            />
          </View>
        </ContainerView>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  imagesongbottom: {
    height: 48 * unitH,
    width: 48 * unitW,
    marginRight: 8 * unitW,
    borderRadius: 4,
  },
  imagesong: {
    width: 300 * unitW,
    height: 300 * unitH,
    alignItems: 'center',
    marginTop: 60 * unitH,
    borderRadius: 150 * unitH,
  },
  playingbar: {
    flexDirection: 'row',
    padding: 4 * unitW,
  },
  modalsong: {
    width: '100%',
    height: '100%',
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20 * unitW,
  },
  nameplay: {
    fontWeight: 'bold',
    marginTop: 16 * unitH,
    fontSize: 20,
  },
  singerplay: {
    color: '#fff',
    marginTop: 4 * unitH,
  },
  plpau: {
    flexDirection: 'row',
    paddingTop: 16 * unitH,
    // height: 60 * unitH,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 24 * unitW,
    width: '100%',
  },
  hearderPopup: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 4 * unitW,
    // backgroundColor: 'red',
    width: '100%',
  },
  title: {
    marginBottom: 6 * unitH,
    marginLeft: 16 * unitW,
  },
  lable: {marginLeft: 16 * unitW},
  options: {
    position: 'absolute',
    right: 4,
  },
  slider: {
    marginTop: 40 * unitH,
    marginHorizontal: 24 * unitW,
    width: '100%',
    paddingHorizontal: 16 * unitW,
  },
  control: {
    flexDirection: 'row',
    alignSelf: 'center',
    right: 8 * unitW,
    position: 'absolute',
  },
});
