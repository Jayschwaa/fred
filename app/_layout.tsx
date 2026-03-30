import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { authStore } from '@/store/authStore';
import { jobStore } from '@/store/jobStore';
import { leadStore } from '@/store/leadStore';

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        await authStore.initializeAuth();
        await jobStore.initialize();
        await leadStore.initialize();
      } catch (error) {
        console.error('Initialization error:', error);
      } finally {
        setIsReady(true);
      }
    };

    initialize();
  }, []);

  if (!isReady) {
    return null;
  }

  const state = authStore.getState();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {!state.isLoggedIn ? (
        <Stack.Screen
          name="(auth)"
          options={{
            animationEnabled: false,
          }}
        />
      ) : (
        <Stack.Screen
          name="(tabs)"
          options={{
            animationEnabled: false,
          }}
        />
      )}
    </Stack>
  );
}
