import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';

export default function Progress({position, time, handleUpdateProgress}) {
  return (
    <View>
      <Slider
        // animateTransitions
        value={position}
        minimumValue={0}
        maximumValue={time}
        maximumTrackTintColor="#d3d3d3"
        minimumTrackTintColor="#3252CE"
        thumbTintColor="#21399f"
        thumbStyle={styles.thumb}
        trackStyle={styles.track}
        containerStyle={styles.container}
        onSlidingComplete={async (value) => await handleUpdateProgress(value)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  thumb: {
    borderRadius: 10,
    height: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 2,
    width: 20,
  },
  track: {
    borderRadius: 1,
    height: 3,
  },
  container: {
    height: 20,
  },
});
