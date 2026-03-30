export interface PaymentRequest {
  amount: number;
  method: 'card' | 'cash' | 'check' | 'paymentPlan';
  cardLast4?: string;
  checkNumber?: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionId: string;
  message: string;
  timestamp: string;
}

export const mockPaymentProvider = {
  processPayment: async (payment: PaymentRequest): Promise<PaymentResponse> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock success 95% of the time
    if (Math.random() > 0.05) {
      return {
        success: true,
        transactionId: `TXN-${Date.now().toString().slice(-8)}`,
        message: `Payment of $${payment.amount.toFixed(2)} processed successfully via ${payment.method}`,
        timestamp: new Date().toISOString(),
      };
    } else {
      return {
        success: false,
        transactionId: '',
        message: 'Payment declined. Please try another payment method.',
        timestamp: new Date().toISOString(),
      };
    }
  },

  validateCard: async (
    cardNumber: string,
    expiry: string,
    cvv: string
  ): Promise<{ valid: boolean; message: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Basic validation
    if (cardNumber.replace(/\s/g, '').length !== 16) {
      return { valid: false, message: 'Invalid card number' };
    }

    if (!expiry.match(/^\d{2}\/\d{2}$/)) {
      return { valid: false, message: 'Invalid expiration date (use MM/YY)' };
    }

    if (cvv.length !== 3) {
      return { valid: false, message: 'Invalid CVV' };
    }

    return { valid: true, message: 'Card validated successfully' };
  },

  createPaymentPlan: async (
    amount: number,
    months: number
  ): Promise<{
    success: boolean;
    monthlyPayment: number;
    totalWithInterest: number;
    message: string;
  }> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const interestRate = 0.05; // 5% annual
    const monthlyRate = interestRate / 12;
    const monthlyPayment =
      (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    return {
      success: true,
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      totalWithInterest: Math.round(monthlyPayment * months * 100) / 100,
      message: `Payment plan: $${(monthlyPayment * 100) / 100} for ${months} months`,
    };
  },
};
