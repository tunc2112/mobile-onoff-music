import React, {useState} from 'react';
import {FlatList} from 'react-native';
import {ContainerView} from '../asset/styles/themes';
import {useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import SongItem from './SongItem';
import {setIsPlayingAction} from '../redux/actions';
import {saveData} from '../containers/storage';

export default function Inplaylist() {
  const router = useRoute();
  const dispatch = useDispatch();
  const {songs, allPlaylist, index} = router.params;

  console.log(allPlaylist[index].songinplaylist.length);
  console.log(songs.length);

  const [songItems, setSongItems] = useState(songs);

  return (
    <ContainerView>
      <FlatList
        data={songItems}
        renderItem={({item}) => (
          <SongItem
            item={item}
            showLoveButton={false}
            openInfo={() => {}}
            handlePress={() => dispatch(setIsPlayingAction(item))}
            inPlaylist={true}
            removeFromPlaylist={async () => {
              console.log('removing', item.id);
              allPlaylist[index].songinplaylist = songs.filter(
                (song) => song.id != item.id,
              );
              await saveData('playlists', allPlaylist);
              setSongItems(allPlaylist[index].songinplaylist);
            }}
          />
        )}
        keyExtractor={(item) => item.url}
        showsVerticalScrollIndicator={false}
      />
    </ContainerView>
  );
}
