import React, {useRef, useEffect} from 'react';
import {View, StyleSheet, Animated} from 'react-native';

export default function Progress({position, time}) {
  let animation = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animation.current, {
      toValue: position,
      duration: time,
      useNativeDriver: false,
    }).start();
  }, [position, time]);

  const width = animation.current.interpolate({
    inputRange: [0, time],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });
  return (
    <View style={styles.progressBar}>
      <Animated.View
        style={([StyleSheet.absoluteFill], {backgroundColor: '#3252CE', width})}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  progressBar: {
    flexDirection: 'row',
    height: 4,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 5,
  },
});
