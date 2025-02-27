import React from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const OnboardingScreen = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#1a1a2e] justify-center items-center px-6 py-8">
      {/* Title */}
      <Text 
        className="text-white font-bold"
        style={{ fontSize: width * 0.06, marginBottom: height * 0.02 }}
      >
        Xpense Tracker
      </Text>

      {/* Image */}
      <View style={{ marginBottom: height * 0.04 }}>
        <Image 
          source={require('../assets/images/image2.jpg')} 
          style={{ 
            width: width * 0.8,  // 80% of screen width
            height: height * 0.35, // 35% of screen height
            resizeMode: 'contain' 
          }} 
        />
      </View>

      {/* Subtitle */}
      <Text 
        className="text-white italic"
        style={{ fontSize: width * 0.045, marginBottom: height * 0.01 }}
      >
        Welcome
      </Text>

      {/* Description */}
      <Text 
        className="text-white font-bold text-center"
        style={{ fontSize: width * 0.05, marginBottom: height * 0.05, lineHeight: width * 0.06 }}
      >
        Track your spending, <Text className="text-purple-400">simplify your finances.</Text>
      </Text>

      {/* Button */}
      <TouchableOpacity 
        className="border border-white rounded-full"
        style={{ 
          paddingVertical: height * 0.015, 
          paddingHorizontal: width * 0.15 
        }}
        onPress={() => router.push('/onboarding2')}
      >
        <Text 
          className="text-white font-medium"
          style={{ fontSize: width * 0.045 }}
        >
          Get started
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingScreen;
