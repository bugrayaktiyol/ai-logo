import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CopySVG from '@assets/icons/copy.svg';
import * as Clipboard from 'expo-clipboard';
import colors from '@theme/colors';


interface PromptDetailsProps {
  prompt: string;
  style: string;
}

export default function PromptDetails({ prompt, style }: PromptDetailsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 4000);
  };

  return (
    <View style={styles.promptSection}>
      <View style={styles.promptHeader}>
        <Text style={styles.promptTitle}>Prompt</Text>
        <TouchableOpacity onPress={handleCopy}>
          <View style={styles.copyButtonContent}>
            {copied ? (
              <>
                <MaterialCommunityIcons 
                  name="check" 
                  size={16} 
                  color={colors.ui.success} 
                />
                <Text style={styles.copyText}>Copied</Text>
              </>
            ) : (
              <>
                <CopySVG width={16} height={16} />
                <Text style={styles.copyText}>Copy</Text>
              </>
            )}
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.promptText}>{prompt}</Text>
      
      <View style={styles.styleChip}>
        <Text style={styles.styleText}>{style}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  promptSection: {
    backgroundColor: colors.background.card,
    borderRadius: 12,
    padding: 12,
    gap: 12,
  },
  promptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  promptTitle: {
    fontFamily: 'Manrope',
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 20,
    color: colors.text.primary,
  },
  copyButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  copyText: {
    color: colors.text.secondary,
    fontFamily: 'Manrope',
    fontWeight: '400',
    fontSize: 11,
    lineHeight: 13,
    marginLeft: 6,
  },
  promptText: {
    fontFamily: 'Manrope',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 21,
    color: colors.text.primary,
  },
  styleChip: {
    backgroundColor: colors.ui.gray,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 50,
    alignSelf: 'flex-start',
  },
  styleText: {
    fontSize: 14,
    color: colors.ui.white,
  },
}); 