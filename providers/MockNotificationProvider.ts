export interface Notification {
  id: string;
  type: 'sms' | 'email' | 'push';
  recipient: string;
  message: string;
  status: 'pending' | 'sent' | 'failed';
  sentAt?: string;
  error?: string;
}

export const mockNotificationProvider = {
  sendSMS: async (phoneNumber: string, message: string): Promise<Notification> => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const success = Math.random() > 0.05; // 95% success rate

    return {
      id: `SMS-${Date.now()}`,
      type: 'sms',
      recipient: phoneNumber,
      message,
      status: success ? 'sent' : 'failed',
      sentAt: success ? new Date().toISOString() : undefined,
      error: success ? undefined : 'Network error - please retry',
    };
  },

  sendEmail: async (email: string, subject: string, body: string): Promise<Notification> => {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const success = Math.random() > 0.03; // 97% success rate

    return {
      id: `EMAIL-${Date.now()}`,
      type: 'email',
      recipient: email,
      message: `${subject}\n\n${body}`,
      status: success ? 'sent' : 'failed',
      sentAt: success ? new Date().toISOString() : undefined,
      error: success ? undefined : 'Email service unavailable',
    };
  },

  sendAppointmentConfirmation: async (
    customer: { name: string; phone: string; email: string },
    appointment: { date: string; time: string; techName: string }
  ): Promise<{ sms: Notification; email: Notification }> => {
    const smsMessage = `Hi ${customer.name}, this is a confirmation of your HVAC appointment on ${appointment.date} at ${appointment.time} with ${appointment.techName}. Reply CONFIRM to confirm or CANCEL to reschedule.`;

    const emailBody = `Dear ${customer.name},

Your HVAC service appointment has been scheduled:

Date: ${appointment.date}
Time: ${appointment.time}
Technician: ${appointment.techName}

Please ensure someone is home during this time. Our technician will arrive within 15 minutes of the scheduled time.

If you need to reschedule, please call us immediately.

Thanks,
5 Star Partners HVAC`;

    const [sms, email] = await Promise.all([
      mockNotificationProvider.sendSMS(customer.phone, smsMessage),
      mockNotificationProvider.sendEmail(customer.email, 'Appointment Confirmation', emailBody),
    ]);

    return { sms, email };
  },

  sendTechnicianDispatch: async (
    technician: { name: string; phone: string },
    job: { address: string; customerName: string; jobId: string }
  ): Promise<Notification> => {
    const message = `You have been dispatched to ${job.address} for a service call with ${job.customerName}. Job ID: ${job.jobId}. Please confirm arrival.`;

    return mockNotificationProvider.sendSMS(technician.phone, message);
  },

  sendCustomerReminder: async (
    customer: { name: string; phone: string },
    appointment: { date: string; time: string }
  ): Promise<Notification> => {
    const message = `Hi ${customer.name}, reminder of your appointment on ${appointment.date} at ${appointment.time}. Our technician will arrive shortly. Reply CONFIRM or call if you need to reschedule.`;

    return mockNotificationProvider.sendSMS(customer.phone, message);
  },

  sendTechEnRoute: async (
    customer: { name: string; phone: string },
    technician: { name: string; eta: string }
  ): Promise<Notification> => {
    const message = `${technician.name} is on the way to your home and should arrive in approximately ${technician.eta}. Have your door unlocked if possible.`;

    return mockNotificationProvider.sendSMS(customer.phone, message);
  },

  sendInvoice: async (
    customer: { name: string; email: string },
    invoice: { invoiceNumber: string; total: number; dueDate: string }
  ): Promise<Notification> => {
    const emailBody = `Dear ${customer.name},

Your invoice is ready for payment.

Invoice Number: ${invoice.invoiceNumber}
Total Due: $${invoice.total.toFixed(2)}
Due Date: ${invoice.dueDate}

Please click the link below to view and pay your invoice:
[Payment Link]

Thank you for choosing 5 Star Partners!`;

    return mockNotificationProvider.sendEmail(customer.email, 'Invoice Attached', emailBody);
  },
};
