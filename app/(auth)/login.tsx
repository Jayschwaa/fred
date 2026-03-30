import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { authStore } from '@/store/authStore';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('owner@5starpartners.com');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    setLoading(true);
    try {
      await authStore.login(email, password);
      router.replace('/(tabs)/dashboard');
    } catch (error) {
      Alert.alert('Login Failed', (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.logo}>🔧</Text>
          <Text style={styles.title}>FRED</Text>
          <Text style={styles.subtitle}>AI-Native HVAC Operating System</Text>
          <Text style={styles.company}>5 Star Partners</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Technician Portal</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={setEmail}
              editable={!loading}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#9CA3AF"
              value={password}
              onChangeText={setPassword}
              editable={!loading}
              secureTextEntry
            />
          </View>

          <Button
            label={loading ? 'Logging in...' : 'Login'}
            onPress={handleLogin}
            disabled={loading}
            size="large"
            style={styles.loginButton}
          />

          <View style={styles.demoAccounts}>
            <Text style={styles.demoTitle}>Demo Accounts:</Text>
            <Text style={styles.demoAccount}>👤 owner@5starpartners.com</Text>
            <Text style={styles.demoAccount}>📋 admin@5starpartners.com</Text>
            <Text style={styles.demoAccount}>📱 dispatcher@5starpartners.com</Text>
            <Text style={styles.demoAccount}>🔧 tech@5starpartners.com</Text>
            <Text style={styles.demoAccount}>📞 csr@5starpartners.com</Text>
            <Text style={styles.demoPassword}>Password: password</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1628',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    fontSize: 56,
    marginBottom: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#C5962A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#D1D5DB',
    marginBottom: 4,
  },
  company: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  formContainer: {
    marginHorizontal: 20,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E5E7EB',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#0A1628',
  },
  loginButton: {
    marginVertical: 24,
  },
  demoAccounts: {
    backgroundColor: 'rgba(197, 150, 42, 0.1)',
    borderColor: '#C5962A',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  demoTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#C5962A',
    marginBottom: 8,
  },
  demoAccount: {
    fontSize: 12,
    color: '#D1D5DB',
    marginBottom: 4,
  },
  demoPassword: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 8,
    fontStyle: 'italic',
  },
});
