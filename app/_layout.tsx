import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: '#1C1C1E' }
    }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="auth/SignIn" />
      <Stack.Screen name="auth/SignUp" />
    </Stack>
  );
}
