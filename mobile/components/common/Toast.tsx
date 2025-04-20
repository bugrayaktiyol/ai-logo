import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';

export type ToastType = 'loading' | 'success' | 'error' | undefined;

interface ToastProps {
  type: ToastType;
  message: string;
  subMessage?: string;
  onPress?: () => void;
  imageUrl?: string;
}

type IconName = 'check-circle-outline' | 'alert-circle-outline';

interface ToastConfig {
  backgroundColor: string;
  icon?: IconName;
  iconColor: string;
  subMessageColor: string;
  isGradient?: boolean;
  gradientColors?: [string, string];
  iconBackgroundColor?: string;
}

const getToastConfig = (type: ToastType): ToastConfig => {
  switch (type) {
    case 'loading':
      return {
        backgroundColor: '#27272A',
        iconColor: '#fff',
        subMessageColor: '#71717A',
      };
    case 'success':
      return {
        backgroundColor: '#4338ca',
        icon: 'check-circle-outline',
        iconColor: '#fff',
        subMessageColor: '#D4D4D8',
        isGradient: true,
        gradientColors: ['#2938DC', '#943DFF'],
      };
    case 'error':
      return {
        backgroundColor: '#EF4444',
        icon: 'alert-circle-outline',
        iconColor: '#fff',
        subMessageColor: '#D4D4D8',
        iconBackgroundColor: '#F37C7C',
      };
    default:
      return {
        backgroundColor: 'transparent',
        iconColor: 'transparent',
        subMessageColor: 'transparent',
      };
  }
};

export default function Toast({ type, message, subMessage, onPress, imageUrl }: ToastProps) {
  const config = getToastConfig(type);
  
  if (type === undefined) return null;

  const showImage = type === 'success' && imageUrl;
  const isLoading = type === 'loading';
  const isSuccess = type === 'success';

  const renderContent = () => {
    if (showImage) {
      return (
        <View style={styles.successContainer}>
          <View style={styles.imageWrapper}>
            <Image 
              source={{ uri: imageUrl }} 
              style={styles.logoImage}
              contentFit="contain" 
            />
          </View>
          {config.isGradient ? (
            <LinearGradient
              colors={config.gradientColors || ['#4338ca', '#4338ca']}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 0 }}
              style={styles.successMessageContainer}
            >
              <Text style={styles.message}>{message}</Text>
              {subMessage && <Text style={[styles.subMessage, { color: config.subMessageColor }]}>{subMessage}</Text>}
            </LinearGradient>
          ) : (
            <View style={[styles.successMessageContainer, { backgroundColor: config.backgroundColor }]}>
              <Text style={styles.message}>{message}</Text>
              {subMessage && <Text style={[styles.subMessage, { color: config.subMessageColor }]}>{subMessage}</Text>}
            </View>
          )}
        </View>
      );
    }
    
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <View style={styles.loadingIconWrapper}>
            <ActivityIndicator size="large" color="#FFFFFF" />
          </View>
          <View style={[styles.loadingMessageContainer, { backgroundColor: config.backgroundColor }]}>
            <Text style={styles.message}>{message}</Text>
            {subMessage && <Text style={[styles.subMessage, { color: config.subMessageColor }]}>{subMessage}</Text>}
          </View>
        </View>
      );
    }
    
    return (
      <>
        <View 
          style={[
            styles.iconContainer, 
            { 
              backgroundColor: type === 'error' ? config.iconBackgroundColor : undefined, 
              width: type === 'error' ? 70 : undefined,
              height: type === 'error' ? 70 : undefined,
              justifyContent: 'center',
              alignItems: 'center',
              borderTopLeftRadius: type === 'error' ? 12 : undefined,
              borderBottomLeftRadius: type === 'error' ? 12 : undefined,
              marginRight: type === 'error' ? 0 : 12,
              paddingLeft: type === 'error' ? 0 : 16,
            }
          ]}
        >
          {config.icon && (
            <MaterialCommunityIcons
              name={config.icon}
              size={type === 'error' ? 32 : 24}
              color={config.iconColor}
            />
          )}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.message}>{message}</Text>
          {subMessage && <Text style={[styles.subMessage, { color: config.subMessageColor }]}>{subMessage}</Text>}
        </View>
      </>
    );
  };

  const containerStyle = [
    styles.container,
    { 
      backgroundColor: (showImage || isLoading) ? 'transparent' : config.backgroundColor,
      height: type === 'error' ? 70 : undefined,
      overflow: 'hidden' as const
    }
  ];

  if (isSuccess && !showImage && config.isGradient) {
    return (
      <TouchableOpacity
        style={[styles.container, { overflow: 'hidden' }]}
        onPress={onPress}
        disabled={!onPress || isLoading}
      >
        <LinearGradient
          colors={config.gradientColors || ['#4338ca', '#4338ca']}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={[StyleSheet.absoluteFill, { borderRadius: 12 }]}
        />
        {renderContent()}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      disabled={!onPress || isLoading}
    >
      {renderContent()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  successContainer: {
    flexDirection: 'row',
    borderRadius: 16,
    overflow: 'hidden',
    width: '100%',
    height: 70,
  },
  loadingContainer: {
    flexDirection: 'row',
    borderRadius: 16,
    overflow: 'hidden',
    width: '100%',
    height: 70,
  },
  imageWrapper: {
    width: 70,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  loadingIconWrapper: {
    width: 70,
    backgroundColor: '#18181B',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  successMessageContainer: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  loadingMessageContainer: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  iconContainer: {
    marginRight: 0,
    paddingLeft: 0,
  },
  textContainer: {
    flex: 1,
    paddingVertical: 14.5,
    paddingHorizontal: 12,
  },
  message: {
    fontFamily: 'Manrope',
    fontWeight: '800',
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: -0.01,
    color: '#fff',
  },
  subMessage: {
    fontFamily: 'Manrope',
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: -0.01,
    opacity: 0.8,
    marginTop: 2,
  },
}); 