import type { User, Driver, Ride, SupportTicket, EmergencyAlert, DashboardMetrics } from '../types/rideshare';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '+1234567890',
    avatar: 'https://via.placeholder.com/150',
    status: 'active',
    isVerified: true,
    totalRides: 45,
    rating: 4.8,
    joinedDate: new Date('2024-01-15'),
    lastActiveDate: new Date('2024-09-10'),
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-09-10'),
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    }
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@email.com',
    phone: '+1234567891',
    status: 'active',
    isVerified: true,
    totalRides: 32,
    rating: 4.6,
    joinedDate: new Date('2024-02-20'),
    lastActiveDate: new Date('2024-09-11'),
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-09-11')
  },
  {
    id: '3',
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'mike.johnson@email.com',
    phone: '+1234567892',
    status: 'suspended',
    isVerified: false,
    totalRides: 8,
    rating: 3.2,
    joinedDate: new Date('2024-08-01'),
    lastActiveDate: new Date('2024-08-15'),
    createdAt: new Date('2024-08-01'),
    updatedAt: new Date('2024-08-15')
  }
];

// Mock Drivers
export const mockDrivers: Driver[] = [
  {
    id: '1',
    firstName: 'Robert',
    lastName: 'Wilson',
    email: 'robert.wilson@email.com',
    phone: '+1234567893',
    avatar: 'https://via.placeholder.com/150',
    status: 'active',
    licenseNumber: 'DL123456789',
    licenseExpiry: new Date('2026-12-31'),
    isVerified: true,
    verificationStatus: 'approved',
    totalRides: 234,
    rating: 4.9,
    earnings: 12450.50,
    joinedDate: new Date('2023-11-10'),
    lastActiveDate: new Date('2024-09-11'),
    createdAt: new Date('2023-11-10'),
    updatedAt: new Date('2024-09-11'),
    vehicle: {
      id: 'v1',
      make: 'Toyota',
      model: 'Camry',
      year: 2022,
      color: 'Silver',
      licensePlate: 'ABC123',
      capacity: 4,
      type: 'sedan'
    },
    documents: [],
    address: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'USA'
    }
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Davis',
    email: 'sarah.davis@email.com',
    phone: '+1234567894',
    status: 'pending_verification',
    licenseNumber: 'DL987654321',
    licenseExpiry: new Date('2025-08-15'),
    isVerified: false,
    verificationStatus: 'pending',
    totalRides: 0,
    rating: 0,
    earnings: 0,
    joinedDate: new Date('2024-09-05'),
    createdAt: new Date('2024-09-05'),
    updatedAt: new Date('2024-09-05'),
    vehicle: {
      id: 'v2',
      make: 'Honda',
      model: 'Civic',
      year: 2021,
      color: 'Blue',
      licensePlate: 'XYZ789',
      capacity: 4,
      type: 'sedan'
    },
    documents: [],
    address: {
      street: '789 Pine St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'USA'
    }
  }
];

// Mock Rides
export const mockRides: Ride[] = [
  {
    id: '1',
    rideId: 'RIDE001',
    driverId: '1',
    passengerId: '1',
    status: 'completed',
    pickup: {
      latitude: 40.7128,
      longitude: -74.0060,
      address: '123 Main St',
      city: 'New York',
      state: 'NY'
    },
    destination: {
      latitude: 40.7589,
      longitude: -73.9851,
      address: '456 Broadway',
      city: 'New York',
      state: 'NY'
    },
    requestedAt: new Date('2024-09-11T10:00:00'),
    acceptedAt: new Date('2024-09-11T10:02:00'),
    startedAt: new Date('2024-09-11T10:15:00'),
    completedAt: new Date('2024-09-11T10:45:00'),
    distance: 5.2,
    duration: 30,
    fare: {
      baseFare: 3.50,
      distanceFare: 10.40,
      timeFare: 4.50,
      total: 18.40
    },
    paymentStatus: 'completed',
    driverRating: 5,
    passengerRating: 5,
    createdAt: new Date('2024-09-11T10:00:00'),
    updatedAt: new Date('2024-09-11T10:45:00')
  },
  {
    id: '2',
    rideId: 'RIDE002',
    driverId: '1',
    passengerId: '2',
    status: 'ongoing',
    pickup: {
      latitude: 34.0522,
      longitude: -118.2437,
      address: '789 Sunset Blvd',
      city: 'Los Angeles',
      state: 'CA'
    },
    destination: {
      latitude: 34.0928,
      longitude: -118.3287,
      address: '321 Hollywood Blvd',
      city: 'Los Angeles',
      state: 'CA'
    },
    requestedAt: new Date('2024-09-11T14:00:00'),
    acceptedAt: new Date('2024-09-11T14:03:00'),
    startedAt: new Date('2024-09-11T14:15:00'),
    distance: 8.1,
    duration: 25,
    fare: {
      baseFare: 3.50,
      distanceFare: 16.20,
      timeFare: 3.75,
      total: 23.45
    },
    paymentStatus: 'pending',
    createdAt: new Date('2024-09-11T14:00:00'),
    updatedAt: new Date('2024-09-11T14:15:00')
  }
];

