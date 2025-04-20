import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import colors from '@theme/colors';

interface OutputImageProps {
  imageUrl: string;
}

export default function OutputImage({ imageUrl }: OutputImageProps) {
  return (
    <View style={styles.imageContainer}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        contentFit="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colors.ui.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  image: {
    borderRadius: 16,
    width: '100%',
    height: '100%',
  },
}); 