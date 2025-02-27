import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

const Onboarding2Screen = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#1a1a2e] justify-center items-center px-6 py-8">
      <View className="mb-8">
        <Image source={require('../assets/images/image3.jpg')} className="w-44 h-44" resizeMode="contain" />
      </View>
      <Text className="text-white text-xl font-bold text-center mb-4">
        Take control of your budget and <Text className="text-green-400">start saving.</Text>
      </Text>
      <TouchableOpacity className="border border-white rounded-full py-2 px-6 mt-6" onPress={() => router.push('/auth/SignIn')}>
        <Text className="text-white text-base font-medium">Let’s Go</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Onboarding2Screen;
