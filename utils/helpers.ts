import { JobStatus, LeadStatus } from '@/types';

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatDateTime = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

export const getStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    // Job Statuses
    new: '#EF4444',
    booked: '#3B82F6',
    confirmed: '#8B5CF6',
    dispatched: '#EC4899',
    on_the_way: '#F59E0B',
    arrived: '#10B981',
    in_progress: '#6366F1',
    completed: '#10B981',
    invoiced: '#3B82F6',
    paid: '#10B981',
    // Lead Statuses
    contacted: '#3B82F6',
    qualified: '#10B981',
    lost: '#EF4444',
    // Invoice Statuses
    draft: '#6B7280',
    sent: '#3B82F6',
    overdue: '#EF4444',
  };
  return statusColors[status] || '#6B7280';
};

export const getStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    new: 'New',
    booked: 'Booked',
    confirmed: 'Confirmed',
    dispatched: 'Dispatched',
    on_the_way: 'On the Way',
    arrived: 'Arrived',
    in_progress: 'In Progress',
    completed: 'Completed',
    invoiced: 'Invoiced',
    paid: 'Paid',
    contacted: 'Contacted',
    qualified: 'Qualified',
    lost: 'Lost',
    draft: 'Draft',
    sent: 'Sent',
    overdue: 'Overdue',
  };
  return labels[status] || status;
};

export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'high':
      return '#EF4444';
    case 'medium':
      return '#F59E0B';
    case 'low':
      return '#10B981';
    default:
      return '#6B7280';
  }
};

export const getPriorityLabel = (priority: string): string => {
  return priority.charAt(0).toUpperCase() + priority.slice(1);
};

export const calculateDaysSince = (date: string): number => {
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};

export const calculateDaysUntil = (date: string): number => {
  const d = new Date(date);
  const now = new Date();
  const diff = d.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export const getInitials = (firstName: string, lastName: string): string => {
  return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
};

export const generateInvoiceNumber = (): string => {
  const timestamp = Date.now();
  return `INV-${Math.floor(timestamp / 1000).toString().slice(-6)}`;
};

export const calculateTax = (subtotal: number, taxRate: number = 0.08): number => {
  return Math.round(subtotal * taxRate * 100) / 100;
};

export const getJobStatusWorkflow = (): JobStatus[] => {
  return [
    JobStatus.NEW,
    JobStatus.BOOKED,
    JobStatus.CONFIRMED,
    JobStatus.DISPATCHED,
    JobStatus.ON_THE_WAY,
    JobStatus.ARRIVED,
    JobStatus.IN_PROGRESS,
    JobStatus.COMPLETED,
    JobStatus.INVOICED,
    JobStatus.PAID,
  ];
};

export const getLeadStatusWorkflow = (): LeadStatus[] => {
  return [LeadStatus.NEW, LeadStatus.CONTACTED, LeadStatus.QUALIFIED, LeadStatus.BOOKED];
};

export const mockAiFindings = (checklistItems: any[]): string => {
  const failedItems = checklistItems.filter((item) => item.status === 'fail');
  const naItems = checklistItems.filter((item) => item.status === 'na');

  if (failedItems.length === 0) {
    return 'System operating normally. All components checked and functioning within specifications. Recommend annual maintenance to maintain optimal performance.';
  }

  const issues = failedItems.map((item) => `${item.label} needs attention`).join(', ');

  return `System has some maintenance needs: ${issues}. These issues should be addressed to restore optimal efficiency and prevent future breakdowns. Recommend scheduling repair service as soon as possible.`;
};

export const getNextBestAction = (leadSource: string, status: string): string => {
  const actions: Record<string, string> = {
    'new:google': 'Call within 2 hours - Google leads convert best when contacted quickly',
    'new:facebook': 'Send personalized text - Facebook leads respond better to text outreach',
    'new:referral': 'Call and thank for referral - Build relationship with referring customer',
    'contacted:qualified': 'Send proposal - Customer is ready to see pricing',
    'qualified:booked': 'Confirm appointment - Reduce no-shows with 24hr confirmation',
  };

  return (
    actions[`${status}:${leadSource}`] ||
    actions[`new:${leadSource}`] ||
    'Follow up with call or email'
  );
};
