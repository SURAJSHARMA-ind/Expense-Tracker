import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function DashboardScreen() {
  const router = useRouter();

  type Expense = {
    id: string;
    amount: number;
    category: string;
    date: string;
    description: string;
  };

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const categories = ['Food', 'Transport', 'Shopping', 'Bills', 'Others'];

  const addExpense = () => {
    if (!amount || !category) return;

    const newExpense: Expense = {
      id: Date.now().toString(),
      amount: parseFloat(amount),
      category,
      date: new Date().toISOString(),
      description
    };

    setExpenses([newExpense, ...expenses]);
    setModalVisible(false);
    resetForm();
  };

  const resetForm = () => {
    setAmount('');
    setCategory('');
    setDescription('');
  };

  const getTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  return (
    <View className="flex-1 bg-[#1a1a2e]">
      {/* Header */}
      <View className="bg-[#2d2d44] p-6 rounded-b-3xl">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-white text-2xl font-bold">Dashboard</Text>
          <View className="flex-row gap-3">
            {/* View Report Button */}
            <TouchableOpacity
              className="bg-[#3d3d5c] px-4 py-2 rounded-lg flex-row items-center"
              onPress={() => router.push('/reports')}
            >
              <Ionicons name="bar-chart" size={20} color="white" />
              <Text className="text-white ml-2">View Report</Text>
            </TouchableOpacity>

            {/* Budget Tracking Button */}
            <TouchableOpacity
              className="bg-[#3d3d5c] px-4 py-2 rounded-lg flex-row items-center"
              onPress={() => router.push('/budget')}
            >
              <Ionicons name="wallet" size={20} color="white" />
              <Text className="text-white ml-2">Budget</Text>
            </TouchableOpacity>

            {/* Logout Button */}
            <TouchableOpacity onPress={() => router.push('/onboarding')} className="bg-[#3d3d5c] p-2 rounded-lg">
              <Ionicons name="log-out-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="bg-[#3d3d5c] p-4 rounded-xl">
          <Text className="text-gray-300 text-lg">Total Expenses</Text>
          <Text className="text-white text-3xl font-bold">
            ${getTotalExpenses().toFixed(2)}
          </Text>
        </View>
      </View>

      {/* Expense List */}
      <ScrollView className="flex-1 px-6 pt-4">
        {expenses.map(expense => (
          <View key={expense.id} className="bg-[#2d2d44] p-4 rounded-xl mb-3 flex-row justify-between items-center">
            <View>
              <Text className="text-white font-medium text-lg">{expense.category}</Text>
              <Text className="text-gray-400">{expense.description}</Text>
              <Text className="text-gray-400 text-sm">
                {new Date(expense.date).toLocaleDateString()}
              </Text>
            </View>
            <Text className="text-white text-lg font-bold">${expense.amount.toFixed(2)}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Add Expense Button */}
      <TouchableOpacity
        className="absolute bottom-8 right-6 bg-purple-500 w-14 h-14 rounded-full items-center justify-center"
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>

      {/* Add Expense Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-[#1a1a2e] p-6 rounded-t-3xl">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-white text-xl font-bold">Add Expense</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="white" />
              </TouchableOpacity>
            </View>

            <TextInput
              className="bg-[#2d2d44] text-white p-4 rounded-xl mb-4"
              placeholder="Amount"
              placeholderTextColor="#666"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-4"
            >
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  className={`mr-3 px-4 py-2 rounded-full ${category === cat ? 'bg-purple-500' : 'bg-[#2d2d44]'}`}
                  onPress={() => setCategory(cat)}
                >
                  <Text className="text-white">{cat}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TextInput
              className="bg-[#2d2d44] text-white p-4 rounded-xl mb-6"
              placeholder="Description (optional)"
              placeholderTextColor="#666"
              value={description}
              onChangeText={setDescription}
            />

            <TouchableOpacity
              className="bg-purple-500 p-4 rounded-xl"
              onPress={addExpense}
            >
              <Text className="text-white text-center font-bold text-lg">Add Expense</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
