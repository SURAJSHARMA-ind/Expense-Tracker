import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

const SignUp = () => {
  const { control, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (data: any) => {
    console.log("SignUp Data:", data);
  };

  return (
    <View className="flex-1 bg-[#1a1a2e] px-6">
      <TouchableOpacity
        className="mt-12"
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <Text className="text-white text-3xl font-bold mt-6 mb-8">
        Create an account
      </Text>

      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, value } }) => (
          <View className="mb-4">
            <View className="flex-row items-center bg-[#2C2C2E] rounded-xl px-4 py-3">
              <Ionicons name="person-outline" size={20} color="#8E8E93" />
              <TextInput
                className="flex-1 ml-3 text-white focus:outline-none"
                placeholder="Username"
                placeholderTextColor="#8E8E93"
                onChangeText={onChange}
                value={value}
              />
            </View>
          </View>
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <View className="mb-4">
            <View className="flex-row items-center bg-[#2C2C2E] rounded-xl px-4 py-3">
              <Ionicons name="mail-outline" size={20} color="#8E8E93" />
              <TextInput
                className="flex-1 ml-3 text-white"
                placeholder="Mobile no. or email"
                placeholderTextColor="#8E8E93"
                onChangeText={onChange}
                value={value}
                style={{ outline: 'none' }}
              />
            </View>
          </View>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <View className="mb-4">
            <View className="flex-row items-center bg-[#2C2C2E] rounded-xl px-4 py-3">
              <Ionicons name="lock-closed-outline" size={20} color="#8E8E93" />
              <TextInput
                className="flex-1 ml-3 text-white"
                placeholder="Password"
                placeholderTextColor="#8E8E93"
                secureTextEntry={!showPassword}
                onChangeText={onChange}
                value={value}
                style={{ borderWidth: 0, borderColor: 'transparent' }}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#8E8E93"
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <View className="mb-4">
            <View className="flex-row items-center bg-[#2C2C2E] rounded-xl px-4 py-3">
              <Ionicons name="lock-closed-outline" size={20} color="#8E8E93" />
              <TextInput
                className="flex-1 ml-3 text-white"
                placeholder="Confirm Password"
                placeholderTextColor="#8E8E93"
                secureTextEntry={!showConfirmPassword}
                onChangeText={onChange}
                value={value}
                style={{ outline: 'none' }}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Ionicons
                  name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#8E8E93"
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Text className="text-[#8E8E93] text-sm mb-4">
        By clicking on Sign up button you agree to our{' '}
        <Text className="text-blue-500">Terms and conditions</Text>
      </Text>

      <TouchableOpacity
        className="bg-blue-500 rounded-xl py-3 items-center"
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-white font-semibold text-lg">Sign up</Text>
      </TouchableOpacity>

      <View className="mt-6">
        <Text className="text-white text-center mb-4">Sign up with</Text>
        <View className="flex-row justify-center space-x-4">
          <TouchableOpacity className="bg-[#2C2C2E] p-3 rounded-full">
            <Image
              source={require('../../assets/images/google.png')}
              style={{ width: 24, height: 24, resizeMode: 'contain' }}
            />

          </TouchableOpacity>
          <TouchableOpacity className="bg-[#2C2C2E] p-3 rounded-full">
            <Ionicons name="logo-apple" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignUp;