// Mock Support Tickets
export const mockTickets: SupportTicket[] = [
  {
    id: '1',
    ticketNumber: 'TKT001',
    subject: 'Payment Issue',
    description: 'I was charged twice for the same ride',
    status: 'open',
    priority: 'high',
    category: 'payment',
    createdBy: '1',
    createdByType: 'user',
    responses: [],
    createdAt: new Date('2024-09-10T15:30:00'),
    updatedAt: new Date('2024-09-10T15:30:00')
  },
  {
    id: '2',
    ticketNumber: 'TKT002',
    subject: 'Driver was rude',
    description: 'The driver was unprofessional during the ride',
    status: 'in_progress',
    priority: 'medium',
    category: 'driver',
    createdBy: '2',
    createdByType: 'user',
    assignedTo: 'admin1',
    responses: [],
    createdAt: new Date('2024-09-09T12:15:00'),
    updatedAt: new Date('2024-09-10T09:00:00')
  }
];

// Mock Emergency Alerts
export const mockEmergencyAlerts: EmergencyAlert[] = [
  {
    id: '1',
    rideId: '1',
    userId: '1',
    type: 'sos',
    status: 'resolved',
    location: {
      latitude: 40.7128,
      longitude: -74.0060,
      address: '123 Emergency St',
      city: 'New York',
      state: 'NY'
    },
    description: 'Passenger pressed SOS button',
    reportedAt: new Date('2024-09-10T20:30:00'),
    resolvedAt: new Date('2024-09-10T21:00:00'),
    resolvedBy: 'admin1',
    actions: ['Contacted emergency services', 'Called passenger', 'Incident resolved'],
    contacts: {
      police: '911',
      emergency: '911'
    },
    createdAt: new Date('2024-09-10T20:30:00'),
    updatedAt: new Date('2024-09-10T21:00:00')
  }
];

// Mock Dashboard Metrics
export const mockDashboardMetrics: DashboardMetrics = {
  totalRides: 1247,
  totalEarnings: 45670.25,
  activeDrivers: 156,
  activeUsers: 2341,
  pendingVerifications: 8,
  openTickets: 23,
  emergencyAlerts: 2,
  todayRides: 47,
  monthlyGrowth: {
    rides: 12.5,
    earnings: 8.3,
    users: 15.7,
    drivers: 6.2
  }
};

// Constants for status options
export const USER_STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'suspended', label: 'Suspended' },
  { value: 'blocked', label: 'Blocked' },
  { value: 'pending', label: 'Pending' }
];

export const DRIVER_STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'suspended', label: 'Suspended' },
  { value: 'banned', label: 'Banned' },
  { value: 'pending_verification', label: 'Pending Verification' },
  { value: 'rejected', label: 'Rejected' }
];

export const RIDE_STATUS_OPTIONS = [
  { value: 'requested', label: 'Requested' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'ongoing', label: 'Ongoing' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'disputed', label: 'Disputed' }
];

export const TICKET_STATUS_OPTIONS = [
  { value: 'open', label: 'Open' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'closed', label: 'Closed' }
];

export const TICKET_PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' }
];