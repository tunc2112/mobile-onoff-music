import React from 'react';
import {FlatList} from 'react-native';
import {ContainerView} from '../asset/styles/themes';
import {useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import SongItem from './SongItem';
import {setIsPlayingAction} from '../redux/actions';

export default function Inplaylist() {
  const router = useRoute();
  const dispatch = useDispatch();
  const {songs} = router.params;

  return (
    <ContainerView>
      <FlatList
        data={songs}
        renderItem={({item}) => (
          <SongItem
            item={item}
            showLoveButton={false}
            openInfo={() => {}}
            handlePress={() => dispatch(setIsPlayingAction(item))}
          />
        )}
        keyExtractor={(item) => item.url}
        showsVerticalScrollIndicator={false}
      />
    </ContainerView>
  );
}
