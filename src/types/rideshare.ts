// Base interfaces
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// String literal types (instead of enums)
export type UserStatus = 'active' | 'suspended' | 'blocked' | 'pending';

export type DriverStatus = 'active' | 'inactive' | 'suspended' | 'banned' | 'pending_verification' | 'rejected';

export type RideStatus = 'requested' | 'accepted' | 'ongoing' | 'completed' | 'cancelled' | 'disputed';

export type VerificationStatus = 'pending' | 'approved' | 'rejected' | 'resubmitted';

export type DocumentType = 'drivers_license' | 'vehicle_registration' | 'insurance' | 'passport' | 'national_id';

export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';

export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

export type EmergencyStatus = 'active' | 'resolved' | 'false_alarm' | 'forwarded';

export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

// User Management
export interface User extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  status: UserStatus;
  isVerified: boolean;
  kycStatus?: VerificationStatus;
  totalRides: number;
  rating: number;
  joinedDate: Date;
  lastActiveDate?: Date;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

// Driver Management
export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
  capacity: number;
  type: 'sedan' | 'suv' | 'hatchback' | 'minivan';
}

export interface Driver extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  status: DriverStatus;
  licenseNumber: string;
  licenseExpiry: Date;
  isVerified: boolean;
  verificationStatus: VerificationStatus;
  vehicle: Vehicle;
  totalRides: number;
  rating: number;
  earnings: number;
  joinedDate: Date;
  lastActiveDate?: Date;
  documents: Document[];
  bankDetails?: {
    accountNumber: string;
    routingNumber: string;
    bankName: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

// Document Management
export interface Document extends BaseEntity {
  type: DocumentType;
  url: string;
  status: VerificationStatus;
  uploadedAt: Date;
  verifiedAt?: Date;
  verifiedBy?: string;
  rejectionReason?: string;
  expiryDate?: Date;
  ownerId: string;
  ownerType: 'driver' | 'user';
}

// Ride Management
export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  state: string;
}

export interface Ride extends BaseEntity {
  rideId: string;
  driverId: string;
  passengerId: string;
  status: RideStatus;
  pickup: Location;
  destination: Location;
  requestedAt: Date;
  acceptedAt?: Date;
  startedAt?: Date;
  completedAt?: Date;
  cancelledAt?: Date;
  distance: number; // in kilometers
  duration: number; // in minutes
  fare: {
    baseFare: number;
    distanceFare: number;
    timeFare: number;
    surcharge?: number;
    discount?: number;
    total: number;
  };
  paymentStatus: PaymentStatus;
  driverRating?: number;
  passengerRating?: number;
  notes?: string;
  cancellationReason?: string;
}

// Verification Queue
export interface VerificationRequest extends BaseEntity {
  driverId: string;
  documentType: DocumentType;
  documentUrl: string;
  status: VerificationStatus;
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  comments?: string;
  rejectionReason?: string;
}

// Emergency & Safety
export interface EmergencyAlert extends BaseEntity {
  rideId?: string;
  userId?: string;
  driverId?: string;
  type: 'sos' | 'accident' | 'harassment' | 'other';
  status: EmergencyStatus;
  location: Location;
  description: string;
  reportedAt: Date;
  resolvedAt?: Date;
  resolvedBy?: string;
  actions: string[];
  contacts: {
    police?: string;
    ambulance?: string;
    emergency?: string;
  };
}

// Customer Support
export interface SupportTicket extends BaseEntity {
  ticketNumber: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: 'payment' | 'ride' | 'driver' | 'app' | 'other';
  createdBy: string;
  createdByType: 'user' | 'driver';
  assignedTo?: string;
  responses: TicketResponse[];
  attachments?: string[];
  resolution?: string;
  resolvedAt?: Date;
}

export interface TicketResponse extends BaseEntity {
  message: string;
  attachments?: string[];
  isInternal: boolean;
  respondedBy: string;
  respondedByType: 'admin' | 'user' | 'driver';
}

// System Settings
export interface SystemSettings {
  fareSettings: {
    baseFare: number;
    farePerKm: number;
    farePerMinute: number;
    minimumFare: number;
    cancellationFee: number;
    commissionPercentage: number;
  };
  safetySettings: {
    enableSOS: boolean;
    emergencyContacts: string[];
    maxRideDistance: number;
    maxWaitTime: number;
    backgroundCheckRequired: boolean;
  };
  verificationSettings: {
    autoApprovalEnabled: boolean;
    documentExpiryWarningDays: number;
    requiredDocuments: DocumentType[];
  };
}

// Dashboard Analytics
export interface DashboardMetrics {
  totalRides: number;
  totalEarnings: number;
  activeDrivers: number;
  activeUsers: number;
  pendingVerifications: number;
  openTickets: number;
  emergencyAlerts: number;
  todayRides: number;
  monthlyGrowth: {
    rides: number;
    earnings: number;
    users: number;
    drivers: number;
  };
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
  }[];
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Filter and Search Types
export interface FilterOptions {
  status?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  location?: string;
  rating?: number;
  search?: string;
}

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}