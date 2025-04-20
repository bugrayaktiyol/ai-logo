import { useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useToast } from '@hooks/useToast';
import { useLogoCreation } from '@hooks/useLogoCreation';
import Toast from '@components/common/Toast';
import Background from '@components/common/Background';
import StyleSelector, { LogoStyle, LOGO_STYLES } from '@components/home/StyleSelector';
import PromptInput from '@components/home/PromptInput';
import CreateButton from '@components/home/CreateButton';
import colors from '@theme/colors';

export default function HomeScreen() {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<LogoStyle>(LOGO_STYLES[0]);
  const { toastState, showToast, hideToast } = useToast();
  const { handleCreateLogo } = useLogoCreation(showToast);
  
  const router = useRouter();

  const handleStyleSelect = (style: LogoStyle) => {
    setSelectedStyle(style);
  };

  const handleCreateLogoPress = async () => {
    await handleCreateLogo(prompt, selectedStyle.id);
  };

  const handleToastPress = () => {
    if (toastState.type === 'success' && toastState.logoId) {
      router.push('/output');
    } else if (toastState.type === 'error') {
      hideToast();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <Background />
      <View style={styles.container}>
        <Toast
          type={toastState.type}
          message={toastState.message}
          subMessage={toastState.subMessage}
          onPress={handleToastPress}
          imageUrl={toastState.imageUrl}
        />

        <View style={styles.contentContainer}>
          <PromptInput 
            prompt={prompt}
            onChangePrompt={setPrompt}
          />

          <View style={styles.styleSelectorWrapper}>
            <StyleSelector
              selectedStyle={selectedStyle}
              onSelectStyle={handleStyleSelect}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <CreateButton
            onPress={handleCreateLogoPress}
            isLoading={toastState.type === 'loading'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.dark,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 52,
    justifyContent: 'space-between',
    zIndex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  styleSelectorWrapper: {
    paddingHorizontal: 24,
    marginHorizontal: -24,
  },
  buttonContainer: {
    width: '100%',
    paddingBottom: 16,
  },
}); 