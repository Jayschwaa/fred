import { Stack } from 'expo-router';

export default function JobLayout() {
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
          title: 'Job Details',
        }}
      />
      <Stack.Screen
        name="checklist"
        options={{
          title: '32-Point Inspection',
        }}
      />
      <Stack.Screen
        name="photos"
        options={{
          title: 'Photo Documentation',
        }}
      />
      <Stack.Screen
        name="proposals"
        options={{
          title: 'Proposals',
        }}
      />
      <Stack.Screen
        name="coaching"
        options={{
          title: 'Sales Coaching',
        }}
      />
      <Stack.Screen
        name="approval"
        options={{
          title: 'Customer Approval',
        }}
      />
      <Stack.Screen
        name="invoice"
        options={{
          title: 'Invoice',
        }}
      />
      <Stack.Screen
        name="payment"
        options={{
          title: 'Payment Collection',
        }}
      />
    </Stack>
  );
}
