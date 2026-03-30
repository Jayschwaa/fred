import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function ProposalsScreen() {
  const router = useRouter();
  const [selectedProposal, setSelectedProposal] = useState<string | null>(null);

  const proposals = [
    {
      id: 'good',
      level: 'GOOD',
      price: 350,
      scope: 'Repair refrigerant leak and recharge system',
      laborHours: 2,
      benefits: ['Restore cooling', 'Get through summer'],
      warranty: '30 days',
      urgency: 'High - system failing',
      color: '#3B82F6',
    },
    {
      id: 'better',
      level: 'BETTER',
      price: 455,
      scope: 'Repair leak, recharge, replace capacitor, perform preventive maintenance',
      laborHours: 2.5,
      benefits: ['Restore cooling', 'Prevent future issues', 'Preventive care'],
      warranty: '1 year parts & labor',
      urgency: 'Recommended value option',
      color: '#8B5CF6',
    },
    {
      id: 'best',
      level: 'BEST',
      price: 770,
      scope: 'Replace entire compressor unit, upgrade to high-efficiency system with warranty',
      laborHours: 4,
      benefits: [
        'Complete peace of mind',
        '20% energy savings',
        'Extended 5-year warranty',
        'Newest technology',
      ],
      warranty: '5 years parts & labor',
      urgency: 'Best long-term value',
      color: '#10B981',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card>
          <Text style={styles.title}>Proposal Options</Text>
          <Text style={styles.subtitle}>AI-generated Good/Better/Best options</Text>
        </Card>

        {proposals.map((proposal) => (
          <Card
            key={proposal.id}
            style={[
              styles.proposalCard,
              selectedProposal === proposal.id && styles.proposalCardSelected,
            ]}
          >
            <View style={[styles.proposalHeader, { borderLeftColor: proposal.color }]}>
              <View>
                <Text style={[styles.proposalLevel, { color: proposal.color }]}>
                  {proposal.level}
                </Text>
                <Text style={styles.proposalPrice}>${proposal.price}</Text>
              </View>
              <Text style={styles.proposalHours}>{proposal.laborHours}h labor</Text>
            </View>

            <Text style={styles.scopeTitle}>Scope of Work</Text>
            <Text style={styles.scopeText}>{proposal.scope}</Text>

            <View style={styles.benefitsContainer}>
              <Text style={styles.benefitsTitle}>Benefits:</Text>
              {proposal.benefits.map((benefit, index) => (
                <View key={index} style={styles.benefitItem}>
                  <Text style={styles.benefitDot}>•</Text>
                  <Text style={styles.benefitText}>{benefit}</Text>
                </View>
              ))}
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Warranty</Text>
              <Text style={styles.detailValue}>{proposal.warranty}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Urgency</Text>
              <Text style={styles.detailValue}>{proposal.urgency}</Text>
            </View>

            <Button
              label={selectedProposal === proposal.id ? 'Selected ✓' : 'Select Option'}
              onPress={() => setSelectedProposal(proposal.id)}
              variant={selectedProposal === proposal.id ? 'success' : 'primary'}
              size="medium"
              style={styles.selectButton}
            />
          </Card>
        ))}

        <Card>
          <Button
            label="Present to Customer"
            onPress={() => router.push('/job/coaching')}
            size="large"
            disabled={!selectedProposal}
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
  proposalCard: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  proposalCardSelected: {
    backgroundColor: '#F0FDF4',
    borderLeftColor: '#10B981',
    borderLeftWidth: 4,
  },
  proposalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    borderLeftWidth: 4,
    marginBottom: 12,
  },
  proposalLevel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  proposalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0A1628',
  },
  proposalHours: {
    fontSize: 12,
    color: '#6B7280',
  },
  scopeTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6B7280',
    marginBottom: 4,
  },
  scopeText: {
    fontSize: 13,
    color: '#0A1628',
    marginBottom: 12,
    lineHeight: 18,
  },
  benefitsContainer: {
    marginBottom: 12,
  },
  benefitsTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6B7280',
    marginBottom: 6,
  },
  benefitItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  benefitDot: {
    fontSize: 10,
    color: '#10B981',
    marginRight: 8,
    marginTop: 2,
  },
  benefitText: {
    fontSize: 12,
    color: '#0A1628',
    flex: 1,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderTopColor: '#E5E7EB',
    borderTopWidth: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  detailValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0A1628',
  },
  selectButton: {
    marginTop: 12,
  },
  actionButton: {
    marginBottom: 8,
  },
  footer: {
    height: 10,
  },
});
