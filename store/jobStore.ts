import AsyncStorage from '@react-native-async-storage/async-storage';
import { Job } from '@/types';
import { jobs as seedJobs } from '@/data/jobs';

const STORAGE_KEY = '@fred_jobs';

let jobsState: Job[] = seedJobs;
const listeners: Set<() => void> = new Set();

export const jobStore = {
  getState: () => jobsState,

  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  notifyListeners: () => {
    listeners.forEach((listener) => listener());
  },

  initialize: async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        jobsState = JSON.parse(stored);
      } else {
        jobsState = seedJobs;
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(jobsState));
      }
      jobStore.notifyListeners();
    } catch (error) {
      console.error('Error initializing jobs:', error);
    }
  },

  getAll: () => jobsState,

  getById: (id: string) => jobsState.find((job) => job.id === id),

  getByStatus: (status: string) => jobsState.filter((job) => job.status === status),

  getByTechnician: (technicianId: string) =>
    jobsState.filter((job) => job.technicianId === technicianId),

  getByCustomer: (customerId: string) => jobsState.filter((job) => job.customerId === customerId),

  getTodayJobs: () => {
    const today = new Date().toISOString().split('T')[0];
    return jobsState.filter((job) => job.scheduledDate === today);
  },

  getUpcomingJobs: (days: number = 7) => {
    const now = new Date();
    const future = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
    return jobsState.filter(
      (job) => new Date(job.scheduledDate) >= now && new Date(job.scheduledDate) <= future
    );
  },

  update: async (id: string, updates: Partial<Job>) => {
    const index = jobsState.findIndex((job) => job.id === id);
    if (index !== -1) {
      jobsState[index] = { ...jobsState[index], ...updates, updatedAt: new Date().toISOString() };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(jobsState));
      jobStore.notifyListeners();
    }
  },

  create: async (job: Job) => {
    jobsState.push(job);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(jobsState));
    jobStore.notifyListeners();
  },

  getStats: () => {
    const completed = jobsState.filter((job) => job.status === 'completed').length;
    const totalRevenue = jobsState.reduce((sum) => sum + 1200, 0); // Mock average
    return {
      totalJobs: jobsState.length,
      completedJobs: completed,
      inProgressJobs: jobsState.filter((job) => job.status === 'in_progress').length,
      totalRevenue,
      averageTicket: completed > 0 ? totalRevenue / completed : 0,
    };
  },
};
