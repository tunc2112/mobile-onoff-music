import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import {Container, Text1} from '../../asset/styles/themes';
import AccPopup from '../../components/AccPopup';
import AnalogPopup from '../../components/AnalogPopup';
import IconCustom from '../../components/IconCustom';
import InfoSongPopup from '../../components/InfoSongPopup';
import ListAlbums from '../../components/ListAlbums';
import Loading from '../../components/Loading';
import SettingPopup from '../../components/SettingPopup';
import SongItem from '../../components/SongItem';
import {
  fetchAsyncAction,
  setIsPlayingAction,
  setCurrentPlaylistAction,
  setListPlayAction,
} from '../../redux/actions';
import {stylescreen} from './styled';

const Dashboard = () => {
  const musics = useSelector((state) => state.listMusic);
  const [state, setState] = useState({
    isLoading: true,
    music: [],
    songInfo: {},
    showInfo: false,
    openSetting: false,
    openAcc: false,
    userInfo: {
      info: {},
      sign: false,
    },
  });
  const [song, setSong] = useState({
    idsong: 0,
    namesong: '',
    urlsong: '',
    singersong: '',
    imagesong: '',
    time: 0,
  });
  const [alert, setAlert] = useState({
    isShown: false,
    title: '',
  });

  const currentPlayingPlaylistId = useSelector(
    (storeState) => storeState.currentPlaylistId,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAsyncAction({}));
    getLocalData();
  }, []);
  const getLocalData = async () => {
    let check = await AsyncStorage.getItem('@hasAcc');
    if (check) {
      let result = await AsyncStorage.getItem('@acc');
      setState({...state, userInfo: {info: JSON.parse(result), sign: true}});
    } else {
      setState({...state, userInfo: {info: {}, sign: false}});
    }
  };
  const isFocused = useIsFocused();
  useEffect(() => {
    getLocalData();
  }, [isFocused]);
  function openInfo(item) {
    setState({
      ...state,
      showInfo: true,
      songInfo: item,
    });
  }
  function hiddenInfo() {
    setState({
      ...state,
      showInfo: false,
      songInfo: {},
    });
  }
  function onLovePressed(item) {
    console.log('liking ' + item.id);
    setAlert({
      ...alert,
      isShown: true,
      title: item.islike ? 'Đã bỏ thích' : 'Đã thêm vào danh sách yêu thích',
    });
  }
  const navigation = useNavigation();
  const openSearch = () => {
    navigation.navigate('SearchForm');
  };
  const openSetting = () => {
    setState({...state, openSetting: true});
  };
  const hiddenSetting = () => {
    setState({...state, openSetting: false});
  };
  const openAcc = () => {
    setState({...state, openAcc: true});
  };
  const hiddenAcc = () => {
    setState({...state, openAcc: false});
  };
  return musics.length === 0 ? (
    <Loading />
  ) : (
    <Container>
      <View style={stylescreen.DashboardHeader}>
        <IconCustom name="md-person-outline" handlePress={openAcc} />
        <View style={stylescreen.searchSet}>
          <IconCustom name="md-search-outline" handlePress={openSearch} />
          <IconCustom name="md-settings-outline" handlePress={openSetting} />
        </View>
      </View>
      <Text1 style={[stylescreen.DashboardTextFeatured]}>Featured Tracks</Text1>
      <ListAlbums
        articles={musics}
        isloading={true}
        Song={song}
        setSong={setSong}
      />
      <Text1 style={stylescreen.DashboardTextFeatured}>Top Tracks</Text1>
      <View style={stylescreen.DashboardToptracks}>
        {musics.length !== 0 ? (
          <FlatList
            data={musics}
            renderItem={({item}) => (
              <SongItem
                item={item}
                openInfo={() => openInfo(item)}
                onLovePressed={() => onLovePressed(item)}
                like={state.userInfo.sign}
                handlePress={() => {
                  if (currentPlayingPlaylistId === null) {
                    console.log('no null');
                    dispatch(setCurrentPlaylistAction(null));
                    dispatch(setListPlayAction(musics));
                  }
                  dispatch(setIsPlayingAction(item));
                }}
              />
            )}
            keyExtractor={(item) => item.url}
            showsVerticalScrollIndicator={false}
          />
        ) : null}
      </View>
      {state.songInfo && (
        <InfoSongPopup
          showInfo={state.showInfo}
          item={state.songInfo}
          hiddenInfo={hiddenInfo}
        />
      )}
      <AnalogPopup
        isShown={alert.isShown}
        text={alert.title}
        hidden={() => setAlert({...alert, isShown: false})}
      />
      <SettingPopup isOpen={state.openSetting} hidden={hiddenSetting} />
      {state.openAcc && <AccPopup isOpen={state.openAcc} hidden={hiddenAcc} />}
    </Container>
  );
};

export default Dashboard;
