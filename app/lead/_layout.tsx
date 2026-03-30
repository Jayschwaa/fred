import { Stack } from 'expo-router';

export default function LeadLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0A1628',
        },
        headerTintColor: '#C5962A',
        headerTitleStyle: {
          fontWeight: 'bold',
          color: 'white',
        },
      }}
    >
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Lead Details',
        }}
      />
    </Stack>
  );
}
