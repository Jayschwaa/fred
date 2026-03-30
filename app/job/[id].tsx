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
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { jobStore } from '@/store/jobStore';
import { Job, JobStatus } from '@/types';
import { getStatusColor, getStatusLabel, formatDate } from '@/utils/helpers';

export default function JobDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJobDetail();
  }, [id]);

  const loadJobDetail = () => {
    setLoading(true);
    try {
      const jobDetail = jobStore.getById(id || '');
      setJob(jobDetail || null);
    } catch (error) {
      console.error('Error loading job:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus: JobStatus) => {
    if (!job) return;
    try {
      await jobStore.update(job.id, { status: newStatus });
      loadJobDetail();
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  const getNextActions = (currentStatus: JobStatus): Array<{ label: string; status: JobStatus }> => {
    const workflows: Record<JobStatus, JobStatus[]> = {
      [JobStatus.NEW]: [JobStatus.BOOKED],
      [JobStatus.BOOKED]: [JobStatus.CONFIRMED],
      [JobStatus.CONFIRMED]: [JobStatus.DISPATCHED],
      [JobStatus.DISPATCHED]: [JobStatus.ON_THE_WAY],
      [JobStatus.ON_THE_WAY]: [JobStatus.ARRIVED],
      [JobStatus.ARRIVED]: [JobStatus.IN_PROGRESS],
      [JobStatus.IN_PROGRESS]: [JobStatus.COMPLETED],
      [JobStatus.COMPLETED]: [JobStatus.INVOICED],
      [JobStatus.INVOICED]: [JobStatus.PAID],
      [JobStatus.PAID]: [],
    };

    return (workflows[currentStatus] || []).map((status) => ({
      label: getStatusLabel(status),
      status,
    }));
  };

  if (loading || !job) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#C5962A" />
        </View>
      </SafeAreaView>
    );
  }

  const nextActions = getNextActions(job.status as JobStatus);
  const statusColor = getStatusColor(job.status);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.statusCard}>
          <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
            <Text style={styles.statusText}>{getStatusLabel(job.status)}</Text>
          </View>
          <Text style={styles.jobType}>{job.jobType}</Text>
          <Text style={styles.description}>{job.description}</Text>
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>📍 Location & Schedule</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.value}>{job.address}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>{formatDate(job.scheduledDate)}</Text>
          </View>
          {job.scheduledTime && (
            <View style={styles.infoRow}>
              <Text style={styles.label}>Time</Text>
              <Text style={styles.value}>{job.scheduledTime}</Text>
            </View>
          )}
          <View style={styles.infoRow}>
            <Text style={styles.label}>Duration</Text>
            <Text style={styles.value}>{job.estimatedDuration} hours</Text>
          </View>
        </Card>

        {job.technician && (
          <Card>
            <Text style={styles.sectionTitle}>🔧 Assigned Technician</Text>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.value}>{job.technician.name}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Phone</Text>
              <Text style={styles.value}>{job.technician.phone}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Hourly Rate</Text>
              <Text style={styles.value}>${job.technician.hourlyRate}/hr</Text>
            </View>
          </Card>
        )}

        <Card>
          <Text style={styles.sectionTitle}>📋 Available Actions</Text>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push('/job/checklist')}
          >
            <Text style={styles.actionButtonIcon}>✓</Text>
            <View style={styles.actionButtonContent}>
              <Text style={styles.actionButtonLabel}>32-Point Checklist</Text>
              <Text style={styles.actionButtonDesc}>Complete inspection</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/job/photos')}>
            <Text style={styles.actionButtonIcon}>📷</Text>
            <View style={styles.actionButtonContent}>
              <Text style={styles.actionButtonLabel}>Photo Documentation</Text>
              <Text style={styles.actionButtonDesc}>Capture equipment photos</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push('/job/proposals')}
          >
            <Text style={styles.actionButtonIcon}>💡</Text>
            <View style={styles.actionButtonContent}>
              <Text style={styles.actionButtonLabel}>View Proposals</Text>
              <Text style={styles.actionButtonDesc}>Good/Better/Best options</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push('/job/coaching')}
          >
            <Text style={styles.actionButtonIcon}>🎯</Text>
            <View style={styles.actionButtonContent}>
              <Text style={styles.actionButtonLabel}>Sales Coaching</Text>
              <Text style={styles.actionButtonDesc}>Get AI guidance</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push('/job/approval')}
          >
            <Text style={styles.actionButtonIcon}>✍️</Text>
            <View style={styles.actionButtonContent}>
              <Text style={styles.actionButtonLabel}>Get Signature</Text>
              <Text style={styles.actionButtonDesc}>Customer approval</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push('/job/invoice')}
          >
            <Text style={styles.actionButtonIcon}>📄</Text>
            <View style={styles.actionButtonContent}>
              <Text style={styles.actionButtonLabel}>Generate Invoice</Text>
              <Text style={styles.actionButtonDesc}>Create invoice</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push('/job/payment')}
          >
            <Text style={styles.actionButtonIcon}>💳</Text>
            <View style={styles.actionButtonContent}>
              <Text style={styles.actionButtonLabel}>Collect Payment</Text>
              <Text style={styles.actionButtonDesc}>Process payment</Text>
            </View>
          </TouchableOpacity>
        </Card>

        {nextActions.length > 0 && (
          <Card>
            <Text style={styles.sectionTitle}>🚀 Next Steps</Text>
            {nextActions.map((action) => (
              <Button
                key={action.status}
                label={`Mark as ${action.label}`}
                onPress={() => handleStatusUpdate(action.status)}
                size="medium"
                style={styles.statusButton}
              />
            ))}
          </Card>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>Job ID: {job.id}</Text>
          <Text style={styles.footerText}>Created: {formatDate(job.createdAt)}</Text>
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingVertical: 12,
  },
  statusCard: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  statusBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  jobType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0A1628',
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0A1628',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 13,
    color: '#6B7280',
  },
  value: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0A1628',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
  },
  actionButtonIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  actionButtonContent: {
    flex: 1,
  },
  actionButtonLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0A1628',
  },
  actionButtonDesc: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  statusButton: {
    marginVertical: 6,
  },
  footer: {
    marginTop: 24,
    marginHorizontal: 16,
    marginBottom: 20,
    paddingTop: 16,
    borderTopColor: '#E5E7EB',
    borderTopWidth: 1,
  },
  footerText: {
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 4,
  },
});
