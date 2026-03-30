import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { mockPaymentProvider } from '@/providers/MockPaymentProvider';
import { formatCurrency } from '@/utils/helpers';

export default function PaymentScreen() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const totalAmount = 443.50;

  const paymentMethods = [
    {
      id: 'card',
      label: 'Credit/Debit Card',
      icon: '💳',
      description: 'Visa, Mastercard, Amex',
    },
    {
      id: 'cash',
      label: 'Cash',
      icon: '💵',
      description: 'Pay with cash on site',
    },
    {
      id: 'check',
      label: 'Check',
      icon: '✍️',
      description: 'Personal or business check',
    },
    {
      id: 'paymentPlan',
      label: 'Payment Plan',
      icon: '📅',
      description: 'Monthly installments',
    },
  ];

  const handlePayment = async () => {
    if (!selectedMethod) {
      Alert.alert('Error', 'Please select a payment method');
      return;
    }

    setProcessing(true);
    try {
      const result = await mockPaymentProvider.processPayment({
        amount: totalAmount,
        method: selectedMethod as any,
      });

      if (result.success) {
        Alert.alert('Success', 'Payment processed successfully!', [
          {
            text: 'OK',
            onPress: () => router.replace('/'),
          },
        ]);
      } else {
        Alert.alert('Payment Failed', result.message);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during payment processing');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.amountCard}>
          <Text style={styles.amountLabel}>Amount Due</Text>
          <Text style={styles.amountValue}>{formatCurrency(totalAmount)}</Text>
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>Select Payment Method</Text>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.methodButton,
                selectedMethod === method.id && styles.methodButtonSelected,
              ]}
              onPress={() => setSelectedMethod(method.id)}
            >
              <View style={styles.methodContent}>
                <Text style={styles.methodIcon}>{method.icon}</Text>
                <View style={styles.methodTextContainer}>
                  <Text style={styles.methodLabel}>{method.label}</Text>
                  <Text style={styles.methodDesc}>{method.description}</Text>
                </View>
              </View>
              {selectedMethod === method.id && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
          ))}
        </Card>

        {selectedMethod === 'paymentPlan' && (
          <Card style={styles.planCard}>
            <Text style={styles.planTitle}>Payment Plan Options</Text>
            <View style={styles.planOption}>
              <Text style={styles.planText}>3 months: $149/month</Text>
            </View>
            <View style={styles.planOption}>
              <Text style={styles.planText}>6 months: $76/month</Text>
            </View>
            <View style={styles.planOption}>
              <Text style={styles.planText}>12 months: $39/month</Text>
            </View>
          </Card>
        )}

        <Card>
          <Text style={styles.sectionTitle}>Payment Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Invoice #</Text>
            <Text style={styles.detailValue}>INV-20260330001</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date</Text>
            <Text style={styles.detailValue}>{new Date().toLocaleDateString()}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Method</Text>
            <Text style={styles.detailValue}>
              {selectedMethod ? paymentMethods.find((m) => m.id === selectedMethod)?.label : '-'}
            </Text>
          </View>
        </Card>

        <Card>
          <Button
            label={processing ? 'Processing...' : 'Process Payment'}
            onPress={handlePayment}
            disabled={!selectedMethod || processing}
            size="large"
            style={styles.actionButton}
          />
          <Button
            label="Back"
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
  amountCard: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: '#F0FDF4',
    borderLeftColor: '#10B981',
    borderLeftWidth: 4,
  },
  amountLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  amountValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#10B981',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#0A1628',
    marginBottom: 12,
  },
  methodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 8,
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: '#FAFAFA',
  },
  methodButtonSelected: {
    backgroundColor: '#F0FDF4',
    borderColor: '#10B981',
    borderWidth: 2,
  },
  methodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  methodIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  methodTextContainer: {
    flex: 1,
  },
  methodLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0A1628',
  },
  methodDesc: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
  checkmark: {
    fontSize: 16,
    color: '#10B981',
    fontWeight: 'bold',
  },
  planCard: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: '#FEF3C7',
    borderLeftColor: '#F59E0B',
    borderLeftWidth: 4,
  },
  planTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0A1628',
    marginBottom: 8,
  },
  planOption: {
    paddingVertical: 6,
    borderBottomColor: '#FDE68A',
    borderBottomWidth: 1,
  },
  planText: {
    fontSize: 12,
    color: '#0A1628',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
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
  actionButton: {
    marginBottom: 8,
  },
  footer: {
    height: 10,
  },
});
