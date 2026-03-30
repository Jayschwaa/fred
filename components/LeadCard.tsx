import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Lead } from '@/types';
import { Card } from './ui/Card';
import { getStatusColor, getStatusLabel } from '@/utils/helpers';

interface LeadCardProps {
  lead: Lead;
  onPress?: () => void;
}

export const LeadCard: React.FC<LeadCardProps> = ({ lead, onPress }) => {
  const statusColor = getStatusColor(lead.status);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Card>
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>
              {lead.firstName} {lead.lastName}
            </Text>
            <Text style={styles.source}>{lead.source}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
            <Text style={styles.statusText}>{getStatusLabel(lead.status)}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>📧</Text>
          <Text style={styles.info} numberOfLines={1}>
            {lead.email}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>📞</Text>
          <Text style={styles.info}>{lead.phone}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>📍</Text>
          <Text style={styles.info} numberOfLines={1}>
            {lead.address}
          </Text>
        </View>

        {lead.tags && lead.tags.length > 0 && (
          <View style={styles.tags}>
            {lead.tags.slice(0, 2).map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        )}

        {lead.nextAction && (
          <View style={styles.nextAction}>
            <Text style={styles.nextActionLabel}>Next:</Text>
            <Text style={styles.nextActionText} numberOfLines={2}>
              {lead.nextAction}
            </Text>
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A1628',
  },
  source: {
    fontSize: 12,
    color: '#C5962A',
    marginTop: 2,
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
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    marginRight: 8,
  },
  info: {
    fontSize: 12,
    color: '#6B7280',
    flex: 1,
  },
  tags: {
    flexDirection: 'row',
    marginTop: 8,
  },
  tag: {
    backgroundColor: '#F0F9FF',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginRight: 6,
  },
  tagText: {
    fontSize: 11,
    color: '#0369A1',
  },
  nextAction: {
    marginTop: 8,
    paddingTop: 8,
    borderTopColor: '#E5E7EB',
    borderTopWidth: 1,
  },
  nextActionLabel: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: 'bold',
  },
  nextActionText: {
    fontSize: 12,
    color: '#C5962A',
    marginTop: 2,
    fontWeight: '600',
  },
});
