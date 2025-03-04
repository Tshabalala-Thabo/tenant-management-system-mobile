import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser, setLoading, signOut } from '@/store/authSlice';
import { RootState } from '@/store';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const userJson = await AsyncStorage.getItem('user');
      if (userJson) {
        dispatch(setUser(JSON.parse(userJson)));
        router.replace('/(tabs)');
      } else {
        router.replace('/(auth)/login');
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSignIn = async (email: string, password: string) => {
    try {
      const response = await api.post('/login', { email, password });
      const access_token = response.data.token;
      const user = response.data.user;

      await AsyncStorage.setItem('authToken', access_token);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      dispatch(setUser(user));
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Login Error:', error);
      throw error;
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(setLoading(true));
      await AsyncStorage.removeItem('user');
      dispatch(signOut());
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      signIn: handleSignIn,
      signOut: handleSignOut,
      // Add other methods as needed
    }}>
      {children}
    </AuthContext.Provider>
  );
};