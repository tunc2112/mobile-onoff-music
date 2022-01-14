import {handleActions} from 'redux-actions';
import {darkTheme} from '../../asset/styles/themes';
import {
  offLoadingAction,
  onLoadingAction,
  setDarkModeAction,
  setDataAction,
  setIsPlayingAction,
  setPlaylistTypeAction,
} from '../actions';

const initialState = {
  isLoading: false,
  listMusic: [],
  songPlaying: null,
  listPlay: [],
  theme: darkTheme,
  showMusicPlayer: false,
  playlistType: 'normal', // enum ['normal', 'shuffle', 'repeat']
};
export default handleActions(
  {
    [onLoadingAction.toString()]: (state) => ({...state, isLoading: true}),
    [offLoadingAction.toString()]: (state) => ({...state, isLoading: false}),
    [setDataAction.toString()]: (state, {payload}) => ({
      ...state,
      listMusic: payload,
      listPlay: payload.map((i) => ({
        id: String(i.id),
        url: i.url,
        title: i.name,
        artist: i.singer,
        artwork: i.image,
      })),
    }),
    [setIsPlayingAction.toString()]: (state, {payload}) => {
      if (state.showMusicPlayer) {
        return {...state, songPlaying: payload};
      } else {
        return {
          ...state,
          showMusicPlayer: true,
          songPlaying: payload,
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
  },
  initialState,
);
