import React, { useState } from 'react';
import { Text } from '../../atoms/Text/Text';
import { Button } from '../../atoms/Button/Button';
import { mockDrivers, DRIVER_STATUS_OPTIONS } from '../../../data/mockData';
import type { Driver } from '../../../types/rideshare';

interface DriverCardProps {
  driver: Driver;
  onViewDetails: (driver: Driver) => void;
  onApprove: (driverId: string) => void;
  onReject: (driverId: string) => void;
  onSuspend: (driverId: string) => void;
}

const DriverCard: React.FC<DriverCardProps> = ({ 
  driver, 
  onViewDetails, 
  onApprove, 
  onReject, 
  onSuspend 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending_verification': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'banned': return 'bg-red-100 text-red-800';
      case 'rejected': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVerificationColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            {driver.avatar && (
              <img
                src={driver.avatar}
                alt={`${driver.firstName} ${driver.lastName}`}
                className="w-12 h-12 rounded-full object-cover"
              />
            )}
            <div>
              <Text size="lg" weight="semibold" className="text-gray-900">
                {driver.firstName} {driver.lastName}
              </Text>
              <Text size="sm" className="text-gray-600">
                ID: {driver.id}
              </Text>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Text size="sm" className="text-gray-600">Email</Text>
              <Text size="sm" weight="medium">{driver.email}</Text>
            </div>
            <div>
              <Text size="sm" className="text-gray-600">Phone</Text>
              <Text size="sm" weight="medium">{driver.phone}</Text>
            </div>
            <div>
              <Text size="sm" className="text-gray-600">Total Rides</Text>
              <Text size="sm" weight="medium">{driver.totalRides}</Text>
            </div>
            <div>
              <Text size="sm" className="text-gray-600">Rating</Text>
              <Text size="sm" weight="medium">
                {driver.rating > 0 ? `${driver.rating.toFixed(1)} ⭐` : 'No ratings yet'}
              </Text>
            </div>
            <div>
              <Text size="sm" className="text-gray-600">Earnings</Text>
              <Text size="sm" weight="medium">${driver.earnings.toFixed(2)}</Text>
            </div>
            <div>
              <Text size="sm" className="text-gray-600">Joined</Text>
              <Text size="sm" weight="medium">
                {driver.joinedDate.toLocaleDateString()}
              </Text>
            </div>
          </div>

          <div className="flex space-x-2 mb-4">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(driver.status)}`}>
              {driver.status.replace('_', ' ').toUpperCase()}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getVerificationColor(driver.verificationStatus)}`}>
              {driver.verificationStatus.toUpperCase()}
            </span>
          </div>

          {driver.vehicle && (
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <Text size="sm" weight="medium" className="text-gray-900 mb-1">
                Vehicle: {driver.vehicle.year} {driver.vehicle.make} {driver.vehicle.model}
              </Text>
              <Text size="xs" className="text-gray-600">
                {driver.vehicle.color} • {driver.vehicle.licensePlate} • {driver.vehicle.capacity} seats
              </Text>
            </div>
          )}
        </div>

        <div className="flex flex-col space-y-2 ml-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onViewDetails(driver)}
          >
            View Details
          </Button>
          
          {driver.verificationStatus === 'pending' && (
            <>
              <Button
                size="sm"
                variant="primary"
                onClick={() => onApprove(driver.id)}
              >
                Approve
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => onReject(driver.id)}
              >
                Reject
              </Button>
            </>
          )}
          
          {driver.status === 'active' && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onSuspend(driver.id)}
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              Suspend
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export const DriverManagement: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>(mockDrivers);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDrivers = drivers.filter(driver => {
    const matchesStatus = statusFilter === 'all' || driver.status === statusFilter;
    const matchesSearch = 
      driver.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const handleViewDetails = (driver: Driver) => {
    console.log('View driver details:', driver);
    // In a real app, this would navigate to driver detail view
  };

  const handleApprove = (driverId: string) => {
    setDrivers(prev => prev.map(driver => 
      driver.id === driverId 
        ? { ...driver, status: 'active', verificationStatus: 'approved', isVerified: true }
        : driver
    ));
    console.log('Approved driver:', driverId);
  };

  const handleReject = (driverId: string) => {
    setDrivers(prev => prev.map(driver => 
      driver.id === driverId 
        ? { ...driver, status: 'rejected', verificationStatus: 'rejected' }
        : driver
    ));
    console.log('Rejected driver:', driverId);
  };

  const handleSuspend = (driverId: string) => {
    setDrivers(prev => prev.map(driver => 
      driver.id === driverId 
        ? { ...driver, status: 'suspended' }
        : driver
    ));
    console.log('Suspended driver:', driverId);
  };

  const pendingCount = drivers.filter(d => d.verificationStatus === 'pending').length;
  const activeCount = drivers.filter(d => d.status === 'active').length;
  const suspendedCount = drivers.filter(d => d.status === 'suspended').length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <Text as="h1" size="4xl" weight="bold" className="text-gray-900 mb-2">
          Driver Management
        </Text>
        <Text size="base" className="text-gray-600">
          Manage driver applications, verifications, and account status.
        </Text>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <Text size="sm" className="text-gray-600 mb-1">Total Drivers</Text>
          <Text size="3xl" weight="bold" className="text-gray-900">{drivers.length}</Text>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <Text size="sm" className="text-gray-600 mb-1">Active Drivers</Text>
          <Text size="3xl" weight="bold" className="text-green-600">{activeCount}</Text>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <Text size="sm" className="text-gray-600 mb-1">Pending Verification</Text>
          <Text size="3xl" weight="bold" className="text-yellow-600">{pendingCount}</Text>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <Text size="sm" className="text-gray-600 mb-1">Suspended</Text>
          <Text size="3xl" weight="bold" className="text-red-600">{suspendedCount}</Text>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Text size="sm" weight="medium" className="text-gray-700 mb-2">
              Search Drivers
            </Text>
            <input
              type="text"
              placeholder="Search by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <Text size="sm" weight="medium" className="text-gray-700 mb-2">
              Filter by Status
            </Text>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              {DRIVER_STATUS_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Driver List */}
      <div className="space-y-4">
        {filteredDrivers.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Text size="lg" className="text-gray-500">
              No drivers found matching your criteria.
            </Text>
          </div>
        ) : (
          filteredDrivers.map(driver => (
            <DriverCard
              key={driver.id}
              driver={driver}
              onViewDetails={handleViewDetails}
              onApprove={handleApprove}
              onReject={handleReject}
              onSuspend={handleSuspend}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default DriverManagement;