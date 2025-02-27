import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Budget = {
  id: string;
  category: string;
  limit: number;
  spent: number;
};

export default function BudgetScreen() {
  const [budgets, setBudgets] = useState<Budget[]>([
    { id: '1', category: 'Food', limit: 500, spent: 350 },
    { id: '2', category: 'Transport', limit: 200, spent: 150 },
    { id: '3', category: 'Shopping', limit: 300, spent: 280 },
  ]);
  const [newLimit, setNewLimit] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = ['Food', 'Transport', 'Shopping', 'Bills', 'Others'];

  const addBudget = () => {
    if (!selectedCategory || !newLimit) return;

    const newBudget: Budget = {
      id: Date.now().toString(),
      category: selectedCategory,
      limit: parseFloat(newLimit),
      spent: 0,
    };

    setBudgets([...budgets, newBudget]);
    setNewLimit('');
    setSelectedCategory('');
  };

  const calculateProgress = (spent: number, limit: number) => {
    return (spent / limit) * 100;
  };

  return (
    <View className="flex-1 bg-[#1a1a2e] p-6">
      <Text className="text-white text-2xl font-bold mb-6">Budget Tracking</Text>

      {/* Add New Budget */}
      <View className="bg-[#2d2d44] p-4 rounded-xl mb-6">
        <Text className="text-white text-lg mb-4">Add New Budget</Text>
        
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              className={`mr-3 px-4 py-2 rounded-full ${
                selectedCategory === category ? 'bg-purple-500' : 'bg-[#3d3d5c]'
              }`}
              onPress={() => setSelectedCategory(category)}
            >
              <Text className="text-white">{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TextInput
          className="bg-[#3d3d5c] text-white p-4 rounded-xl mb-4"
          placeholder="Budget Limit"
          placeholderTextColor="#666"
          keyboardType="numeric"
          value={newLimit}
          onChangeText={setNewLimit}
        />

        <TouchableOpacity
          className="bg-purple-500 p-4 rounded-xl"
          onPress={addBudget}
        >
          <Text className="text-white text-center font-bold">Set Budget</Text>
        </TouchableOpacity>
      </View>

      {/* Budget List */}
      <ScrollView className="flex-1">
        {budgets.map((budget) => (
          <View key={budget.id} className="bg-[#2d2d44] p-4 rounded-xl mb-3">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-white text-lg">{budget.category}</Text>
              <Text className="text-white font-bold">
                ${budget.spent} / ${budget.limit}
              </Text>
            </View>

            {/* Progress Bar */}
            <View className="h-2 bg-[#3d3d5c] rounded-full overflow-hidden">
              <View
                className={`h-full ${calculateProgress(budget.spent, budget.limit) > 90 ? 'bg-red-500' : 'bg-purple-500'}`}
                style={{ width: `${Math.min(calculateProgress(budget.spent, budget.limit), 100)}%` }}
              />
            </View>

            {/* Warning for near limit */}
            {calculateProgress(budget.spent, budget.limit) > 90 && (
              <Text className="text-red-500 mt-2">
                <Ionicons name="warning" size={16} color="#ef4444" /> Near budget limit
              </Text>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}