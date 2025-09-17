import React, { useState } from 'react';
import { Text } from '../../atoms/Text/Text';
import { Button } from '../../atoms/Button/Button';
import { mockRides, RIDE_STATUS_OPTIONS } from '../../../data/mockData';
import type { Ride } from '../../../types/rideshare';

interface RideCardProps {
  ride: Ride;
  onViewDetails: (ride: Ride) => void;
  onCancelRide: (rideId: string) => void;
  onRefundRide: (rideId: string) => void;
  onResolveDispute: (rideId: string) => void;
}

const RideCard: React.FC<RideCardProps> = ({ 
  ride, 
  onViewDetails, 
  onCancelRide, 
  onRefundRide,
  onResolveDispute
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'ongoing': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'disputed': return 'bg-yellow-100 text-yellow-800';
      case 'requested': return 'bg-gray-100 text-gray-800';
      case 'accepted': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleString();
  };

  const getDurationText = () => {
    if (ride.completedAt && ride.startedAt) {
      const duration = Math.round((ride.completedAt.getTime() - ride.startedAt.getTime()) / (1000 * 60));
      return `${duration} min`;
    }
    if (ride.duration) {
      return `${ride.duration} min`;
    }
    return 'N/A';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <div>
              <Text size="lg" weight="semibold" className="text-gray-900">
                Ride #{ride.rideId}
              </Text>
              <Text size="sm" className="text-gray-600">
                ID: {ride.id}
              </Text>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Text size="sm" className="text-gray-600">Driver ID</Text>
              <Text size="sm" weight="medium">{ride.driverId}</Text>
            </div>
            <div>
              <Text size="sm" className="text-gray-600">Passenger ID</Text>
              <Text size="sm" weight="medium">{ride.passengerId}</Text>
            </div>
            <div>
              <Text size="sm" className="text-gray-600">Distance</Text>
              <Text size="sm" weight="medium">{ride.distance} km</Text>
            </div>
            <div>
              <Text size="sm" className="text-gray-600">Duration</Text>
              <Text size="sm" weight="medium">{getDurationText()}</Text>
            </div>
            <div>
              <Text size="sm" className="text-gray-600">Fare</Text>
              <Text size="sm" weight="medium">${ride.fare.total.toFixed(2)}</Text>
            </div>
            <div>
              <Text size="sm" className="text-gray-600">Requested</Text>
              <Text size="sm" weight="medium">
                {ride.requestedAt.toLocaleDateString()}
              </Text>
            </div>
          </div>

          <div className="mb-4">
            <Text size="sm" className="text-gray-600 mb-2">Route</Text>
            <div className="bg-gray-50 rounded-lg p-3">
              <Text size="sm" weight="medium" className="text-gray-900">
                📍 From: {ride.pickup.address}
              </Text>
              <Text size="sm" className="text-gray-600 mb-2">
                {ride.pickup.city}, {ride.pickup.state}
              </Text>
              <Text size="sm" weight="medium" className="text-gray-900">
                🏁 To: {ride.destination.address}
              </Text>
              <Text size="sm" className="text-gray-600">
                {ride.destination.city}, {ride.destination.state}
              </Text>
            </div>
          </div>

          <div className="flex space-x-2 mb-4">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ride.status)}`}>
              {ride.status.toUpperCase()}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentColor(ride.paymentStatus)}`}>
              PAYMENT: {ride.paymentStatus.toUpperCase()}
            </span>
            {ride.driverRating && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                DRIVER: {ride.driverRating}⭐
              </span>
            )}
            {ride.passengerRating && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                PASSENGER: {ride.passengerRating}⭐
              </span>
            )}
          </div>

          {ride.status === 'ongoing' && (
            <div className="bg-blue-50 rounded-lg p-3 mb-4">
              <Text size="sm" weight="medium" className="text-blue-900 mb-1">
                🚗 Ride in Progress
              </Text>
              <Text size="xs" className="text-blue-700">
                Started: {ride.startedAt ? formatTime(ride.startedAt) : 'N/A'}
              </Text>
            </div>
          )}
        </div>

        <div className="flex flex-col space-y-2 ml-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onViewDetails(ride)}
          >
            View Details
          </Button>
          
          {ride.status === 'ongoing' && (
            <Button
              size="sm"
              variant="danger"
              onClick={() => onCancelRide(ride.id)}
            >
              Cancel Ride
            </Button>
          )}
          
          {ride.status === 'disputed' && (
            <Button
              size="sm"
              variant="primary"
              onClick={() => onResolveDispute(ride.id)}
            >
              Resolve Dispute
            </Button>
          )}
          
          {(ride.status === 'completed' || ride.status === 'cancelled') && 
           ride.paymentStatus === 'completed' && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onRefundRide(ride.id)}
              className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
            >
              Issue Refund
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export const RideManagement: React.FC = () => {
  const [rides, setRides] = useState<Ride[]>(mockRides);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRides = rides.filter(ride => {
    const matchesStatus = statusFilter === 'all' || ride.status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || ride.paymentStatus === paymentFilter;
    const matchesSearch = 
      ride.rideId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.driverId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.passengerId.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesPayment && matchesSearch;
  });

  const handleViewDetails = (ride: Ride) => {
    console.log('View ride details:', ride);
    // In a real app, this would navigate to ride detail view
  };

  const handleCancelRide = (rideId: string) => {
    setRides(prev => prev.map(ride => 
      ride.id === rideId 
        ? { ...ride, status: 'cancelled', paymentStatus: 'refunded' }
        : ride
    ));
    console.log('Cancelled ride:', rideId);
  };

  const handleRefundRide = (rideId: string) => {
    setRides(prev => prev.map(ride => 
      ride.id === rideId 
        ? { ...ride, paymentStatus: 'refunded' }
        : ride
    ));
    console.log('Refunded ride:', rideId);
  };

  const handleResolveDispute = (rideId: string) => {
    setRides(prev => prev.map(ride => 
      ride.id === rideId 
        ? { ...ride, status: 'completed' }
        : ride
    ));
    console.log('Resolved dispute for ride:', rideId);
  };

  const completedCount = rides.filter(r => r.status === 'completed').length;
  const ongoingCount = rides.filter(r => r.status === 'ongoing').length;
  const disputedCount = rides.filter(r => r.status === 'disputed').length;
  const cancelledCount = rides.filter(r => r.status === 'cancelled').length;
  const totalRevenue = rides
    .filter(r => r.status === 'completed' && r.paymentStatus === 'completed')
    .reduce((sum, r) => sum + r.fare.total, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <Text as="h1" size="4xl" weight="bold" className="text-gray-900 mb-2">
          Ride Management
        </Text>
        <Text size="base" className="text-gray-600">
          Track rides, handle disputes, manage cancellations, and monitor trip history.
        </Text>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <Text size="sm" className="text-gray-600 mb-1">Total Rides</Text>
          <Text size="3xl" weight="bold" className="text-gray-900">{rides.length}</Text>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <Text size="sm" className="text-gray-600 mb-1">Completed</Text>
          <Text size="3xl" weight="bold" className="text-green-600">{completedCount}</Text>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <Text size="sm" className="text-gray-600 mb-1">Ongoing</Text>
          <Text size="3xl" weight="bold" className="text-blue-600">{ongoingCount}</Text>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <Text size="sm" className="text-gray-600 mb-1">Disputed</Text>
          <Text size="3xl" weight="bold" className="text-yellow-600">{disputedCount}</Text>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <Text size="sm" className="text-gray-600 mb-1">Revenue</Text>
          <Text size="2xl" weight="bold" className="text-green-600">${totalRevenue.toFixed(2)}</Text>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Text size="sm" weight="medium" className="text-gray-700 mb-2">
              Search Rides
            </Text>
            <input
              type="text"
              placeholder="Search by ride ID, driver ID, or passenger ID..."
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              {RIDE_STATUS_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Text size="sm" weight="medium" className="text-gray-700 mb-2">
              Filter by Payment
            </Text>
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Payments</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
        </div>
      </div>

      {/* Ride List */}
      <div className="space-y-4">
        {filteredRides.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Text size="lg" className="text-gray-500">
              No rides found matching your criteria.
            </Text>
          </div>
        ) : (
          filteredRides.map(ride => (
            <RideCard
              key={ride.id}
              ride={ride}
              onViewDetails={handleViewDetails}
              onCancelRide={handleCancelRide}
              onRefundRide={handleRefundRide}
              onResolveDispute={handleResolveDispute}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RideManagement;