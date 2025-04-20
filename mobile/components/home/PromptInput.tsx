import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';

interface PromptInputProps {
  prompt: string;
  onChangePrompt: (text: string) => void;
}

const LOREM_IPSUM_PROMPTS = [
  "A blue lion logo reading 'HEXA' in bold letters",
  "A sleek black panther logo with red eyes for 'NOVA' gaming",
  "A minimalist wave logo for 'AQUA' water company in teal colors",
  "A geometric fox head logo for 'VULPIX' tech company",
  "An elegant tree logo for 'ROOTS' ecological foundation"
];

const MAX_CHARS = 500;

export default function PromptInput({ prompt, onChangePrompt }: PromptInputProps) {
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    setCharCount(prompt.length);
  }, [prompt]);

  const handleTextChange = (text: string) => {
    setCharCount(text.length);
    onChangePrompt(text);
  };

  const handleSurpriseMe = () => {
    const randomIndex = Math.floor(Math.random() * LOREM_IPSUM_PROMPTS.length);
    const randomPrompt = LOREM_IPSUM_PROMPTS[randomIndex];
    handleTextChange(randomPrompt);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Enter Your Prompt</Text>
          <TouchableOpacity style={styles.surpriseButton} onPress={handleSurpriseMe}>
            <Text style={styles.surpriseText}>🎲 Surprise me</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.input}
            placeholder="A blue lion logo reading 'HEXA' in bold letters..."
            value={prompt}
            onChangeText={handleTextChange}
            multiline
            numberOfLines={4}
            placeholderTextColor="#666"
            maxLength={MAX_CHARS}
          />
          <Text style={styles.charCounter}>{charCount}/{MAX_CHARS}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputLabel: {
    fontFamily: 'Manrope',
    fontWeight: '800',
    fontSize: 20,
    lineHeight: 25,
    color: '#FAFAFA',
  },
  surpriseButton: {
    padding: 8,
  },
  surpriseText: {
    fontFamily: 'Manrope',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
    color: '#FAFAFA',
  },
  textInputContainer: {
    height: 175,
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    marginBottom: 20,
    position: 'relative',
    justifyContent: 'space-between',
    padding: 12,
  },
  input: {
    color: '#FAFAFA',
    fontFamily: 'Manrope',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 21,
    flex: 1,
    textAlignVertical: 'top',
  },
  charCounter: {
    fontFamily: 'Manrope',
    fontSize: 12,
    color: '#666',
    alignSelf: 'flex-start',
  }
}); 