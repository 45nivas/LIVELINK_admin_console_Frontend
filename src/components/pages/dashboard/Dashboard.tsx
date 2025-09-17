import React from 'react';
import { Text } from '../../atoms/Text/Text';
import { Button } from '../../atoms/Button/Button';
import { mockDashboardMetrics } from '../../../data/mockData';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, changeType = 'neutral' }) => {
  const changeColor = changeType === 'positive' ? 'text-green-600' : 
                     changeType === 'negative' ? 'text-red-600' : 
                     'text-gray-600';

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <Text size="sm" className="text-gray-600 mb-2">
        {title}
      </Text>
      <Text size="3xl" weight="bold" className="text-gray-900 mb-1">
        {value}
      </Text>
      {change && (
        <Text size="xs" className={changeColor}>
          {change}
        </Text>
      )}
    </div>
  );
};

const QuickActionCard: React.FC<{ title: string; description: string; action: string; onClick: () => void }> = ({
  title, description, action, onClick
}) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
    <Text size="lg" weight="semibold" className="text-gray-900 mb-2">
      {title}
    </Text>
    <Text size="base" className="text-gray-600 mb-4">
      {description}
    </Text>
    <Button 
      variant="primary" 
      size="sm" 
      onClick={onClick}
      className="w-full"
    >
      {action}
    </Button>
  </div>
);

export const Dashboard: React.FC = () => {
  const metrics = mockDashboardMetrics;

  const handleQuickAction = (action: string) => {
    console.log(`Quick action: ${action}`);
    // In a real app, these would navigate to the respective modules
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <Text as="h1" size="4xl" weight="bold" className="text-gray-900 mb-2">
          Dashboard
        </Text>
        <Text size="base" className="text-gray-600">
          Welcome to your ridesharing admin console. Here's what's happening today.
        </Text>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Rides Today"
          value={metrics.todayRides.toLocaleString()}
          change="+12% from yesterday"
          changeType="positive"
        />
        <MetricCard
          title="Active Drivers"
          value={metrics.activeDrivers.toLocaleString()}
          change="+5% from last week"
          changeType="positive"
        />
        <MetricCard
          title="Active Users"
          value={metrics.activeUsers.toLocaleString()}
          change="+8% from last week"
          changeType="positive"
        />
        <MetricCard
          title="Today's Revenue"
          value={`$${(metrics.totalEarnings / 30).toFixed(0)}`}
          change="+15% from yesterday"
          changeType="positive"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Pending Verifications"
          value={metrics.pendingVerifications}
          change="3 urgent"
          changeType="negative"
        />
        <MetricCard
          title="Open Support Tickets"
          value={metrics.openTickets}
          change="2 high priority"
          changeType="negative"
        />
        <MetricCard
          title="Emergency Alerts"
          value={metrics.emergencyAlerts}
          change={metrics.emergencyAlerts > 0 ? "Requires attention" : "All clear"}
          changeType={metrics.emergencyAlerts > 0 ? "negative" : "positive"}
        />
        <MetricCard
          title="System Status"
          value="Operational"
          change="99.9% uptime"
          changeType="positive"
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <Text as="h2" size="2xl" weight="bold" className="text-gray-900 mb-4">
          Quick Actions
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <QuickActionCard
            title="Driver Verification"
            description="Review and approve pending driver applications"
            action="Review Applications"
            onClick={() => handleQuickAction('driver-verification')}
          />
          <QuickActionCard
            title="Support Tickets"
            description="Handle customer support requests"
            action="View Tickets"
            onClick={() => handleQuickAction('support-tickets')}
          />
          <QuickActionCard
            title="Emergency Alerts"
            description="Monitor and respond to emergency situations"
            action="View Alerts"
            onClick={() => handleQuickAction('emergency-alerts')}
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <Text as="h2" size="2xl" weight="bold" className="text-gray-900 mb-4">
          Recent Activity
        </Text>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <Text size="base" className="text-gray-900">
                New driver application submitted
              </Text>
              <Text size="sm" className="text-gray-600">
                John Smith - ID: DR001 - 2 minutes ago
              </Text>
            </div>
            <Button variant="outline" size="sm" onClick={() => handleQuickAction('view-application')}>
              Review
            </Button>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <Text size="base" className="text-gray-900">
                High priority support ticket created
              </Text>
              <Text size="sm" className="text-gray-600">
                Ticket #ST001 - Payment issue - 5 minutes ago
              </Text>
            </div>
            <Button variant="outline" size="sm" onClick={() => handleQuickAction('view-ticket')}>
              Handle
            </Button>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <Text size="base" className="text-gray-900">
                Emergency alert resolved
              </Text>
              <Text size="sm" className="text-gray-600">
                Alert #EA001 - Vehicle breakdown - 10 minutes ago
              </Text>
            </div>
            <Text size="sm" className="text-green-600 font-medium">
              Resolved
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;