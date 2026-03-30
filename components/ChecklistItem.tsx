import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChecklistItem as ChecklistItemType } from '@/types';
import { Card } from './ui/Card';

interface ChecklistItemProps {
  item: ChecklistItemType;
  onStatusChange?: (status: 'pass' | 'fail' | 'na') => void;
  onPhotoPress?: () => void;
}

export const ChecklistItem: React.FC<ChecklistItemProps> = ({
  item,
  onStatusChange,
  onPhotoPress,
}) => {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'pass':
        return '#10B981';
      case 'fail':
        return '#EF4444';
      case 'na':
        return '#9CA3AF';
      default:
        return '#E5E7EB';
    }
  };

  const getStatusLabel = (status?: string) => {
    switch (status) {
      case 'pass':
        return '✓ PASS';
      case 'fail':
        return '✗ FAIL';
      case 'na':
        return 'N/A';
      default:
        return 'PENDING';
    }
  };

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <View style={styles.labelContainer}>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.label}>{item.label}</Text>
        </View>
        {item.required && <Text style={styles.required}>*</Text>}
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.statusButton, { backgroundColor: getStatusColor(item.status) }]}
          onPress={() => onStatusChange?.('pass')}
        >
          <Text
            style={[
              styles.statusButtonText,
              item.status === 'pass' && styles.statusButtonTextActive,
            ]}
          >
            ✓ Pass
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.statusButton, { backgroundColor: getStatusColor(item.status) }]}
          onPress={() => onStatusChange?.('fail')}
        >
          <Text
            style={[
              styles.statusButtonText,
              item.status === 'fail' && styles.statusButtonTextActive,
            ]}
          >
            ✗ Fail
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.statusButton, { backgroundColor: getStatusColor(item.status) }]}
          onPress={() => onStatusChange?.('na')}
        >
          <Text
            style={[
              styles.statusButtonText,
              item.status === 'na' && styles.statusButtonTextActive,
            ]}
          >
            N/A
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.photoButton} onPress={onPhotoPress}>
          <Text style={styles.photoButtonText}>📷 Photo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(item.status) }]} />
        <Text style={styles.statusText}>{getStatusLabel(item.status)}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  labelContainer: {
    flex: 1,
  },
  category: {
    fontSize: 11,
    color: '#C5962A',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  label: {
    fontSize: 13,
    color: '#0A1628',
    fontWeight: '600',
    marginTop: 4,
  },
  required: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: 'bold',
  },
  controls: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  statusButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 4,
    alignItems: 'center',
  },
  statusButtonText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6B7280',
  },
  statusButtonTextActive: {
    color: 'white',
  },
  photoButton: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    borderColor: '#D1D5DB',
    borderWidth: 1,
  },
  photoButtonText: {
    fontSize: 11,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '600',
  },
});
