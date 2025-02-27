import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { useRouter } from 'expo-router';

export default function ReportsScreen() {
  const router = useRouter();
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('month');

  const screenWidth = Dimensions.get('window').width;

  const chartConfig = {
    backgroundGradientFrom: '#2d2d44',
    backgroundGradientTo: '#3d3d5c',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
  };

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      data: [100, 150, 200, 180, 250, 300],
      color: (opacity = 1) => `rgba(147, 51, 234, ${opacity})`,
      strokeWidth: 2
    }]
  };

  const pieChartData = [
    { name: 'Food', amount: 300, color: '#9333ea', legendFontColor: '#fff' },
    { name: 'Transport', amount: 150, color: '#6366f1', legendFontColor: '#fff' },
    { name: 'Shopping', amount: 200, color: '#ec4899', legendFontColor: '#fff' },
    { name: 'Bills', amount: 250, color: '#f97316', legendFontColor: '#fff' },
  ];

  return (
    <ScrollView className="flex-1 bg-[#1a1a2e]">
      <View className="p-6">
        {/* Back Button */}
        <TouchableOpacity onPress={() => router.back()} className="mb-4">
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        
        <Text className="text-white text-2xl font-bold mb-6">Expense Reports</Text>

        {/* Timeframe Selector */}
        <View className="flex-row mb-6 bg-[#2d2d44] p-2 rounded-xl">
          {['week', 'month', 'year'].map((period) => (
            <TouchableOpacity
              key={period}
              className={`flex-1 p-2 rounded-lg ${timeframe === period ? 'bg-purple-500' : ''}`}
              onPress={() => setTimeframe(period as 'week' | 'month' | 'year')}
            >
              <Text className="text-white text-center capitalize">{period}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Expense Trend Chart */}
        <View className="bg-[#2d2d44] p-4 rounded-xl mb-6">
          <Text className="text-white text-lg mb-4">Expense Trend</Text>
          <LineChart
            data={lineChartData}
            width={screenWidth - 48}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={{ borderRadius: 16 }}
          />
        </View>

        {/* Category Breakdown */}
        <View className="bg-[#2d2d44] p-4 rounded-xl mb-6">
          <Text className="text-white text-lg mb-4">Category Breakdown</Text>
          <PieChart
            data={pieChartData}
            width={screenWidth - 48}
            height={220}
            chartConfig={chartConfig}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>
      </View>
    </ScrollView>
  );
}
