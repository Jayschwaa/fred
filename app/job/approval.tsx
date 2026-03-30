import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function ApprovalScreen() {
  const router = useRouter();
  const [signed, setSigned] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card>
          <Text style={styles.title}>Customer Approval</Text>
          <Text style={styles.subtitle}>Get customer signature for work authorization</Text>
        </Card>

        <Card style={styles.approvalCard}>
          <Text style={styles.approvalTitle}>Work Authorization</Text>
          <Text style={styles.approvalText}>
            I authorize 5 Star Partners HVAC to perform the work described in the proposal.
            The scope, price, and timeline have been discussed and agreed upon.
          </Text>
          <View style={styles.signatureArea}>
            <Text style={styles.signatureText}>👤 Signature Area</Text>
            <Text style={styles.signatureNote}>
              In a real app, customer would sign here using touch
            </Text>
          </View>
        </Card>

        <Card>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Customer Name</Text>
            <Text style={styles.value}>John Smith</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>{new Date().toLocaleDateString()}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Time</Text>
            <Text style={styles.value}>{new Date().toLocaleTimeString()}</Text>
          </View>
        </Card>

        <Card>
          <Button
            label="✓ Customer Signed"
            onPress={() => setSigned(true)}
            size="large"
            variant={signed ? 'success' : 'primary'}
            style={styles.actionButton}
          />
          <Button
            label="Proceed to Invoice"
            onPress={() => router.push('/job/invoice')}
            size="large"
            disabled={!signed}
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
  approvalCard: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: '#F0FDF4',
    borderLeftColor: '#10B981',
    borderLeftWidth: 4,
  },
  approvalTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0A1628',
    marginBottom: 8,
  },
  approvalText: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 18,
    marginBottom: 16,
  },
  signatureArea: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#D1D5DB',
    borderRadius: 6,
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
  },
  signatureText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  signatureNote: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 4,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 12,
    color: '#6B7280',
  },
  value: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0A1628',
  },
  actionButton: {
    marginBottom: 8,
  },
  footer: {
    height: 10,
  },
});
