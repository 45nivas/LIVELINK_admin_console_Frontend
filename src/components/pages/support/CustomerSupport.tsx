import React, { useState } from 'react';
import { Text } from '../../atoms/Text/Text';
import { Button } from '../../atoms/Button/Button';
import { mockTickets, TICKET_STATUS_OPTIONS, TICKET_PRIORITY_OPTIONS } from '../../../data/mockData';
import type { SupportTicket } from '../../../types/rideshare';

interface TicketCardProps {
  ticket: SupportTicket;
  onResolve: (ticketId: string, resolution: string) => void;
  onAssign: (ticketId: string, assignee: string) => void;
  onEscalate: (ticketId: string) => void;
  onViewDetails: (ticket: SupportTicket) => void;
}

const TicketCard: React.FC<TicketCardProps> = ({ 
  ticket, 
  onResolve, 
  onAssign, 
  onEscalate, 
  onViewDetails 
}) => {
  const [resolution, setResolution] = useState('');
  const [assignee, setAssignee] = useState('');
  const [showResolveForm, setShowResolveForm] = useState(false);
  const [showAssignForm, setShowAssignForm] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'payment': return '💳';
      case 'driver': return '🚗';
      case 'user': return '👤';
      case 'technical': return '🔧';
      case 'safety': return '🛡️';
      case 'other': return '📝';
      default: return '📋';
    }
  };

  const handleResolve = () => {
    if (resolution.trim()) {
      onResolve(ticket.id, resolution);
      setResolution('');
      setShowResolveForm(false);
    }
  };

  const handleAssign = () => {
    if (assignee.trim()) {
      onAssign(ticket.id, assignee);
      setAssignee('');
      setShowAssignForm(false);
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
            <span className="text-2xl">{getCategoryIcon(ticket.category)}</span>
            <div>
              <Text size="lg" weight="semibold" className="text-gray-900">
                {ticket.subject}
              </Text>
              <Text size="sm" className="text-gray-600">
                Ticket #{ticket.ticketNumber} • {getTimeSince(ticket.createdAt)}
              </Text>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Text size="sm" className="text-gray-600">Created By</Text>
              <Text size="sm" weight="medium">
                {ticket.createdByType}: {ticket.createdBy}
              </Text>
            </div>
            <div>
              <Text size="sm" className="text-gray-600">Category</Text>
              <Text size="sm" weight="medium">
                {ticket.category.toUpperCase()}
              </Text>
            </div>
            <div>
              <Text size="sm" className="text-gray-600">Assigned To</Text>
              <Text size="sm" weight="medium">
                {ticket.assignedTo || 'Unassigned'}
              </Text>
            </div>
            <div>
              <Text size="sm" className="text-gray-600">Last Updated</Text>
              <Text size="sm" weight="medium">
                {ticket.updatedAt.toLocaleDateString()}
              </Text>
            </div>
          </div>

          <div className="mb-4">
            <Text size="sm" className="text-gray-600 mb-2">Description</Text>
            <div className="bg-gray-50 rounded-lg p-3">
              <Text size="sm" className="text-gray-900">
                {ticket.description}
              </Text>
            </div>
          </div>

          <div className="flex space-x-2 mb-4">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
              {ticket.status.replace('_', ' ').toUpperCase()}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
              {ticket.priority.toUpperCase()} PRIORITY
            </span>
          </div>

          {ticket.responses && ticket.responses.length > 0 && (
            <div className="mb-4">
              <Text size="sm" className="text-gray-600 mb-2">Recent Responses ({ticket.responses.length})</Text>
              <div className="bg-blue-50 rounded-lg p-3">
                <Text size="sm" className="text-blue-900">
                  Latest response available • View details for full conversation
                </Text>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col space-y-2 ml-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onViewDetails(ticket)}
          >
            View Details
          </Button>
          
          {ticket.status === 'open' && !ticket.assignedTo && (
            <Button
              size="sm"
              variant="primary"
              onClick={() => setShowAssignForm(true)}
            >
              Assign
            </Button>
          )}
          
          {(ticket.status === 'open' || ticket.status === 'in_progress') && (
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
                variant="outline"
                onClick={() => onEscalate(ticket.id)}
                className="text-orange-600 border-orange-600 hover:bg-orange-50"
              >
                Escalate
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Assignment Form */}
      {showAssignForm && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <Text size="sm" weight="medium" className="text-blue-900 mb-2">
            Assign Ticket
          </Text>
          <select
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-3"
          >
            <option value="">Select assignee...</option>
            <option value="admin1">Admin 1 - John Smith</option>
            <option value="admin2">Admin 2 - Jane Doe</option>
            <option value="support1">Support 1 - Mike Johnson</option>
            <option value="support2">Support 2 - Sarah Wilson</option>
          </select>
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="primary"
              onClick={handleAssign}
              disabled={!assignee}
            >
              Assign Ticket
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setShowAssignForm(false);
                setAssignee('');
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Resolution Form */}
      {showResolveForm && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg">
          <Text size="sm" weight="medium" className="text-green-900 mb-2">
            Resolution Details
          </Text>
          <textarea
            value={resolution}
            onChange={(e) => setResolution(e.target.value)}
            placeholder="Describe how this issue was resolved..."
            className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 mb-3"
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

export const CustomerSupport: React.FC = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>(mockTickets);
  const [statusFilter, setStatusFilter] = useState<string>('open');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTickets = tickets.filter(ticket => {
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' || ticket.category === categoryFilter;
    const matchesSearch = 
      ticket.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.createdBy.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesPriority && matchesCategory && matchesSearch;
  });

  const handleResolve = (ticketId: string, resolution: string) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { 
            ...ticket, 
            status: 'resolved' as const, 
            updatedAt: new Date(),
            responses: [...(ticket.responses || []), {
              id: `res_${Date.now()}`,
              message: `Resolved: ${resolution}`,
              createdBy: 'admin1',
              createdByType: 'admin' as const,
              createdAt: new Date(),
              isInternal: false,
              respondedBy: 'admin1',
              respondedByType: 'admin' as const,
              updatedAt: new Date()
            }]
          }
        : ticket
    ));
    console.log('Resolved ticket:', ticketId, 'Resolution:', resolution);
  };

  const handleAssign = (ticketId: string, assignee: string) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { 
            ...ticket, 
            assignedTo: assignee, 
            status: 'in_progress' as const,
            updatedAt: new Date()
          }
        : ticket
    ));
    console.log('Assigned ticket:', ticketId, 'to:', assignee);
  };

  const handleEscalate = (ticketId: string) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { 
            ...ticket, 
            priority: ticket.priority === 'low' ? 'medium' : 
                     ticket.priority === 'medium' ? 'high' : 
                     ticket.priority === 'high' ? 'urgent' : 'urgent',
            updatedAt: new Date()
          }
        : ticket
    ));
    console.log('Escalated ticket:', ticketId);
  };

  const handleViewDetails = (ticket: SupportTicket) => {
    console.log('View ticket details:', ticket);
    // In a real app, this would open detailed view with full conversation
  };

  const openCount = tickets.filter(t => t.status === 'open').length;
  const inProgressCount = tickets.filter(t => t.status === 'in_progress').length;
  const resolvedCount = tickets.filter(t => t.status === 'resolved').length;
  const urgentCount = tickets.filter(t => t.priority === 'urgent').length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <Text as="h1" size="4xl" weight="bold" className="text-gray-900 mb-2">
          Customer Support
        </Text>
        <Text size="base" className="text-gray-600">
          Manage support tickets from users and drivers. Handle complaints, payment issues, and technical problems.
        </Text>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <Text size="sm" className="text-gray-600 mb-1">Open Tickets</Text>
          <Text size="3xl" weight="bold" className="text-blue-600">{openCount}</Text>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <Text size="sm" className="text-gray-600 mb-1">In Progress</Text>
          <Text size="3xl" weight="bold" className="text-yellow-600">{inProgressCount}</Text>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <Text size="sm" className="text-gray-600 mb-1">Resolved Today</Text>
          <Text size="3xl" weight="bold" className="text-green-600">{resolvedCount}</Text>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <Text size="sm" className="text-gray-600 mb-1">Urgent</Text>
          <Text size="3xl" weight="bold" className="text-red-600">{urgentCount}</Text>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <Text size="lg" weight="bold" className="text-blue-900 mb-3">
          📞 Support Quick Actions
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="primary" onClick={() => console.log('Create New Ticket')}>
            ➕ Create New Ticket
          </Button>
          <Button variant="outline" onClick={() => console.log('Bulk Update')}>
            📋 Bulk Update Status
          </Button>
          <Button variant="outline" onClick={() => console.log('Export Reports')}>
            📊 Export Reports
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Text size="sm" weight="medium" className="text-gray-700 mb-2">
              Search Tickets
            </Text>
            <input
              type="text"
              placeholder="Search by ticket #, subject, or creator..."
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
              {TICKET_STATUS_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Text size="sm" weight="medium" className="text-gray-700 mb-2">
              Filter by Priority
            </Text>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Priority</option>
              {TICKET_PRIORITY_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Text size="sm" weight="medium" className="text-gray-700 mb-2">
              Filter by Category
            </Text>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="payment">Payment</option>
              <option value="driver">Driver</option>
              <option value="user">User</option>
              <option value="technical">Technical</option>
              <option value="safety">Safety</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Ticket List */}
      <div className="space-y-4">
        {filteredTickets.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Text size="lg" className="text-gray-500">
              No support tickets found matching your criteria.
            </Text>
            <Text size="sm" className="text-gray-400 mt-2">
              🎉 All clear! No tickets need attention right now.
            </Text>
          </div>
        ) : (
          filteredTickets.map(ticket => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onResolve={handleResolve}
              onAssign={handleAssign}
              onEscalate={handleEscalate}
              onViewDetails={handleViewDetails}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CustomerSupport;