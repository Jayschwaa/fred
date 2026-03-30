import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatCard } from '@/components/ui/StatCard';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { jobStore } from '@/store/jobStore';
import { leadStore } from '@/store/leadStore';
import { authStore } from '@/store/authStore';
import { UserRole } from '@/types';
import { formatCurrency } from '@/utils/helpers';

export default function DashboardScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [todayJobs, setTodayJobs] = useState<number>(0);

  useEffect(() => {
    const state = authStore.getState();
    if (state.user) {
      setUserRole(state.user.role);
    }
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    setLoading(true);
    try {
      const jobStats = jobStore.getStats();
      const leadStats = leadStore.getStats();
      const todayJobsList = jobStore.getTodayJobs();

      setTodayJobs(todayJobsList.length);
      setStats({
        todayRevenue: 3850,
        jobsCompleted: jobStats.completedJobs,
        inProgressJobs: jobStats.inProgressJobs,
        averageTicket: Math.round(jobStats.averageTicket),
        closeRate: 32,
        leadStats,
        totalRevenue: jobStats.totalRevenue,
      });
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authStore.logout();
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading || !stats) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#C5962A" />
        </View>
      </SafeAreaView>
    );
  }

  const isTechnician = userRole === UserRole.TECHNICIAN;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, {authStore.getState().user?.name}!</Text>
            <Text style={styles.role}>{userRole?.toUpperCase()}</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {!isTechnician && (
          <View style={styles.statsGrid}>
            <StatCard
              label="Today's Revenue"
              value={formatCurrency(stats.todayRevenue)}
              icon="💵"
              color="#10B981"
            />
            <StatCard
              label="Jobs Completed"
              value={stats.jobsCompleted}
              icon="✓"
              color="#0A1628"
            />
            <StatCard
              label="In Progress"
              value={stats.inProgressJobs}
              icon="⚙️"
              color="#F59E0B"
            />
            <StatCard
              label="Close Rate"
              value={`${stats.closeRate}%`}
              icon="📈"
              color="#3B82F6"
            />
          </View>
        )}

        {isTechnician && (
          <Card style={styles.jobsCard}>
            <Text style={styles.cardTitle}>Today's Jobs</Text>
            <Text style={styles.jobsCount}>{todayJobs} jobs scheduled</Text>
            <Button
              label="View My Schedule"
              onPress={() => router.push('/(tabs)/jobs')}
              size="medium"
            />
          </Card>
        )}

        <Card>
          <Text style={styles.cardTitle}>Pipeline Overview</Text>
          {stats.leadStats && (
            <View>
              {Object.entries(stats.leadStats).map(([status, count]) => (
                <View key={status} style={styles.pipelineRow}>
                  <Text style={styles.pipelineLabel}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Text>
                  <Text style={styles.pipelineCount}>{count as number}</Text>
                </View>
              ))}
            </View>
          )}
        </Card>

        {!isTechnician && (
          <Card>
            <Text style={styles.cardTitle}>Quick Actions</Text>
            <Button
              label="📋 New Lead"
              onPress={() => router.push('/(tabs)/leads')}
              size="medium"
              style={styles.actionButton}
            />
            <Button
              label="📅 Schedule Job"
              onPress={() => router.push('/(tabs)/schedule')}
              size="medium"
              style={styles.actionButton}
            />
            <Button
              label="🔧 Manage Jobs"
              onPress={() => router.push('/(tabs)/jobs')}
              size="medium"
              style={styles.actionButton}
            />
          </Card>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>FRED v1.0 • 5 Star Partners HVAC</Text>
          <Text style={styles.footerDate}>{new Date().toLocaleDateString()}</Text>
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
    paddingBottom: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 24,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0A1628',
  },
  role: {
    fontSize: 12,
    color: '#C5962A',
    marginTop: 4,
  },
  logoutButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  logoutText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 8,
    marginBottom: 16,
  },
  jobsCard: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: '#F0F9FF',
    borderLeftColor: '#3B82F6',
    borderLeftWidth: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A1628',
    marginBottom: 12,
  },
  jobsCount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 12,
  },
  pipelineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
  },
  pipelineLabel: {
    fontSize: 13,
    color: '#6B7280',
  },
  pipelineCount: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#0A1628',
  },
  actionButton: {
    marginVertical: 6,
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
    paddingVertical: 16,
    borderTopColor: '#E5E7EB',
    borderTopWidth: 1,
  },
  footerText: {
    fontSize: 11,
    color: '#6B7280',
  },
  footerDate: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },
});
