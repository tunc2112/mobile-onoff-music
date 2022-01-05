import AsyncStorage from '@react-native-async-storage/async-storage';
import playlists from '../../playlist.json';

export const getData = async (key) => {
  const result = await AsyncStorage.getItem(key);
  if (typeof result === 'string') {
    return JSON.parse(result);
  }
  return null;
};

export const saveData = async (key, value) => {
  const data = JSON.stringify(value);
  await AsyncStorage.setItem(key, data);
};

export const getPlaylistFromLocal = async () => {
  const result = await getData('playlists');
  if (result === null) {
    await saveData('playlists', playlists);
    return playlists;
  }
  return result;
};
