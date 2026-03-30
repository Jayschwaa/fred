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
import { JobCard } from '@/components/JobCard';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { jobStore } from '@/store/jobStore';
import { Job } from '@/types';

export default function ScheduleScreen() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'day' | 'week'>('day');

  useEffect(() => {
    loadSchedule();
  }, [view]);

  const loadSchedule = () => {
    setLoading(true);
    try {
      const scheduled =
        view === 'day'
          ? jobStore.getTodayJobs()
          : jobStore.getUpcomingJobs(7).sort((a, b) => {
              const dateA = new Date(a.scheduledDate);
              const dateB = new Date(b.scheduledDate);
              return dateA.getTime() - dateB.getTime();
            });
      setJobs(scheduled);
    } catch (error) {
      console.error('Error loading schedule:', error);
    } finally {
      setLoading(false);
    }
  };

  const groupJobsByDate = (jobsList: Job[]) => {
    const grouped: Record<string, Job[]> = {};
    jobsList.forEach((job) => {
      if (!grouped[job.scheduledDate]) {
        grouped[job.scheduledDate] = [];
      }
      grouped[job.scheduledDate].push(job);
    });
    return grouped;
  };

  const handleJobPress = (jobId: string) => {
    router.push({
      pathname: '/job/[id]',
      params: { id: jobId },
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#C5962A" />
        </View>
      </SafeAreaView>
    );
  }

  const groupedJobs = groupJobsByDate(jobs);
  const dates = Object.keys(groupedJobs).sort();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewToggle}>
        <TouchableOpacity
          style={[styles.toggleButton, view === 'day' && styles.toggleButtonActive]}
          onPress={() => setView('day')}
        >
          <Text
            style={[styles.toggleButtonText, view === 'day' && styles.toggleButtonTextActive]}
          >
            Today
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, view === 'week' && styles.toggleButtonActive]}
          onPress={() => setView('week')}
        >
          <Text
            style={[styles.toggleButtonText, view === 'week' && styles.toggleButtonTextActive]}
          >
            Week
          </Text>
        </TouchableOpacity>
      </View>

      {dates.length > 0 ? (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {dates.map((date) => (
            <View key={date}>
              <View style={styles.dateHeader}>
                <Text style={styles.dateTitle}>
                  {new Date(date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric',
                  })}
                </Text>
                <Text style={styles.dateCount}>{groupedJobs[date].length} jobs</Text>
              </View>

              {groupedJobs[date].map((job) => (
                <TouchableOpacity
                  key={job.id}
                  onPress={() => handleJobPress(job.id)}
                  activeOpacity={0.8}
                >
                  <JobCard job={job} />
                </TouchableOpacity>
              ))}
            </View>
          ))}

          <View style={styles.footer}>
            <Button
              label="Create New Job"
              onPress={() => {
                // Navigate to create job
              }}
              size="large"
            />
          </View>
        </ScrollView>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📭</Text>
          <Text style={styles.emptyText}>No jobs scheduled</Text>
          <Text style={styles.emptySubtext}>
            {view === 'day' ? "No jobs for today" : "No jobs scheduled for this week"}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewToggle: {
    flexDirection: 'row',
    gap: 12,
    marginHorizontal: 16,
    marginVertical: 12,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: '#F3F4F6',
    borderColor: '#D1D5DB',
    borderWidth: 1,
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: '#0A1628',
    borderColor: '#0A1628',
  },
  toggleButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
  },
  toggleButtonTextActive: {
    color: '#C5962A',
  },
  scrollContent: {
    paddingVertical: 8,
  },
  dateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
  },
  dateTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A1628',
  },
  dateCount: {
    fontSize: 13,
    color: '#6B7280',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6B7280',
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  footer: {
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 20,
  },
});
