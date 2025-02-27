import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

type AuthContextType = {
  isAuthenticated: boolean;
  user: any | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    // Check for stored token on app launch
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        // TODO: Validate token with backend
        setIsAuthenticated(true);
        // TODO: Fetch and set user data
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // TODO: Replace with actual API call
      const response = await new Promise((resolve, reject) =>
        setTimeout(() => {
          if (email && password) {
            resolve({
              token: 'dummy_jwt_token',
              user: { id: 1, email }
            });
          } else {
            reject(new Error('Invalid credentials'));
          }
        }, 1000)
      );

      // Store token
      await AsyncStorage.setItem('userToken', 'dummy_jwt_token');
      setUser((response as { user: { id: number; email: string } }).user);
      setIsAuthenticated(true);
      router.replace('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error instanceof Error ? error.message : 'Login failed');
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      // TODO: Replace with actual API call
      const response = await new Promise((resolve, reject) =>
        setTimeout(() => {
          if (email && password) {
            resolve({
              token: 'dummy_jwt_token',
              user: { id: 1, email }
            });
          } else {
            reject(new Error('Invalid credentials'));
          }
        }, 1000)
      );

      // Store token
      await AsyncStorage.setItem('userToken', 'dummy_jwt_token');
      setUser((response as { user: { id: number; email: string } }).user);
      setIsAuthenticated(true);
      router.replace('/dashboard');
    } catch (error) {
      console.error('Signup error:', error);
      throw new Error(error instanceof Error ? error.message : 'Signup failed');
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      setUser(null);
      setIsAuthenticated(false);
      router.replace('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        signup,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}