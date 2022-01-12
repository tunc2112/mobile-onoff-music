import React, {useEffect, useState} from 'react';
import {FlatList, TextInput, TouchableOpacity, View} from 'react-native';
import {
  ContainerView,
  TextTheme,
  Text2,
  ButtonTheme,
  BackgroudTheme,
  TextWhite,
} from '../../asset/styles/themes';
import {styles} from './styles';
import Playlist from '../../components/Playlist';
import {useNavigation} from '@react-navigation/native';
import IconCustom from '../../components/IconCustom';
import Modal from 'react-native-modal';
import {getData, getPlaylistFromLocal, saveData} from '../storage';

const Stream = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [allPlaylist, setAllPlaylist] = useState([]);
  const [namePlaylist, setNamePlaylist] = useState('');
  async function getPlaylists() {
    try {
      const playlists = (await getPlaylistFromLocal()) || [];
      console.log('Playlists', playlists);
      setAllPlaylist(playlists);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    // console.log('fc',isFocused)
    getPlaylists();
  }, []);
  async function postPlaylist(data) {
    if (namePlaylist !== '') {
      const playlists = await getPlaylistFromLocal();
      const newPlaylist = {
        id: playlists.length + 1,
        name: namePlaylist,
        songinplaylist: [],
      };
      playlists.push(newPlaylist);
      await saveData('playlists', playlists);
    }
    getPlaylists();
  }
  const createPlaylist = () => {
    postPlaylist(namePlaylist);
    setModalVisible(false);
  };
  const navigation = useNavigation();
  const openInplaylist = (songinplaylist) => {
    navigation.navigate('Inplaylist', {
      songs: songinplaylist,
      user: 'Me',
    });
  };
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => openInplaylist(item.songinplaylist)}>
        <Playlist name={item.name} image={item?.songinplaylist[0]?.image} />
      </TouchableOpacity>
    );
  };

  return (
    <ContainerView>
      <View style={styles.createPlaylist}>
        <IconCustom
          name="md-add-circle"
          handlePress={() => setModalVisible(true)}
          style={styles.iconPluss}
          size={28}
        />
        <TextTheme style={styles.textcreatePlaylist}>
          Tạo playlist mới
        </TextTheme>
      </View>
      <FlatList
        data={allPlaylist}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

      <Modal
        isVisible={modalVisible}
        style={styles.fstart}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}>
        <BackgroudTheme style={styles.modalInputPlaylist}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text2 style={{fontSize: 20, marginTop: 20}}>Tên Playlist</Text2>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text2 style={{fontSize: 20, marginTop: 20}}> x </Text2>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.inputPlaylistName}
            onChangeText={(text) => setNamePlaylist(text)}
          />
          <ButtonTheme
            style={styles.buttonInputPlaylist}
            onPress={createPlaylist}>
            <TextWhite>Tạo Playlist</TextWhite>
          </ButtonTheme>
        </BackgroudTheme>
      </Modal>
    </ContainerView>
  );
};

export default Stream;
