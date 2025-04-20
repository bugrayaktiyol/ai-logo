import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Image, ImageSource } from 'expo-image';

export interface LogoStyle {
  id: string;
  name: string;
  imagePath: ImageSource;
}

export const LOGO_STYLES: LogoStyle[] = [
  { id: 'no-style', name: 'No Style', imagePath: require('@assets/images/logo-styles/no-style.png') },
  { id: 'monogram', name: 'Monogram', imagePath: require('@assets/images/logo-styles/monogram.png') },
  { id: 'abstract', name: 'Abstract', imagePath: require('@assets/images/logo-styles/abstract.png') },
  { id: 'mascot', name: 'Mascot', imagePath: require('@assets/images/logo-styles/mascot.png') },
];

interface StyleSelectorProps {
  selectedStyle: LogoStyle;
  onSelectStyle: (style: LogoStyle) => void;
}

export default function StyleSelector({ selectedStyle, onSelectStyle }: StyleSelectorProps) {
  const renderStyleItem = ({ item }: { item: LogoStyle }) => (
    <TouchableOpacity
      style={styles.styleItem}
      onPress={() => onSelectStyle(item)}
    >
      <View style={[
        styles.imageContainer,
        selectedStyle.id === item.id && styles.selectedImageContainer
      ]}>
        <Image source={item.imagePath} style={styles.styleImage} contentFit="cover" />
      </View>
      <Text style={[
        styles.styleText,
        selectedStyle.id === item.id && styles.selectedStyleText
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logo Styles</Text>
      <View style={styles.flashListContainer}>
        <FlashList
          data={LOGO_STYLES}
          renderItem={renderStyleItem}
          horizontal
          estimatedItemSize={100}
          showsHorizontalScrollIndicator={false}
          extraData={selectedStyle.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Manrope',
    fontWeight: '800',
    fontSize: 20,
    lineHeight: 25,
    color: '#FAFAFA',
    marginBottom: 15,
  },
  flashListContainer: {
    height: 150,
  },
  styleItem: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginRight: 16,
    width: 90,
  },
  imageContainer: {
    width: 90,
    height: 90,
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    overflow: 'hidden',
  },
  selectedImageContainer: {
    borderWidth: 2,
    borderColor: '#FAFAFA',
  },
  styleImage: {
    width: 90,
    height: 90,
    borderRadius: 16,
  },
  styleText: {
    fontFamily: 'Manrope',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
    color: '#71717A',
    position: 'relative',
  },
  selectedStyleText: {
    fontFamily: 'Manrope',
    fontWeight: '700',
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: -0.01,
    textAlign: 'center',
    color: '#FAFAFA',
  },
});
