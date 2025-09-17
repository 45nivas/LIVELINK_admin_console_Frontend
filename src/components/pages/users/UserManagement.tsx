import React, { useState } from 'react';
import { Text } from '../../atoms/Text/Text';
import { Button } from '../../atoms/Button/Button';
import { mockUsers, USER_STATUS_OPTIONS } from '../../../data/mockData';
import type { User } from '../../../types/rideshare';

interface UserCardProps {
  user: User;
  onViewDetails: (user: User) => void;
  onSuspend: (userId: string) => void;
  onActivate: (userId: string) => void;
  onBlock: (userId: string) => void;
  onVerify: (userId: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ 
  user, 
  onViewDetails, 
  onSuspend, 
  onActivate, 
  onBlock,
  onVerify
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'suspended': return 'bg-yellow-100 text-yellow-800';
      case 'blocked': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskLevel = (totalRides: number, rating: number) => {
    if (rating < 3.0 && totalRides > 5) return { level: 'High', color: 'text-red-600' };
    if (rating < 4.0 && totalRides > 10) return { level: 'Medium', color: 'text-yellow-600' };
    return { level: 'Low', color: 'text-green-600' };
  };

  const risk = getRiskLevel(user.totalRides, user.rating);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            {user.avatar && (
              <img
                src={user.avatar}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-12 h-12 rounded-full object-cover"
              />
            )}
            <div>
              <Text size="lg" weight="semibold" className="text-gray-900">
                {user.firstName} {user.lastName}
              </Text>
              <Text size="sm" className="text-gray-600">
                ID: {user.id}
              </Text>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Text size="sm" className="text-gray-600">Email</Text>
              <Text size="sm" weight="medium">{user.email}</Text>
            </div>
            <div>
              <Text size="sm" className="text-gray-600">Phone</Text>
              <Text size="sm" weight="medium">{user.phone || 'Not provided'}</Text>
            </div>
            <div>
              <Text size="sm" className="text-gray-600">Total Rides</Text>
              <Text size="sm" weight="medium">{user.totalRides}</Text>
            </div>
            <div>
              <Text size="sm" className="text-gray-600">Rating</Text>
              <Text size="sm" weight="medium">
                {user.rating > 0 ? `${user.rating.toFixed(1)} ⭐` : 'No ratings yet'}
              </Text>
            </div>
            <div>
              <Text size="sm" className="text-gray-600">Risk Level</Text>
              <Text size="sm" weight="medium" className={risk.color}>
                {risk.level}
              </Text>
            </div>
            <div>
              <Text size="sm" className="text-gray-600">Joined</Text>
              <Text size="sm" weight="medium">
                {user.joinedDate.toLocaleDateString()}
              </Text>
            </div>
          </div>

          <div className="flex space-x-2 mb-4">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
              {user.status.toUpperCase()}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              user.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {user.isVerified ? 'VERIFIED' : 'UNVERIFIED'}
            </span>
          </div>

          {user.lastActiveDate && (
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <Text size="sm" weight="medium" className="text-gray-900 mb-1">
                Last Active: {user.lastActiveDate.toLocaleDateString()}
              </Text>
              <Text size="xs" className="text-gray-600">
                {user.address && `Location: ${user.address.city}, ${user.address.state}`}
              </Text>
            </div>
          )}
        </div>

        <div className="flex flex-col space-y-2 ml-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onViewDetails(user)}
          >
            View Details
          </Button>
          
          {!user.isVerified && (
            <Button
              size="sm"
              variant="primary"
              onClick={() => onVerify(user.id)}
            >
              Verify KYC
            </Button>
          )}
          
          {user.status === 'active' && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onSuspend(user.id)}
              className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
            >
              Suspend
            </Button>
          )}
          
          {user.status === 'suspended' && (
            <Button
              size="sm"
              variant="primary"
              onClick={() => onActivate(user.id)}
            >
              Activate
            </Button>
          )}
          
          {user.status !== 'blocked' && (
            <Button
              size="sm"
              variant="danger"
              onClick={() => onBlock(user.id)}
            >
              Block
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [verificationFilter, setVerificationFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user => {
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesVerification = verificationFilter === 'all' || 
      (verificationFilter === 'verified' && user.isVerified) ||
      (verificationFilter === 'unverified' && !user.isVerified);
    const matchesSearch = 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesVerification && matchesSearch;
  });

  const handleViewDetails = (user: User) => {
    console.log('View user details:', user);
    // In a real app, this would navigate to user detail view
  };

  const handleSuspend = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, status: 'suspended' }
        : user
    ));
    console.log('Suspended user:', userId);
  };

  const handleActivate = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, status: 'active' }
        : user
    ));
    console.log('Activated user:', userId);
  };

  const handleBlock = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, status: 'blocked' }
        : user
    ));
    console.log('Blocked user:', userId);
  };

  const handleVerify = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, isVerified: true }
        : user
    ));
    console.log('Verified user KYC:', userId);
  };

  const activeCount = users.filter(u => u.status === 'active').length;
  const suspendedCount = users.filter(u => u.status === 'suspended').length;
  const blockedCount = users.filter(u => u.status === 'blocked').length;
  const unverifiedCount = users.filter(u => !u.isVerified).length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <Text as="h1" size="4xl" weight="bold" className="text-gray-900 mb-2">
          User Management
        </Text>
        <Text size="base" className="text-gray-600">
          Manage rider accounts, KYC verification, and user safety.
        </Text>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <Text size="sm" className="text-gray-600 mb-1">Total Users</Text>
          <Text size="3xl" weight="bold" className="text-gray-900">{users.length}</Text>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <Text size="sm" className="text-gray-600 mb-1">Active Users</Text>
          <Text size="3xl" weight="bold" className="text-green-600">{activeCount}</Text>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <Text size="sm" className="text-gray-600 mb-1">Pending KYC</Text>
          <Text size="3xl" weight="bold" className="text-yellow-600">{unverifiedCount}</Text>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <Text size="sm" className="text-gray-600 mb-1">Suspended/Blocked</Text>
          <Text size="3xl" weight="bold" className="text-red-600">{suspendedCount + blockedCount}</Text>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Text size="sm" weight="medium" className="text-gray-700 mb-2">
              Search Users
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              {USER_STATUS_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Text size="sm" weight="medium" className="text-gray-700 mb-2">
              Filter by Verification
            </Text>
            <select
              value={verificationFilter}
              onChange={(e) => setVerificationFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Users</option>
              <option value="verified">Verified Only</option>
              <option value="unverified">Unverified Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* User List */}
      <div className="space-y-4">
        {filteredUsers.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Text size="lg" className="text-gray-500">
              No users found matching your criteria.
            </Text>
          </div>
        ) : (
          filteredUsers.map(user => (
            <UserCard
              key={user.id}
              user={user}
              onViewDetails={handleViewDetails}
              onSuspend={handleSuspend}
              onActivate={handleActivate}
              onBlock={handleBlock}
              onVerify={handleVerify}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default UserManagement;