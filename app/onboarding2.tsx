import React from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const Onboarding2Screen = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#1a1a2e] justify-center items-center px-6 py-8">
      {/* Image */}
      <View style={{ marginBottom: height * 0.04 }}>
        <Image 
          source={require('../assets/images/image3.jpg')} 
          style={{ 
            width: width * 0.8, // 80% of screen width
            height: height * 0.35, // 35% of screen height
            resizeMode: 'contain' 
          }} 
        />
      </View>

      {/* Description */}
      <Text 
        className="text-white font-bold text-center"
        style={{ fontSize: width * 0.05, marginBottom: height * 0.05, lineHeight: width * 0.06 }}
      >
        Take control of your budget and <Text className="text-green-400">start saving.</Text>
      </Text>

      {/* Button */}
      <TouchableOpacity 
        className="border border-white rounded-full"
        style={{ 
          paddingVertical: height * 0.015, 
          paddingHorizontal: width * 0.15 
        }}
        onPress={() => router.push('/auth/SignIn')}
      >
        <Text 
          className="text-white font-medium"
          style={{ fontSize: width * 0.045 }}
        >
          Let’s Go
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Onboarding2Screen;
