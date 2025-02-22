import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

const OnboardingScreen = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#1a1a2e] justify-center items-center px-6 py-8">
      <Text className="text-white text-xl font-bold mb-4">Xpense Tracker</Text>
      <View className="mb-8">
        <Image source={require('../assets/images/image2.jpg')} className="w-44 h-44" resizeMode="contain" />
      </View>
      <Text className="text-white text-lg italic mb-2">Welcome</Text>
      <Text className="text-white text-xl font-bold text-center mb-6">
        Track your spending, <Text className="text-purple-400">simplify your finances.</Text>
      </Text>
      <TouchableOpacity className="border border-white rounded-full py-2 px-6 mt-6" onPress={() => router.push('/onboarding2')}>
        <Text className="text-white text-base font-medium">Get started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingScreen;