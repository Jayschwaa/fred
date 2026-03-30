import React, { useState } from 'react';
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
import { Button } from '@/components/ui/Button';
import { ChecklistItem } from '@/components/ChecklistItem';
import { checklistTemplate } from '@/data/checklist';

interface ChecklistItemState {
  id: string;
  category: string;
  label: string;
  status?: 'pass' | 'fail' | 'na';
  notes?: string;
  photo?: string;
  required: boolean;
}

export default function ChecklistScreen() {
  const router = useRouter();
  const [items, setItems] = useState<ChecklistItemState[]>(checklistTemplate);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const handleStatusChange = (itemId: string, status: 'pass' | 'fail' | 'na') => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === itemId ? { ...item, status } : item))
    );
  };

  const handlePhotoPress = (itemId: string) => {
    // In a real app, this would open the camera
    console.log('Photo pressed for item:', itemId);
  };

  const getCategories = () => {
    const categories = new Set<string>();
    items.forEach((item) => categories.add(item.category));
    return Array.from(categories);
  };

  const getItemsByCategory = (category: string) => {
    return items.filter((item) => item.category === category);
  };

  const getCompletionStats = () => {
    const total = items.length;
    const completed = items.filter((item) => item.status && item.status !== undefined).length;
    const required = items.filter((item) => item.required).length;
    const requiredCompleted = items.filter(
      (item) => item.required && item.status && item.status !== undefined
    ).length;

    return {
      total,
      completed,
      percent: Math.round((completed / total) * 100),
      required,
      requiredCompleted,
    };
  };

  const categories = getCategories();
  const stats = getCompletionStats();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.progressCard}>
          <Text style={styles.progressTitle}>32-Point Inspection Progress</Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${Math.min(stats.percent, 100)}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {stats.completed} of {stats.total} items completed ({stats.percent}%)
          </Text>
          <Text style={styles.requiredText}>
            Required: {stats.requiredCompleted} of {stats.required} complete
          </Text>
        </Card>

        {categories.map((category) => {
          const categoryItems = getItemsByCategory(category);
          const isExpanded = expandedCategory === category;

          return (
            <View key={category}>
              <TouchableOpacity
                style={styles.categoryHeader}
                onPress={() =>
                  setExpandedCategory(isExpanded ? null : category)
                }
              >
                <Text style={styles.categoryTitle}>{category}</Text>
                <Text style={styles.categoryCount}>{categoryItems.length}</Text>
                <Text style={styles.expandIcon}>{isExpanded ? '▼' : '▶'}</Text>
              </TouchableOpacity>

              {isExpanded && (
                <View>
                  {categoryItems.map((item) => (
                    <View key={item.id} style={styles.itemContainer}>
                      <ChecklistItem
                        item={item}
                        onStatusChange={(status) =>
                          handleStatusChange(item.id, status)
                        }
                        onPhotoPress={() => handlePhotoPress(item.id)}
                      />
                    </View>
                  ))}
                </View>
              )}
            </View>
          );
        })}

        <Card style={styles.notesCard}>
          <Text style={styles.notesTitle}>Inspection Summary</Text>
          <Text style={styles.notesMock}>
            Add detailed notes about findings, issues, and recommendations here. This will be
            included in the final report.
          </Text>
        </Card>

        <Card>
          <Button
            label="Generate Findings with AI"
            onPress={() => {
              // Mock AI processing
              console.log('Generating AI findings...');
            }}
            size="large"
            style={styles.actionButton}
          />
          <Button
            label="Back to Job"
            onPress={() => router.back()}
            variant="secondary"
            size="large"
          />
        </Card>

        <View style={styles.footer} />
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
  progressCard: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: '#F0F9FF',
    borderLeftColor: '#3B82F6',
    borderLeftWidth: 4,
  },
  progressTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0A1628',
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#D1D5DB',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
  },
  progressText: {
    fontSize: 12,
    color: '#0A1628',
    fontWeight: '600',
  },
  requiredText: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 4,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderLeftColor: '#C5962A',
    borderLeftWidth: 3,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0A1628',
    flex: 1,
  },
  categoryCount: {
    fontSize: 12,
    color: '#6B7280',
    marginRight: 12,
  },
  expandIcon: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  itemContainer: {
    marginHorizontal: 16,
  },
  notesCard: {
    marginHorizontal: 16,
    marginVertical: 12,
  },
  notesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0A1628',
    marginBottom: 8,
  },
  notesMock: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 18,
  },
  actionButton: {
    marginBottom: 8,
  },
  footer: {
    height: 10,
  },
});
