import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/utils/helpers';

export default function InvoiceScreen() {
  const router = useRouter();
  const [invoiceNumber] = useState('INV-20260330001');

  const lineItems = [
    { description: 'Refrigerant charge (R-410A)', quantity: 1, unitPrice: 180, total: 180 },
    { description: 'Capacitor replacement', quantity: 1, unitPrice: 45, total: 45 },
    { description: 'Labor (2.5 hours @ $85/hr)', quantity: 2.5, unitPrice: 85, total: 212.5 },
  ];

  const subtotal = lineItems.reduce((sum, item) => sum + item.total, 0);
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = subtotal + tax;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.invoiceHeader}>
          <Text style={styles.invoiceNumber}>{invoiceNumber}</Text>
          <Text style={styles.invoiceDate}>{new Date().toLocaleDateString()}</Text>
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>Bill To</Text>
          <Text style={styles.customerName}>John Smith</Text>
          <Text style={styles.address}>123 Oak Street</Text>
          <Text style={styles.address}>Austin, TX 78701</Text>
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>Service Details</Text>
          <View style={styles.lineItemHeader}>
            <Text style={[styles.lineItemCol, styles.colDescription]}>Description</Text>
            <Text style={[styles.lineItemCol, styles.colQty]}>Qty</Text>
            <Text style={[styles.lineItemCol, styles.colPrice]}>Price</Text>
            <Text style={[styles.lineItemCol, styles.colTotal]}>Total</Text>
          </View>
          <View style={styles.divider} />

          {lineItems.map((item, index) => (
            <View key={index} style={styles.lineItem}>
              <Text style={[styles.lineItemText, styles.colDescription]}>{item.description}</Text>
              <Text style={[styles.lineItemText, styles.colQty]}>{item.quantity}</Text>
              <Text style={[styles.lineItemText, styles.colPrice]}>
                {formatCurrency(item.unitPrice)}
              </Text>
              <Text style={[styles.lineItemText, styles.colTotal]}>
                {formatCurrency(item.total)}
              </Text>
            </View>
          ))}

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValue}>{formatCurrency(subtotal)}</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tax (8%)</Text>
            <Text style={styles.totalValue}>{formatCurrency(tax)}</Text>
          </View>

          <View style={[styles.totalRow, styles.finalTotal]}>
            <Text style={styles.finalTotalLabel}>Total Due</Text>
            <Text style={styles.finalTotalValue}>{formatCurrency(total)}</Text>
          </View>
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>Payment Terms</Text>
          <Text style={styles.termText}>Payment due within 30 days of invoice date.</Text>
          <Text style={styles.termText}>
            Late payments may incur a 1.5% monthly interest charge.
          </Text>
        </Card>

        <Card>
          <Button
            label="Send Invoice to Customer"
            onPress={() => {
              console.log('Sending invoice...');
            }}
            size="large"
            style={styles.actionButton}
          />
          <Button
            label="Collect Payment"
            onPress={() => router.push('/job/payment')}
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
  invoiceHeader: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: '#F0F9FF',
    borderLeftColor: '#3B82F6',
    borderLeftWidth: 4,
  },
  invoiceNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A1628',
  },
  invoiceDate: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#0A1628',
    marginBottom: 8,
  },
  customerName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0A1628',
  },
  address: {
    fontSize: 12,
    color: '#6B7280',
  },
  lineItemHeader: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingBottom: 8,
  },
  lineItemCol: {
    flex: 1,
  },
  colDescription: {
    flex: 3,
  },
  colQty: {
    flex: 1,
  },
  colPrice: {
    flex: 1,
  },
  colTotal: {
    flex: 1,
  },
  lineItemHeader: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  lineItem: {
    flexDirection: 'row',
    paddingVertical: 6,
  },
  lineItemText: {
    fontSize: 11,
    color: '#6B7280',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  totalLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  totalValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0A1628',
  },
  finalTotal: {
    paddingVertical: 12,
    borderTopColor: '#D1D5DB',
    borderTopWidth: 2,
    borderBottomColor: '#D1D5DB',
    borderBottomWidth: 2,
  },
  finalTotalLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#0A1628',
  },
  finalTotalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B981',
  },
  termText: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 4,
    lineHeight: 15,
  },
  actionButton: {
    marginBottom: 8,
  },
  footer: {
    height: 10,
  },
});
