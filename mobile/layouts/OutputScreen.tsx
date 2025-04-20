import React from 'react';
import { View, StyleSheet, StatusBar, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Header from '@components/common/Header';
import OutputImage from '@components/output/OutputImage';
import PromptDetails from '@components/output/PromptDetails';
import colors from '@/theme/colors';
import { useLogoStore } from '@/data/stores/logo';

export default function OutputScreen() {
  const router = useRouter();
  const { completedLogo } = useLogoStore();
  
  if (!completedLogo) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <Header 
          title="Your Design" 
          onClose={() => router.back()} 
        />

        <OutputImage imageUrl={completedLogo.imageUrl} />

        <ScrollView style={styles.detailsContainer}>
          <PromptDetails 
            prompt={completedLogo.prompt}
            style={completedLogo.style}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.ui.darkGray,
  },
  container: {
    flex: 1,
    padding: 24,
  },
  detailsContainer: {
    flex: 1,
    marginTop: 24,
  },
}); 