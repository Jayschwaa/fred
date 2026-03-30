import AsyncStorage from '@react-native-async-storage/async-storage';
import { Lead, LeadStatus } from '@/types';
import { leads as seedLeads } from '@/data/leads';

const STORAGE_KEY = '@fred_leads';

let leadsState: Lead[] = seedLeads;
const listeners: Set<() => void> = new Set();

export const leadStore = {
  getState: () => leadsState,

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
        leadsState = JSON.parse(stored);
      } else {
        leadsState = seedLeads;
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(leadsState));
      }
      leadStore.notifyListeners();
    } catch (error) {
      console.error('Error initializing leads:', error);
    }
  },

  getAll: () => leadsState,

  getById: (id: string) => leadsState.find((lead) => lead.id === id),

  getByStatus: (status: LeadStatus) => leadsState.filter((lead) => lead.status === status),

  search: (query: string) => {
    const lower = query.toLowerCase();
    return leadsState.filter(
      (lead) =>
        lead.firstName.toLowerCase().includes(lower) ||
        lead.lastName.toLowerCase().includes(lower) ||
        lead.email.toLowerCase().includes(lower) ||
        lead.phone.toLowerCase().includes(lower) ||
        lead.address.toLowerCase().includes(lower)
    );
  },

  getByTag: (tag: string) => leadsState.filter((lead) => lead.tags.includes(tag)),

  getBySource: (source: string) => leadsState.filter((lead) => lead.source === source),

  update: async (id: string, updates: Partial<Lead>) => {
    const index = leadsState.findIndex((lead) => lead.id === id);
    if (index !== -1) {
      leadsState[index] = { ...leadsState[index], ...updates };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(leadsState));
      leadStore.notifyListeners();
    }
  },

  create: async (lead: Lead) => {
    leadsState.push(lead);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(leadsState));
    leadStore.notifyListeners();
  },

  getStats: () => {
    const statuses = Object.values(LeadStatus);
    const stats: Record<string, number> = {};
    statuses.forEach((status) => {
      stats[status] = leadsState.filter((lead) => lead.status === status).length;
    });
    return stats;
  },

  getPipeline: () => {
    return [
      {
        stage: 'New',
        count: leadsState.filter((l) => l.status === LeadStatus.NEW).length,
        color: '#EF4444',
      },
      {
        stage: 'Contacted',
        count: leadsState.filter((l) => l.status === LeadStatus.CONTACTED).length,
        color: '#3B82F6',
      },
      {
        stage: 'Qualified',
        count: leadsState.filter((l) => l.status === LeadStatus.QUALIFIED).length,
        color: '#8B5CF6',
      },
      {
        stage: 'Booked',
        count: leadsState.filter((l) => l.status === LeadStatus.BOOKED).length,
        color: '#10B981',
      },
      {
        stage: 'Lost',
        count: leadsState.filter((l) => l.status === LeadStatus.LOST).length,
        color: '#6B7280',
      },
    ];
  },
};
