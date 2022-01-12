import {call, put, takeLatest, all, fork} from 'redux-saga/effects';
import {
  fetchAsyncAction,
  offLoadingAction,
  onLoadingAction,
  setDataAction,
} from '../actions';
import {getData, saveData} from '../../containers/storage';
import musics from '../../../music.json';

const getMusics = async () => {
  const savedMusics = await getData('musics');
  if (!savedMusics) {
    await saveData('musics', musics);
    return musics;
  }
  return getData('musics');
};

function* fetchAsyncWatch() {
  yield takeLatest(fetchAsyncAction, function* ({payload}) {
    try {
      yield put(onLoadingAction());
      const result = yield call(getMusics);
      if (result) {
        yield put(setDataAction(result));
        if (payload?.callback) {
          payload.callback('', result);
        }
      }
    } catch (error) {
      throw error;
    } finally {
      // else if (payload?.callback) payload.callback("Server Error", {});
      yield put(offLoadingAction());
    }
  });
}
export default function* rootSaga() {
  yield all([fetchAsyncWatch].map(fork));
}
// export default {
//   fetchAsyncWatch,
// };
