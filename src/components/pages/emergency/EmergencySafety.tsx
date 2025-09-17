import React, { useState } from 'react';
import { Text } from '../../atoms/Text/Text';
import { Button } from '../../atoms/Button/Button';
import { mockEmergencyAlerts } from '../../../data/mockData';
import type { EmergencyAlert } from '../../../types/rideshare';

interface EmergencyCardProps {
  alert: EmergencyAlert;
  onResolve: (alertId: string, resolution: string) => void;
  onEscalate: (alertId: string) => void;
  onViewDetails: (alert: EmergencyAlert) => void;
}

const EmergencyCard: React.FC<EmergencyCardProps> = ({ 
  alert, 
  onResolve, 
  onEscalate, 
  onViewDetails 
}) => {
  const [resolution, setResolution] = useState('');
  const [showResolveForm, setShowResolveForm] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'false_alarm': return 'bg-blue-100 text-blue-800';
      case 'forwarded': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'sos': return '🚨';
      case 'accident': return '🚗';
      case 'harassment': return '⚠️';
      case 'medical': return '🏥';
      case 'breakdown': return '🔧';
      case 'safety_concern': return '🛡️';
      default: return '📢';
    }
  };

  const getPriorityColor = (type: string) => {
    switch (type) {
      case 'sos': return 'text-red-600';
      case 'accident': return 'text-red-600';
      case 'medical': return 'text-red-600';
      case 'harassment': return 'text-orange-600';
      case 'breakdown': return 'text-yellow-600';
      case 'safety_concern': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const handleResolve = () => {
    if (resolution.trim()) {
      onResolve(alert.id, resolution);
      setResolution('');
      setShowResolveForm(false);
    }
  };

  const getTimeSince = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-2xl">{getTypeIcon(alert.type)}</span>
            <div>
              <Text size="lg" weight="semibold" className={getPriorityColor(alert.type)}>
                {alert.type.replace('_', ' ').toUpperCase()} ALERT
              </Text>
              <Text size="sm" className="text-gray-600">
                Alert ID: {alert.id} • {getTimeSince(alert.reportedAt)}
              </Text>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Text size="sm" className="text-gray-600">User ID</Text>
              <Text size="sm" weight="medium">{alert.userId}</Text>
            </div>
            <div>
              <Text size="sm" className="text-gray-600">Ride ID</Text>
              <Text size="sm" weight="medium">{alert.rideId || 'N/A'}</Text>
            </div>
            <div>
              <Text size="sm" className="text-gray-600">Reported</Text>
              <Text size="sm" weight="medium">
                {alert.reportedAt.toLocaleString()}
              </Text>
            </div>
            <div>
              <Text size="sm" className="text-gray-600">Status</Text>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                {alert.status.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="mb-4">
            <Text size="sm" className="text-gray-600 mb-2">Description</Text>
            <div className="bg-gray-50 rounded-lg p-3">
              <Text size="sm" className="text-gray-900">
                {alert.description}
              </Text>
            </div>
          </div>

          {alert.location && (
            <div className="mb-4">
              <Text size="sm" className="text-gray-600 mb-2">Location</Text>
              <div className="bg-blue-50 rounded-lg p-3">
                <Text size="sm" weight="medium" className="text-blue-900">
                  📍 {alert.location.address}
                </Text>
                <Text size="sm" className="text-blue-700">
                  {alert.location.city}, {alert.location.state}
                </Text>
                <Text size="xs" className="text-blue-600">
                  Lat: {alert.location.latitude}, Lng: {alert.location.longitude}
                </Text>
              </div>
            </div>
          )}

          {alert.contacts && (
            <div className="mb-4">
              <Text size="sm" className="text-gray-600 mb-2">Emergency Contacts</Text>
              <div className="bg-red-50 rounded-lg p-3">
                {alert.contacts.police && (
                  <Text size="sm" className="text-red-900">
                    🚔 Police: {alert.contacts.police}
                  </Text>
                )}
                {alert.contacts.emergency && (
                  <Text size="sm" className="text-red-900">
                    🚨 Emergency: {alert.contacts.emergency}
                  </Text>
                )}
              </div>
            </div>
          )}

          {alert.actions && alert.actions.length > 0 && (
            <div className="mb-4">
              <Text size="sm" className="text-gray-600 mb-2">Actions Taken</Text>
              <div className="bg-green-50 rounded-lg p-3">
                {alert.actions.map((action, index) => (
                  <Text key={index} size="sm" className="text-green-900 mb-1">
                    • {action}
                  </Text>
                ))}
              </div>
            </div>
          )}

          {alert.resolvedAt && alert.resolvedBy && (
            <div className="bg-green-50 rounded-lg p-3 mb-4">
              <Text size="sm" weight="medium" className="text-green-900 mb-1">
                Resolved by: {alert.resolvedBy}
              </Text>
              <Text size="xs" className="text-green-700">
                {alert.resolvedAt.toLocaleString()}
              </Text>
            </div>
          )}
        </div>

        <div className="flex flex-col space-y-2 ml-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onViewDetails(alert)}
          >
            View Details
          </Button>
          
          {alert.status === 'active' && (
            <>
              <Button
                size="sm"
                variant="primary"
                onClick={() => setShowResolveForm(true)}
              >
                Resolve
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => onEscalate(alert.id)}
              >
                Forward to Emergency Services
              </Button>
            </>
          )}
          
          {alert.status === 'forwarded' && (
            <Button
              size="sm"
              variant="primary"
              onClick={() => setShowResolveForm(true)}
            >
              Mark Resolved
            </Button>
          )}
        </div>
      </div>

      {/* Resolution Form */}
      {showResolveForm && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <Text size="sm" weight="medium" className="text-gray-900 mb-2">
            Resolution Details
          </Text>
          <textarea
            value={resolution}
            onChange={(e) => setResolution(e.target.value)}
            placeholder="Describe how this emergency was resolved..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-3"
            rows={3}
          />
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="primary"
              onClick={handleResolve}
              disabled={!resolution.trim()}
            >
              Mark as Resolved
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setShowResolveForm(false);
                setResolution('');
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export const EmergencySafety: React.FC = () => {
  const [alerts, setAlerts] = useState<EmergencyAlert[]>(mockEmergencyAlerts);
  const [statusFilter, setStatusFilter] = useState<string>('active');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAlerts = alerts.filter(alert => {
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
    const matchesType = typeFilter === 'all' || alert.type === typeFilter;
    const matchesSearch = 
      alert.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (alert.userId && alert.userId.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (alert.rideId && alert.rideId.toLowerCase().includes(searchTerm.toLowerCase())) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesType && matchesSearch;
  });

  const handleResolve = (alertId: string, resolution: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { 
            ...alert, 
            status: 'resolved', 
            resolvedAt: new Date(), 
            resolvedBy: 'admin1',
            actions: [...(alert.actions || []), `Resolved: ${resolution}`]
          }
        : alert
    ));
    console.log('Resolved alert:', alertId, 'Resolution:', resolution);
  };

  const handleEscalate = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { 
            ...alert, 
            status: 'forwarded' as const,
            actions: [...(alert.actions || []), 'Forwarded to emergency services']
          }
        : alert
    ));
    console.log('Forwarded alert to emergency services:', alertId);
  };

  const handleViewDetails = (alert: EmergencyAlert) => {
    console.log('View alert details:', alert);
    // In a real app, this would open detailed view with map, timeline, etc.
  };

  const activeCount = alerts.filter(a => a.status === 'active').length;
  const resolvedCount = alerts.filter(a => a.status === 'resolved').length;
  const forwardedCount = alerts.filter(a => a.status === 'forwarded').length;
  const falseAlarmCount = alerts.filter(a => a.status === 'false_alarm').length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <Text as="h1" size="4xl" weight="bold" className="text-gray-900 mb-2">
          Emergency & Safety
        </Text>
        <Text size="base" className="text-gray-600">
          Monitor and respond to SOS alerts, accidents, harassment reports, and safety concerns.
        </Text>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <Text size="sm" className="text-gray-600 mb-1">Active Alerts</Text>
          <Text size="3xl" weight="bold" className="text-red-600">{activeCount}</Text>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <Text size="sm" className="text-gray-600 mb-1">Forwarded</Text>
          <Text size="3xl" weight="bold" className="text-yellow-600">{forwardedCount}</Text>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <Text size="sm" className="text-gray-600 mb-1">False Alarms</Text>
          <Text size="3xl" weight="bold" className="text-orange-600">{falseAlarmCount}</Text>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <Text size="sm" className="text-gray-600 mb-1">Resolved Today</Text>
          <Text size="3xl" weight="bold" className="text-green-600">{resolvedCount}</Text>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
        <Text size="lg" weight="bold" className="text-red-900 mb-3">
          🚨 Emergency Quick Actions
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="danger" onClick={() => console.log('Contact Police')}>
            📞 Contact Police
          </Button>
          <Button variant="danger" onClick={() => console.log('Contact Emergency Services')}>
            🚑 Emergency Services
          </Button>
          <Button variant="outline" onClick={() => console.log('Broadcast Safety Alert')}>
            📢 Broadcast Alert
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Text size="sm" weight="medium" className="text-gray-700 mb-2">
              Search Alerts
            </Text>
            <input
              type="text"
              placeholder="Search by alert ID, user ID, or description..."
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
              <option value="active">Active</option>
              <option value="forwarded">Forwarded</option>
              <option value="resolved">Resolved</option>
              <option value="false_alarm">False Alarm</option>
            </select>
          </div>
          <div>
            <Text size="sm" weight="medium" className="text-gray-700 mb-2">
              Filter by Type
            </Text>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Types</option>
              <option value="sos">SOS</option>
              <option value="accident">Accident</option>
              <option value="harassment">Harassment</option>
              <option value="medical">Medical</option>
              <option value="breakdown">Breakdown</option>
              <option value="safety_concern">Safety Concern</option>
            </select>
          </div>
        </div>
      </div>

      {/* Alert List */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Text size="lg" className="text-gray-500">
              No emergency alerts found matching your criteria.
            </Text>
            <Text size="sm" className="text-gray-400 mt-2">
              🎉 All clear! No active emergencies at this time.
            </Text>
          </div>
        ) : (
          filteredAlerts.map(alert => (
            <EmergencyCard
              key={alert.id}
              alert={alert}
              onResolve={handleResolve}
              onEscalate={handleEscalate}
              onViewDetails={handleViewDetails}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default EmergencySafety;