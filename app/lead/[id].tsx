import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { leadStore } from '@/store/leadStore';
import { Lead, LeadStatus } from '@/types';
import { getStatusColor, getStatusLabel, formatPhoneNumber } from '@/utils/helpers';
import { mockNotificationProvider } from '@/providers/MockNotificationProvider';

export default function LeadDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadLeadDetail();
  }, [id]);

  const loadLeadDetail = () => {
    setLoading(true);
    try {
      const leadDetail = leadStore.getById(id || '');
      setLead(leadDetail || null);
    } catch (error) {
      console.error('Error loading lead:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus: LeadStatus) => {
    if (!lead) return;
    setUpdating(true);
    try {
      await leadStore.update(lead.id, { status: newStatus });
      setLead({ ...lead, status: newStatus });
      Alert.alert('Success', `Lead status updated to ${getStatusLabel(newStatus)}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to update lead status');
    } finally {
      setUpdating(false);
    }
  };

  const handleCallLead = () => {
    Alert.alert('Call Lead', `Would call ${lead?.phone} in a real app`);
  };

  const handleTextLead = async () => {
    if (!lead) return;
    try {
      await mockNotificationProvider.sendSMS(lead.phone,
        `Hi ${lead.firstName}, this is a follow-up from 5 Star Partners HVAC. Let us know if you have any questions about our services!`);
      Alert.alert('Success', 'SMS sent to customer');
    } catch (error) {
      Alert.alert('Error', 'Failed to send SMS');
    }
  };

  const handleEmailLead = async () => {
    if (!lead) return;
    try {
      await mockNotificationProvider.sendEmail(lead.email,
        'Following Up - 5 Star Partners HVAC',
        `Hi ${lead.firstName},\n\nWe'd like to follow up regarding your HVAC needs. Let us know how we can help!\n\nBest regards,\n5 Star Partners HVAC`);
      Alert.alert('Success', 'Email sent to customer');
    } catch (error) {
      Alert.alert('Error', 'Failed to send email');
    }
  };

  const getNextSteps = (currentStatus: LeadStatus): LeadStatus[] => {
    const workflows: Record<LeadStatus, LeadStatus[]> = {
      [LeadStatus.NEW]: [LeadStatus.CONTACTED],
      [LeadStatus.CONTACTED]: [LeadStatus.QUALIFIED],
      [LeadStatus.QUALIFIED]: [LeadStatus.BOOKED, LeadStatus.LOST],
      [LeadStatus.BOOKED]: [LeadStatus.LOST],
      [LeadStatus.LOST]: [],
    };

    return workflows[currentStatus] || [];
  };

  if (loading || !lead) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#C5962A" />
        </View>
      </SafeAreaView>
    );
  }

  const nextSteps = getNextSteps(lead.status);
  const statusColor = getStatusColor(lead.status);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.headerCard}>
          <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
            <Text style={styles.statusText}>{getStatusLabel(lead.status)}</Text>
          </View>
          <Text style={styles.name}>
            {lead.firstName} {lead.lastName}
          </Text>
          <Text style={styles.source}>{lead.source}</Text>
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>📋 Contact Information</Text>
          <TouchableOpacity style={styles.infoRow} onPress={handleCallLead}>
            <View style={styles.infoContent}>
              <Text style={styles.label}>Phone</Text>
              <Text style={styles.value}>{formatPhoneNumber(lead.phone)}</Text>
            </View>
            <Text style={styles.actionIcon}>📞</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.infoRow} onPress={handleEmailLead}>
            <View style={styles.infoContent}>
              <Text style={styles.label}>Email</Text>
              <Text style={[styles.value, styles.emailValue]}>{lead.email}</Text>
            </View>
            <Text style={styles.actionIcon}>✉️</Text>
          </TouchableOpacity>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.value}>{lead.address}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>City, State</Text>
            <Text style={styles.value}>
              {lead.city}, {lead.state} {lead.zip}
            </Text>
          </View>
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>📝 Lead Information</Text>
          {lead.tags && lead.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              {lead.tags.map((tag) => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          )}

          {lead.notes && (
            <View style={styles.notesContainer}>
              <Text style={styles.notesLabel}>Notes</Text>
              <Text style={styles.notesText}>{lead.notes}</Text>
            </View>
          )}

          {lead.nextAction && (
            <View style={styles.nextActionContainer}>
              <Text style={styles.nextActionLabel}>Next Action</Text>
              <Text style={styles.nextActionText}>{lead.nextAction}</Text>
            </View>
          )}
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>🎯 Quick Actions</Text>
          <Button
            label="📞 Call Lead"
            onPress={handleCallLead}
            size="medium"
            style={styles.actionButton}
          />
          <Button
            label="💬 Send Text"
            onPress={handleTextLead}
            size="medium"
            style={styles.actionButton}
          />
          <Button
            label="✉️ Send Email"
            onPress={handleEmailLead}
            size="medium"
            style={styles.actionButton}
          />
        </Card>

        {nextSteps.length > 0 && (
          <Card>
            <Text style={styles.sectionTitle}>📈 Update Status</Text>
            {nextSteps.map((status) => (
              <Button
                key={status}
                label={`Mark as ${getStatusLabel(status)}`}
                onPress={() => handleStatusUpdate(status)}
                disabled={updating}
                size="medium"
                style={styles.actionButton}
              />
            ))}
          </Card>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>Lead ID: {lead.id}</Text>
          <Text style={styles.footerText}>Created: {lead.createdAt}</Text>
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
  headerCard: {
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
    fontSize: 11,
    fontWeight: 'bold',
    color: 'white',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0A1628',
    marginBottom: 4,
  },
  source: {
    fontSize: 12,
    color: '#C5962A',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#0A1628',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
  },
  infoContent: {
    flex: 1,
  },
  label: {
    fontSize: 11,
    color: '#6B7280',
  },
  value: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0A1628',
    marginTop: 2,
  },
  emailValue: {
    color: '#3B82F6',
  },
  actionIcon: {
    fontSize: 16,
    marginLeft: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    gap: 6,
  },
  tag: {
    backgroundColor: '#F0F9FF',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 11,
    color: '#0369A1',
  },
  notesContainer: {
    paddingVertical: 8,
    borderTopColor: '#E5E7EB',
    borderTopWidth: 1,
    marginBottom: 12,
  },
  notesLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 4,
  },
  notesText: {
    fontSize: 12,
    color: '#0A1628',
    lineHeight: 18,
  },
  nextActionContainer: {
    paddingVertical: 8,
    borderTopColor: '#E5E7EB',
    borderTopWidth: 1,
  },
  nextActionLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 4,
  },
  nextActionText: {
    fontSize: 12,
    color: '#C5962A',
    fontWeight: '600',
  },
  actionButton: {
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
