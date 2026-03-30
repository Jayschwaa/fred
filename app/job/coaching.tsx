import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function CoachingScreen() {
  const router = useRouter();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const coachingTopics = [
    {
      id: 'how_to_explain',
      title: 'How do I explain this to the customer?',
      response:
        'Here\'s how to explain: "The inspection revealed your system has a refrigerant leak affecting cooling. We have three options: a quick fix to get you through summer, a repair with preventive maintenance, or a complete system upgrade for long-term value."',
    },
    {
      id: 'objection_handling',
      title: 'How to handle objections?',
      response:
        'Customer: "Can\'t we just fix it cheaply?" You: "We could temporarily patch it, but that typically leads to repeated service calls and higher costs. Our recommended solution prevents future problems and gives you better value." Stay confident and focus on long-term value.',
    },
    {
      id: 'how_to_close',
      title: 'How to close the sale?',
      response:
        'Use this approach: "Based on what we found, I recommend the Better option for you. It addresses the issue and prevents future problems. Should we move forward with scheduling that this week?" Give recommendation → show value → ask for commitment.',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card>
          <Text style={styles.title}>Sales Coaching</Text>
          <Text style={styles.subtitle}>AI-powered guidance for customer interactions</Text>
        </Card>

        {coachingTopics.map((topic) => (
          <TouchableOpacity key={topic.id} onPress={() => setSelectedTopic(topic.id)}>
            <Card
              style={[
                styles.topicCard,
                selectedTopic === topic.id && styles.topicCardSelected,
              ]}
            >
              <Text style={styles.topicTitle}>{topic.title}</Text>
              {selectedTopic === topic.id && (
                <View style={styles.responseContainer}>
                  <Text style={styles.responseLabel}>💡 AI Response:</Text>
                  <Text style={styles.responseText}>{topic.response}</Text>
                </View>
              )}
            </Card>
          </TouchableOpacity>
        ))}

        <Card style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>💪 Success Tips</Text>
          <Text style={styles.tipItem}>• Listen to the customer first</Text>
          <Text style={styles.tipItem}>• Explain benefits, not just features</Text>
          <Text style={styles.tipItem}>• Address concerns directly and honestly</Text>
          <Text style={styles.tipItem}>• Create urgency around safety/comfort</Text>
          <Text style={styles.tipItem}>• Offer payment plans if needed</Text>
        </Card>

        <Card>
          <Button
            label="Customer Approved"
            onPress={() => router.push('/job/approval')}
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0A1628',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
  },
  topicCard: {
    marginHorizontal: 16,
    marginVertical: 6,
  },
  topicCardSelected: {
    backgroundColor: '#F0F9FF',
    borderLeftColor: '#3B82F6',
    borderLeftWidth: 4,
  },
  topicTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#0A1628',
  },
  responseContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopColor: '#E5E7EB',
    borderTopWidth: 1,
  },
  responseLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#6B7280',
    marginBottom: 6,
  },
  responseText: {
    fontSize: 12,
    color: '#0A1628',
    lineHeight: 18,
  },
  tipsCard: {
    marginHorizontal: 16,
    marginVertical: 12,
    backgroundColor: '#FEF3C7',
    borderLeftColor: '#F59E0B',
    borderLeftWidth: 4,
  },
  tipsTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#0A1628',
    marginBottom: 8,
  },
  tipItem: {
    fontSize: 12,
    color: '#0A1628',
    marginBottom: 6,
  },
  actionButton: {
    marginBottom: 8,
  },
  footer: {
    height: 10,
  },
});
