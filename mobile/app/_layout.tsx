import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: 'transparent',
        },
        
        headerTransparent: true,
        headerTitleStyle: {
          fontFamily: 'Manrope',
          fontWeight: '800',
          fontSize: 17,
        },
        headerTitleAlign: 'center',
        headerTintColor: '#FAFAFA',
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'AI Logo',
        }} 
      />
      <Stack.Screen 
        name="output" 
        options={{ 
          title: 'Output Screen',
          headerShown: false
        }} 
      />
    </Stack>
  );
} 