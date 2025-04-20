import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StarsSVG from '@assets/icons/stars.svg';
import colors from '@theme/colors';

interface CreateButtonProps {
  onPress: () => void;
  isLoading: boolean;
}

export default function CreateButton({ onPress, isLoading }: CreateButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, isLoading && styles.createButtonDisabled]}
      onPress={onPress}
      disabled={isLoading}
    >
      <LinearGradient
        colors={colors.primaryGradient}
        start={{ x: 1, y: 0.5 }}
        end={{ x: 0, y: 0.5 }}
        style={styles.gradient}
      >
        <Text style={styles.createButtonText}>
          {isLoading ? 'Creating...' : 'Create'}
        </Text>
        <StarsSVG width={20} height={20} />
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradient: {
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 12,
  },
  createButtonDisabled: {
    opacity: 0.7,
  },
  createButtonText: {
    color: colors.text.primary,
    fontFamily: 'Manrope',
    fontWeight: '800',
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -1,
    textAlign: 'center',
    verticalAlign: 'middle',
    marginRight: 8,
  },
}); 