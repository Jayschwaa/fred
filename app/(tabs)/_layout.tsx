import { Tabs } from 'expo-router';
import { useEffect, useState } from 'react';
import { authStore } from '@/store/authStore';
import { UserRole } from '@/types';

export default function TabsLayout() {
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const state = authStore.getState();
    if (state.user) {
      setUserRole(state.user.role);
    }
  }, []);

  const isTechnician = userRole === UserRole.TECHNICIAN;

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0A1628',
        },
        headerTintColor: '#C5962A',
        headerTitleStyle: {
          fontWeight: 'bold',
          color: 'white',
        },
        tabBarStyle: {
          backgroundColor: '#0A1628',
          borderTopColor: '#C5962A',
          borderTopWidth: 2,
        },
        tabBarActiveTintColor: '#C5962A',
        tabBarInactiveTintColor: '#6B7280',
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarLabel: 'Dashboard',
          headerShown: true,
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 18, color }}>📊</Text>,
        }}
      />

      {!isTechnician && (
        <Tabs.Screen
          name="schedule"
          options={{
            title: 'Schedule',
            tabBarLabel: 'Schedule',
            headerShown: true,
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 18, color }}>📅</Text>,
          }}
        />
      )}

      {(userRole === UserRole.ADMIN || userRole === UserRole.CSR) && (
        <Tabs.Screen
          name="leads"
          options={{
            title: 'Leads',
            tabBarLabel: 'Leads',
            headerShown: true,
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 18, color }}>👥</Text>,
          }}
        />
      )}

      <Tabs.Screen
        name="jobs"
        options={{
          title: 'Jobs',
          tabBarLabel: 'Jobs',
          headerShown: true,
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 18, color }}>🔧</Text>,
        }}
      />

      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarLabel: 'More',
          headerShown: true,
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 18, color }}>⋯</Text>,
        }}
      />
    </Tabs>
  );
}

const Text = require('react-native').Text;
