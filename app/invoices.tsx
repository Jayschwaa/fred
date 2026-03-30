import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Card } from '@/components/ui/Card';
import { formatCurrency, getStatusColor, getStatusLabel } from '@/utils/helpers';
import { InvoiceStatus } from '@/types';

export default function InvoicesScreen() {
  const mockInvoices = [
    {
      id: '1',
      invoiceNumber: 'INV-20260330001',
      customer: 'John Smith',
      total: 443.50,
      status: InvoiceStatus.SENT,
      issueDate: '2026-03-30',
    },
    {
      id: '2',
      invoiceNumber: 'INV-20260329001',
      customer: 'Jane Doe',
      total: 1250.00,
      status: InvoiceStatus.PAID,
      issueDate: '2026-03-29',
    },
    {
      id: '3',
      invoiceNumber: 'INV-20260328001',
      customer: 'Mike Johnson',
      total: 895.75,
      status: InvoiceStatus.OVERDUE,
      issueDate: '2026-03-28',
    },
  ];

  const totalRevenue = mockInvoices.reduce((sum, inv) => sum + inv.total, 0);
  const paidAmount = mockInvoices
    .filter((inv) => inv.status === InvoiceStatus.PAID)
    .reduce((sum, inv) => sum + inv.total, 0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Invoices</Text>
        </View>

        <Card style={styles.statsCard}>
          <View style={styles.statRow}>
            <View>
              <Text style={styles.statLabel}>Total Revenue</Text>
              <Text style={styles.statValue}>{formatCurrency(totalRevenue)}</Text>
            </View>
            <View>
              <Text style={styles.statLabel}>Paid</Text>
              <Text style={styles.statValue}>{formatCurrency(paidAmount)}</Text>
            </View>
          </View>
        </Card>

        {mockInvoices.map((invoice) => (
          <Card key={invoice.id}>
            <View style={styles.invoiceRow}>
              <View style={styles.invoiceInfo}>
                <Text style={styles.invoiceNumber}>{invoice.invoiceNumber}</Text>
                <Text style={styles.customerName}>{invoice.customer}</Text>
              </View>
              <View style={styles.invoiceRight}>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(invoice.status) },
                  ]}
                >
                  <Text style={styles.statusText}>{getStatusLabel(invoice.status)}</Text>
                </View>
                <Text style={styles.invoiceAmount}>{formatCurrency(invoice.total)}</Text>
              </View>
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
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0A1628',
  },
  statsCard: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A1628',
  },
  invoiceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  invoiceInfo: {
    flex: 1,
  },
  invoiceNumber: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#0A1628',
  },
  customerName: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  invoiceRight: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: 'white',
  },
  invoiceAmount: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#0A1628',
  },
  footer: {
    height: 10,
  },
});
