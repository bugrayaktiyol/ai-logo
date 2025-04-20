import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '@theme/colors';

interface HeaderProps {
  title: string;
  onClose: () => void;
}

export default function Header({ title, onClose }: HeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity 
        style={styles.closeButton}
        onPress={onClose}
      >
        <MaterialCommunityIcons name="close" size={24} color={colors.ui.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
  },
  title: {
    fontFamily: 'Manrope',
    fontWeight: '800',
    fontSize: 22,
    lineHeight: 28,
    color: colors.text.primary,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 