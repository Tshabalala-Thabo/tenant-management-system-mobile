import { useState, useEffect, createContext, useContext } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/lib/axios'


interface User {
  id: string;
  email: string;
  fullName: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (fullName: string, lastName: string, email: string, password: string, phone: string) => Promise<void>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const userJson = await AsyncStorage.getItem('user');
      if (userJson) {
        setUser(JSON.parse(userJson));
        router.replace('/(tabs)');
      } else {
        router.replace('/(auth)/login');
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await api.post('/login', { email, password });
      const { access_token, user } = response.data;

      // Store the token in AsyncStorage
      await AsyncStorage.setItem('authToken', access_token);

      return user; // Return the user data
    } catch (error: any) {
      console.error(error.response?.data?.message || 'Login failed');
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const signUp = async (fullName: string, lastName: string, email: string, password: string, phone: string) => {
    try {
      const response = await api.post('/register', {
          name: fullName,
          last_name: lastName,
          email,
          password,
          phone,
      });

      const { access_token, user } = response.data;

      // Store the token in AsyncStorage
      await AsyncStorage.setItem('authToken', access_token);

      return user; // Return the user data
  } catch (error) {
      console.error((error as any).response?.data?.message || 'Registration failed');
      throw new Error(((error as any).response?.data?.message as string) || 'Registration failed');
  }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await AsyncStorage.removeItem('user');
      setUser(null);
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      setIsLoading(true);
      // TODO: Implement actual API call to your backend
      // This is a mock implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      signIn,
      signUp,
      signOut,
      forgotPassword,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
