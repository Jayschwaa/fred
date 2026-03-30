import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Card } from '@/components/ui/Card';
import { technicians } from '@/data/technicians';
import { formatCurrency } from '@/utils/helpers';

export default function PerformanceScreen() {
  const sortedByRevenue = [...technicians].sort((a, b) => b.totalRevenue - a.totalRevenue);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Technician Performance</Text>
          <Text style={styles.subtitle}>Team metrics and rankings</Text>
        </View>

        <Text style={styles.sectionTitle}>Revenue Leaders</Text>
        {sortedByRevenue.map((tech, index) => (
          <Card key={tech.id}>
            <View style={styles.techRow}>
              <View style={[styles.rankBadge, styles[`rank${index + 1}`]]}>
                <Text style={styles.rankText}>#{index + 1}</Text>
              </View>
              <View style={styles.techInfo}>
                <Text style={styles.techName}>{tech.name}</Text>
                <Text style={styles.techRole}>{tech.skills.slice(0, 2).join(', ')}</Text>
              </View>
              <View style={styles.statsContainer}>
                <Text style={styles.revenueValue}>{formatCurrency(tech.totalRevenue)}</Text>
                <Text style={styles.jobsValue}>{tech.jobsCompleted} jobs</Text>
              </View>
            </View>
          </Card>
        ))}

        <Text style={styles.sectionTitle}>Quality Metrics</Text>
        {sortedByRevenue.map((tech) => (
          <Card key={`quality-${tech.id}`}>
            <View style={styles.metricRow}>
              <View>
                <Text style={styles.metricLabel}>{tech.name}</Text>
                <Text style={styles.metricValue}>{(tech.callbackRate * 100).toFixed(1)}% callbacks</Text>
              </View>
              <Text style={styles.conversionValue}>{tech.membershipConversions} members</Text>
            </View>
          </Card>
        ))}

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
  },
  header: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0A1628',
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0A1628',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  techRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rank1: {
    backgroundColor: '#FFD700',
  },
  rank2: {
    backgroundColor: '#C0C0C0',
  },
  rank3: {
    backgroundColor: '#CD7F32',
  },
  rankText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0A1628',
  },
  techInfo: {
    flex: 1,
  },
  techName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#0A1628',
  },
  techRole: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
  statsContainer: {
    alignItems: 'flex-end',
  },
  revenueValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#10B981',
  },
  jobsValue: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0A1628',
  },
  metricValue: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 4,
  },
  conversionValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  footer: {
    height: 10,
  },
});
