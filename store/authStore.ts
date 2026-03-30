import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, UserRole } from '@/types';

const STORAGE_KEY = '@fred_auth';

export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
}

let authState: AuthState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
};

const listeners: Set<() => void> = new Set();

export const authStore = {
  getState: () => authState,

  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  notifyListeners: () => {
    listeners.forEach((listener) => listener());
  },

  initializeAuth: async () => {
    try {
      authState.isLoading = true;
      authStore.notifyListeners();

      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        authState.user = JSON.parse(stored);
        authState.isLoggedIn = true;
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
    } finally {
      authState.isLoading = false;
      authStore.notifyListeners();
    }
  },

  login: async (email: string, password: string) => {
    try {
      authState.isLoading = true;
      authStore.notifyListeners();

      // Mock authentication
      const mockUsers: Record<string, User> = {
        'owner@5starpartners.com': {
          id: 'user_001',
          email: 'owner@5starpartners.com',
          name: 'Owner Test',
          role: UserRole.OWNER,
          phone: '(555) 555-5555',
          companyId: 'company_001',
        },
        'admin@5starpartners.com': {
          id: 'user_002',
          email: 'admin@5starpartners.com',
          name: 'Admin Test',
          role: UserRole.ADMIN,
          phone: '(555) 555-5556',
          companyId: 'company_001',
        },
        'dispatcher@5starpartners.com': {
          id: 'user_003',
          email: 'dispatcher@5starpartners.com',
          name: 'Dispatcher Test',
          role: UserRole.DISPATCHER,
          phone: '(555) 555-5557',
          companyId: 'company_001',
        },
        'tech@5starpartners.com': {
          id: 'user_004',
          email: 'tech@5starpartners.com',
          name: 'Marcus Johnson',
          role: UserRole.TECHNICIAN,
          phone: '(555) 123-4567',
          companyId: 'company_001',
        },
        'csr@5starpartners.com': {
          id: 'user_005',
          email: 'csr@5starpartners.com',
          name: 'CSR Test',
          role: UserRole.CSR,
          phone: '(555) 555-5559',
          companyId: 'company_001',
        },
      };

      const user = mockUsers[email];
      if (user && password === 'password') {
        authState.user = user;
        authState.isLoggedIn = true;
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      authState.isLoading = false;
      authStore.notifyListeners();
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      authState.user = null;
      authState.isLoggedIn = false;
      authStore.notifyListeners();
    } catch (error) {
      console.error('Logout error:', error);
    }
  },
};
