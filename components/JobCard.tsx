import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Job } from '@/types';
import { Card } from './ui/Card';
import { getStatusColor, getStatusLabel, getPriorityColor } from '@/utils/helpers';

interface JobCardProps {
  job: Job;
  onPress?: () => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onPress }) => {
  const statusColor = getStatusColor(job.status);
  const priorityColor = getPriorityColor(job.priority);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Card>
        <View style={styles.header}>
          <Text style={styles.title}>{job.jobType}</Text>
          <View style={[styles.priorityBadge, { backgroundColor: priorityColor }]}>
            <Text style={styles.priorityText}>
              {job.priority.charAt(0).toUpperCase() + job.priority.slice(1)}
            </Text>
          </View>
        </View>

        <Text style={styles.address} numberOfLines={2}>
          📍 {job.address}
        </Text>

        <View style={styles.row}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{job.scheduledDate}</Text>
        </View>

        {job.scheduledTime && (
          <View style={styles.row}>
            <Text style={styles.label}>Time:</Text>
            <Text style={styles.value}>{job.scheduledTime}</Text>
          </View>
        )}

        {job.technician && (
          <View style={styles.row}>
            <Text style={styles.label}>Tech:</Text>
            <Text style={styles.value}>{job.technician.name}</Text>
          </View>
        )}

        <View style={styles.footer}>
          <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
            <Text style={styles.statusText}>{getStatusLabel(job.status)}</Text>
          </View>
          <Text style={styles.duration}>Est: {job.estimatedDuration}h</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A1628',
    flex: 1,
  },
  priorityBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  priorityText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: 'white',
  },
  address: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    color: '#6B7280',
  },
  value: {
    fontSize: 12,
    color: '#0A1628',
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopColor: '#E5E7EB',
    borderTopWidth: 1,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: 'white',
  },
  duration: {
    fontSize: 12,
    color: '#6B7280',
  },
});
