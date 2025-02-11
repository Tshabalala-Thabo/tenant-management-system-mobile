import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText as Text } from '@/components/ThemedText';
import { useAuth } from '@/hooks/useAuth';

export default function SettingsScreen() {
  const { signOut } = useAuth();

  return (
    <ThemedView style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={signOut}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#E3BD57',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
