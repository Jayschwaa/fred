export enum UserRole {
  OWNER = 'owner',
  ADMIN = 'admin',
  DISPATCHER = 'dispatcher',
  TECHNICIAN = 'technician',
  CSR = 'csr',
}

export enum LeadStatus {
  NEW = 'new',
  CONTACTED = 'contacted',
  QUALIFIED = 'qualified',
  BOOKED = 'booked',
  LOST = 'lost',
}

export enum JobStatus {
  NEW = 'new',
  BOOKED = 'booked',
  CONFIRMED = 'confirmed',
  DISPATCHED = 'dispatched',
  ON_THE_WAY = 'on_the_way',
  ARRIVED = 'arrived',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  INVOICED = 'invoiced',
  PAID = 'paid',
}

export enum ProposalLevel {
  GOOD = 'good',
  BETTER = 'better',
  BEST = 'best',
}

export enum InvoiceStatus {
  DRAFT = 'draft',
  SENT = 'sent',
  PAID = 'paid',
  OVERDUE = 'overdue',
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  companyId: string;
}

export interface Technician {
  id: string;
  name: string;
  email: string;
  phone: string;
  skills: string[];
  hourlyRate: number;
  availability: boolean;
  totalRevenue: number;
  callbackRate: number;
  jobsCompleted: number;
  membershipConversions: number;
}

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  source: string;
  status: LeadStatus;
  tags: string[];
  notes: string;
  nextAction?: string;
  nextActionDate?: string;
  createdAt: string;
  equipment?: Equipment;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  equipmentIds: string[];
}

export interface Equipment {
  id: string;
  type: string;
  brand: string;
  model: string;
  serialNumber: string;
  installedDate?: string;
  warrantyExpires?: string;
  refrigerant?: string;
}

export interface Job {
  id: string;
  customerId: string;
  customer?: Customer;
  technicianId?: string;
  technician?: Technician;
  jobType: string;
  description: string;
  address: string;
  status: JobStatus;
  priority: 'low' | 'medium' | 'high';
  scheduledDate: string;
  scheduledTime?: string;
  estimatedDuration: number;
  createdAt: string;
  updatedAt: string;
  arrivalPhoto?: string;
  bootiesPhoto?: string;
  checklistId?: string;
  proposalIds?: string[];
  approvedProposalId?: string;
  invoiceId?: string;
}

export interface ChecklistItem {
  id: string;
  category: string;
  label: string;
  status?: 'pass' | 'fail' | 'na';
  notes?: string;
  photo?: string;
  required: boolean;
}

export interface Checklist {
  id: string;
  jobId: string;
  items: ChecklistItem[];
  completedAt?: string;
  findings: string;
}

export interface Proposal {
  id: string;
  jobId: string;
  level: ProposalLevel;
  scope: string;
  price: number;
  laborHours: number;
  materials: LineItem[];
  services: LineItem[];
  benefits: string[];
  warranty: string;
  urgency: string;
  approved: boolean;
  approvedAt?: string;
  customerSignature?: string;
  signatureTimestamp?: string;
}

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  jobId: string;
  customerId: string;
  status: InvoiceStatus;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  lineItems: LineItem[];
  subtotal: number;
  tax: number;
  total: number;
  paid: number;
  remaining: number;
  payment?: Payment;
  sentAt?: string;
  paidAt?: string;
}

export interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  method: 'card' | 'cash' | 'check' | 'paymentPlan';
  status: 'pending' | 'processed' | 'failed';
  processedAt?: string;
  last4?: string;
}

export interface PriceBookItem {
  id: string;
  category: string;
  description: string;
  price: number;
  laborHours: number;
  isService: boolean;
  partNumber?: string;
}

export interface DashboardStats {
  todayRevenue: number;
  jobsCompleted: number;
  averageTicket: number;
  closeRate: number;
  todayDate: string;
}
