import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {unitH, unitW} from '../asset/styles/size';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  BackgroudTheme,
  ButtonTheme,
  ContainerModal,
  Text1,
  Text2,
  TextTheme,
  TextWhite,
} from '../asset/styles/themes';
import Modal from 'react-native-modal';
import {styles} from '../containers/Library/styles';
import {getPlaylistFromLocal, saveData} from '../containers/storage';

const InfoSongPopup = ({item, showInfo, hiddenInfo, isFocused}) => {
  // console.log('Current song', item);
  const [modalVisible, setModalVisible] = useState(false);
  const [allPlaylist, setAllPlaylist] = useState([]);
  async function getdata() {
    try {
      // console.log('Current song', item.name);
      const playlists = (await getPlaylistFromLocal()) || [];
      console.log('Info song popup', playlists);
      setAllPlaylist(playlists);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    getdata();
  }, [isFocused]);
  async function addSongToPlaylist(playlistId) {
    let updatedPlaylist = [];
    for (let i = 0; i < allPlaylist.length; i++) {
      let currentPlaylist = allPlaylist[i];
      if (playlistId === allPlaylist[i].id) {
        currentPlaylist.songinplaylist.push(item);
      }
      updatedPlaylist.push(currentPlaylist);
    }
    await saveData('playlists', updatedPlaylist);
    await getdata();
    setModalVisible(false);
  }
  return (
    <Modal
      isVisible={showInfo}
      style={localStyles.modal}
      swipeDirection={['up', 'left', 'right', 'down']}
      onSwipeComplete={hiddenInfo}
      onBackdropPress={hiddenInfo}>
      <ContainerModal>
        {/* <TextTheme style={{textAlign: 'center'}}>
          <Icon name="md-chevron-down" size={22} onPress={hiddenInfo} />
        </TextTheme> */}
        <View style={localStyles.hearderPopup}>
          <Image source={{uri: item.image}} style={localStyles.img} />
          <View>
            <Text1 style={localStyles.title}>{item.name}</Text1>
            <Text2 style={localStyles.lable}>{item.singer}</Text2>
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <OptionItem icon={'md-bookmark-outline'} text="Th??m v??o playlist" />
          </TouchableOpacity>

          <OptionItem icon={'md-heart-outline'} text="Th??m v??o y??u th??ch" />
        </View>
      </ContainerModal>
      <Modal
        isVisible={modalVisible}
        style={styles.fstart}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}>
        <BackgroudTheme style={styles.modalInputPlaylist}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text2 style={{fontSize: 20, marginTop: 20}}>T??n Playlist</Text2>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text2 style={{fontSize: 20, marginTop: 20}}> x </Text2>
            </TouchableOpacity>
          </View>
          <FlatList
            data={allPlaylist}
            renderItem={({item}) => (
              <ButtonTheme
                onPress={() => addSongToPlaylist(item.id)}
                style={styles.buttonInputPlaylist}>
                <TextWhite>{item.name}</TextWhite>
              </ButtonTheme>
            )}
            keyExtractor={(item) => item.id}
          />
        </BackgroudTheme>
      </Modal>
    </Modal>
  );
};

const OptionItem = ({icon, text}) => {
  return (
    <View style={localStyles.optionItem}>
      <TextTheme>
        <Icon name={icon} size={22} />
      </TextTheme>
      <TextTheme style={localStyles.optionText}>{text}</TextTheme>
    </View>
  );
};

export default InfoSongPopup;
const localStyles = StyleSheet.create({
  hearderPopup: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 4 * unitW,
    width: '100%',
    marginTop: 6 * unitW,
    paddingBottom: 6 * unitH,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.3,
  },
  img: {
    width: 54 * unitW,
    height: 54 * unitH,
    borderRadius: 4,
    marginLeft: 8 * unitW,
  },
  title: {
    marginBottom: 6 * unitH,
    marginLeft: 16 * unitW,
  },
  lable: {marginLeft: 16 * unitW},
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  optionItem: {margin: 10 * unitH, flexDirection: 'row', alignItems: 'center'},
  optionText: {fontSize: 14 * unitH, marginLeft: 12 * unitW},
});
