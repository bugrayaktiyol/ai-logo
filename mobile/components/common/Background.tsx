import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

export default function Background() {
  return (
    <View style={styles.backgroundContainer}>
      <Image 
        source={require('@assets/gradient-background.png')} 
        style={{width: '100%', height: '100%'}} 
        contentFit="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
}); 