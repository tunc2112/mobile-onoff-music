import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {unitH, unitW} from '../asset/styles/size';
import Icon from 'react-native-vector-icons/Ionicons';
import {Text1, Text2, TextTheme} from '../asset/styles/themes';
import {getData, saveData} from '../containers/storage';
import {useDispatch} from 'react-redux';
import {fetchAsyncAction} from '../redux/actions';

const SongItem = ({
  item,
  trend,
  openInfo,
  showLoveButton = true,
  onLovePressed = null,
  handlePress = null,
  background = {},
  inPlaylist = false,
  removeFromPlaylist = null,
}) => {
  const dispatch = useDispatch();
  const toggleLike = async () => {
    const musics = await getData('musics');
    const updatedMusics = musics.map((music) => {
      if (music.id === item.id) {
        music.islike = !music.islike;
      }
      return music;
    });
    await saveData('musics', updatedMusics);
    dispatch(fetchAsyncAction());
    if (typeof onLovePressed === 'function') {
      onLovePressed();
    }
  };
  return (
    item && (
      <View style={[localStyles.songitem, background]}>
        <TouchableOpacity style={localStyles.songitem} onPress={handlePress}>
          {trend && <TextTheme style={localStyles.order}>{item.id}</TextTheme>}
          <Image source={{uri: item.image}} style={localStyles.img} />
          <View>
            <Text1 style={localStyles.title}>{item.name}</Text1>
            <Text2 style={localStyles.lable}>{item.singer}</Text2>
          </View>
        </TouchableOpacity>
        <View style={localStyles.options}>
          {showLoveButton && (
            <TouchableOpacity onPress={toggleLike} style={localStyles.p4}>
              <TextTheme>
                <Icon
                  name={item.islike ? 'md-heart' : 'md-heart-outline'}
                  size={24}
                  color="pink"
                />
              </TextTheme>
            </TouchableOpacity>
          )}
          {inPlaylist ? (
            <TouchableOpacity
              onPress={removeFromPlaylist}
              style={[localStyles.p4]}>
              <TextTheme>
                <Icon name="remove-circle-outline" size={24} />
              </TextTheme>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={openInfo} style={[localStyles.p4]}>
              <TextTheme>
                <Icon name="md-ellipsis-vertical" size={24} />
              </TextTheme>
            </TouchableOpacity>
          )}
        </View>
      </View>
    )
  );
};

const localStyles = StyleSheet.create({
  songitem: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 4 * unitW,
  },
  order: {
    fontSize: 24 * unitH,
    marginLeft: 8 * unitW,
    // textDecorationLine: 'underline',
  },
  img: {
    width: 64 * unitW,
    height: 64 * unitH,
    borderRadius: 4,
    marginLeft: 8 * unitW,
  },
  title: {
    marginBottom: 6 * unitH,
    marginLeft: 6 * unitW,
  },
  lable: {marginLeft: 6 * unitW},
  options: {
    flexDirection: 'row',
    position: 'absolute',
    right: 4,
    justifyContent: 'space-between',
  },
  p4: {padding: 4},
});
export default SongItem;
