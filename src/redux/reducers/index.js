import {handleActions} from 'redux-actions';
import {darkTheme} from '../../asset/styles/themes';
import {
  offLoadingAction,
  onLoadingAction,
  setDarkModeAction,
  setDataAction,
  setIsPlayingAction,
  setPlaylistTypeAction,
  setCurrentPlaylistAction,
  setListPlayAction,
} from '../actions';

const initialState = {
  isLoading: false,
  listMusic: [],
  songPlaying: null,
  listPlay: [],
  theme: darkTheme,
  showMusicPlayer: false,
  playlistType: 'normal', // enum ['normal', 'shuffle', 'repeat']
  currentPlayingPlaylistId: null, // null means playing default playlist
};

const getFormattedSong = (song) => {
  return {
    id: String(song.id),
    url: song.url,
    title: song.title || song.name,
    artist: song.artist || song.singer,
    artwork: song.artwork || song.image,
    duration: song.duration || song.time,
  };
};

export default handleActions(
  {
    [onLoadingAction.toString()]: (state) => ({...state, isLoading: true}),
    [offLoadingAction.toString()]: (state) => ({...state, isLoading: false}),
    [setDataAction.toString()]: (state, {payload}) => ({
      ...state,
      listMusic: payload,
      // listPlay: payload.map((item) => getFormattedSong(item)),
    }),
    [setIsPlayingAction.toString()]: (state, {payload}) => {
      if (state.showMusicPlayer) {
        return {...state, songPlaying: getFormattedSong(payload)};
      } else {
        return {
          ...state,
          showMusicPlayer: true,
          songPlaying: getFormattedSong(payload),
        };
      }
    },
    [setDarkModeAction.toString()]: (state, {payload}) => {
      return {
        ...state,
        theme: payload,
      };
    },
    [setPlaylistTypeAction.toString()]: (state, {payload}) => {
      return {
        ...state,
        playlistType: payload,
      };
    },
    [setCurrentPlaylistAction.toString()]: (state, {payload}) => {
      return {
        ...state,
        currentPlayingPlaylistId: payload,
      };
    },
    [setListPlayAction.toString()]: (state, {payload}) => {
      return {
        ...state,
        listPlay: payload.map((item) => getFormattedSong(item)),
      };
    },
  },
  initialState,
);
