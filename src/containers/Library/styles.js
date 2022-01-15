import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#220c38',
  },
  createPlaylist: {
    marginTop: 8,
    width: '100%',
    height: 60,
    // backgroundColor:"white",
    alignItems: 'center',
    paddingHorizontal: 8,
    flexDirection: 'row',
  },
  iconPluss: {
    width: 56,
    height: 56,
    backgroundColor: '#be2edd',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textcreatePlaylist: {
    color: '#be2edd',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  },
  subTextcreatePlaylist: {
    color: '#b6b4d1',
    marginLeft: 8,
    fontSize: 10,
  },
  inputPlaylistName: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#006ce2',
    opacity: 0.8,
    color: '#fff',
    fontSize: 20,
  },
  modalInputPlaylist: {
    paddingHorizontal: 16,
    // flex: 0.4,
    height: 220,
    marginTop: 120,
    borderRadius: 8,
    opacity: 1,
  },
  buttonInputPlaylist: {
    width: '100%',
    height: 52,
    marginTop: 16,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fstart: {
    justifyContent: 'flex-start',
    margin: 0,
  },
  playlistTexts: {flexDirection: 'column'},
  playlistIcon: {position: 'absolute', right: 15},
});
