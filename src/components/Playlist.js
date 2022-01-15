import React from 'react';
import {Image, Text, View} from 'react-native';
import {TextTheme} from '../asset/styles/themes';
import {styles} from '../containers/Library/styles';
import IconCustom from '../components/IconCustom';
import {useSelector} from 'react-redux';

export default function Playlist({
  id,
  name,
  image,
  numberOfSongs,
  togglePlaying,
}) {
  const currentPlayingPlaylistId = useSelector(
    (state) => state.currentPlayingPlaylistId,
  );
  const isPlaying = currentPlayingPlaylistId === id;
  return (
    <View
      style={[{backgroundColor: isPlaying ? '#31103c' : 'transparent'}].concat(
        styles.createPlaylist,
      )}>
      <Image style={styles.iconPluss} source={{uri: image}} />
      <View style={styles.playlistTexts}>
        <TextTheme style={styles.textcreatePlaylist}>{name}</TextTheme>
        <Text style={styles.subTextcreatePlaylist}>
          {numberOfSongs} bài hát
        </Text>
      </View>
      {numberOfSongs > 0 && (
        <View style={styles.playlistIcon}>
          <IconCustom
            name={isPlaying ? 'md-pause' : 'md-play'}
            size={22}
            handlePress={togglePlaying}
          />
        </View>
      )}
    </View>
  );
}
