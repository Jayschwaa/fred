import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Card } from '@/components/ui/Card';
import { authStore } from '@/store/authStore';
import { UserRole } from '@/types';

export default function MoreScreen() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const state = authStore.getState();
    if (state.user) {
      setUserRole(state.user.role);
    }
  }, []);

  const menuItems = [
    {
      label: 'Price Book',
      icon: '💰',
      onPress: () => router.push('/pricebook'),
      roles: [UserRole.OWNER, UserRole.ADMIN, UserRole.CSR, UserRole.TECHNICIAN],
    },
    {
      label: 'Invoices',
      icon: '📄',
      onPress: () => router.push('/invoices'),
      roles: [UserRole.OWNER, UserRole.ADMIN, UserRole.CSR],
    },
    {
      label: 'Technician Performance',
      icon: '📊',
      onPress: () => router.push('/performance'),
      roles: [UserRole.OWNER, UserRole.ADMIN],
    },
    {
      label: 'Settings',
      icon: '⚙️',
      onPress: () => router.push('/settings'),
      roles: [UserRole.OWNER, UserRole.ADMIN],
    },
  ];

  const visibleItems = menuItems.filter((item) => item.roles.includes(userRole || UserRole.TECHNICIAN));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>More Options</Text>
          <Text style={styles.subtitle}>Additional tools and settings</Text>
        </View>

        {visibleItems.map((item, index) => (
          <TouchableOpacity key={index} onPress={item.onPress} activeOpacity={0.7}>
            <Card style={styles.menuCard}>
              <View style={styles.menuContent}>
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  <Text style={styles.menuArrow}>→</Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        ))}

        <Card style={styles.infoCard}>
          <Text style={styles.infoTitle}>About FRED</Text>
          <Text style={styles.infoText}>
            FRED is an AI-native HVAC operating system designed for modern service companies.
          </Text>
          <View style={styles.versionInfo}>
            <Text style={styles.versionLabel}>Version</Text>
            <Text style={styles.versionNumber}>1.0.0</Text>
          </View>
          <View style={styles.versionInfo}>
            <Text style={styles.versionLabel}>Company</Text>
            <Text style={styles.versionNumber}>5 Star Partners HVAC</Text>
          </View>
        </Card>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2026 5 Star Partners. All rights reserved.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    paddingVertical: 12,
  },
  header: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0A1628',
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
  },
  menuCard: {
    marginHorizontal: 16,
    marginVertical: 6,
  },
  menuContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  menuTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0A1628',
  },
  menuArrow: {
    fontSize: 16,
    color: '#C5962A',
    fontWeight: 'bold',
  },
  infoCard: {
    marginHorizontal: 16,
    marginVertical: 20,
    backgroundColor: '#F0F9FF',
    borderLeftColor: '#3B82F6',
    borderLeftWidth: 4,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0A1628',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 12,
    lineHeight: 18,
  },
  versionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderTopColor: '#D1D5DB',
    borderTopWidth: 1,
  },
  versionLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  versionNumber: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0A1628',
  },
  footer: {
    marginTop: 32,
    paddingVertical: 16,
    borderTopColor: '#E5E7EB',
    borderTopWidth: 1,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 11,
    color: '#9CA3AF',
  },
});
