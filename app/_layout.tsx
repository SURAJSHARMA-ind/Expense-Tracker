// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding2" options={{ headerShown: false }} />
      <Stack.Screen name="dashboard" options={{ headerShown: true }} />
    </Stack>
  );
}