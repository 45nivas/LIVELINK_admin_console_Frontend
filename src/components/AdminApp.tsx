import React, { useState } from 'react';
import { Text } from './atoms/Text/Text';
import { Dashboard, DriverManagement } from './pages';
import { UserManagement } from './pages/users/UserManagement';
import { RideManagement } from './pages/rides/RideManagement';
import { VerificationQueue } from './pages/verification/VerificationQueue';
import { EmergencySafety } from './pages/emergency/EmergencySafety';
import CustomerSupport from './pages/support/CustomerSupport';
import SystemSettings from './pages/settings/SystemSettings';

type PageType = 'dashboard' | 'drivers' | 'users' | 'rides' | 'verification' | 'emergency' | 'support' | 'settings';

const Navigation: React.FC<{ currentPage: PageType; onPageChange: (page: PageType) => void }> = ({
  currentPage,
  onPageChange
}) => {
  const navItems = [
    { id: 'dashboard' as PageType, label: 'Dashboard', icon: '📊' },
    { id: 'drivers' as PageType, label: 'Drivers', icon: '🚗' },
    { id: 'users' as PageType, label: 'Users', icon: '👥' },
    { id: 'rides' as PageType, label: 'Rides', icon: '🚕' },
    { id: 'verification' as PageType, label: 'Verification', icon: '✅' },
    { id: 'emergency' as PageType, label: 'Emergency', icon: '🚨' },
    { id: 'support' as PageType, label: 'Support', icon: '💬' },
    { id: 'settings' as PageType, label: 'Settings', icon: '⚙️' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <Text size="xl" weight="bold" color="primary">
          LIVELINK Admin
        </Text>
        <div className="flex space-x-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === item.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export const AdminApp: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'drivers':
        return <DriverManagement />;
      case 'users':
        return <UserManagement />;
      case 'rides':
        return <RideManagement />;
      case 'verification':
        return <VerificationQueue />;
      case 'emergency':
        return <EmergencySafety />;
      case 'support':
        return <CustomerSupport />;
      case 'settings':
        return <SystemSettings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      {renderPage()}
    </div>
  );
};

export default AdminApp;