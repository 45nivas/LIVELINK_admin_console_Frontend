import React, { useState } from 'react';
import { Text } from '../../atoms/Text/Text';
import { Button } from '../../atoms/Button/Button';

interface FareSettings {
  baseFare: number;
  perKmRate: number;
  perMinuteRate: number;
  minimumFare: number;
  maximumFare: number;
  peakHourMultiplier: number;
  surgeMultiplier: number;
  cancellationFee: number;
}

interface CommissionSettings {
  driverCommission: number;
  platformCommission: number;
  paymentProcessingFee: number;
  referralBonus: number;
  driverSignupBonus: number;
  userSignupBonus: number;
}

interface SafetySettings {
  maxRideDistance: number;
  maxRideDuration: number;
  driverBackgroundCheckInterval: number;
  vehicleInspectionInterval: number;
  emergencyResponseTime: number;
  sosAlertTimeout: number;
  speedLimitAlert: number;
  nightRideRestrictions: boolean;
}

interface OperationalSettings {
  driverOnlineRadius: number;
  rideMatchingRadius: number;
  waitTimeBeforeCancel: number;
  driverRatingThreshold: number;
  userRatingThreshold: number;
  maxConcurrentRides: number;
  maintenanceMode: boolean;
  newRegistrationsEnabled: boolean;
}

const SystemSettings: React.FC = () => {
  const [fareSettings, setFareSettings] = useState<FareSettings>({
    baseFare: 2.50,
    perKmRate: 1.20,
    perMinuteRate: 0.15,
    minimumFare: 5.00,
    maximumFare: 150.00,
    peakHourMultiplier: 1.5,
    surgeMultiplier: 2.0,
    cancellationFee: 3.00
  });

  const [commissionSettings, setCommissionSettings] = useState<CommissionSettings>({
    driverCommission: 75,
    platformCommission: 25,
    paymentProcessingFee: 2.9,
    referralBonus: 10.00,
    driverSignupBonus: 50.00,
    userSignupBonus: 20.00
  });

  const [safetySettings, setSafetySettings] = useState<SafetySettings>({
    maxRideDistance: 500,
    maxRideDuration: 480,
    driverBackgroundCheckInterval: 365,
    vehicleInspectionInterval: 180,
    emergencyResponseTime: 5,
    sosAlertTimeout: 30,
    speedLimitAlert: 120,
    nightRideRestrictions: true
  });

  const [operationalSettings, setOperationalSettings] = useState<OperationalSettings>({
    driverOnlineRadius: 50,
    rideMatchingRadius: 25,
    waitTimeBeforeCancel: 300,
    driverRatingThreshold: 4.0,
    userRatingThreshold: 3.5,
    maxConcurrentRides: 1,
    maintenanceMode: false,
    newRegistrationsEnabled: true
  });

  const [activeTab, setActiveTab] = useState<'fare' | 'commission' | 'safety' | 'operational'>('fare');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleSaveSettings = () => {
    // In a real app, this would make API calls to save settings
    console.log('Saving settings:', {
      fare: fareSettings,
      commission: commissionSettings,
      safety: safetySettings,
      operational: operationalSettings
    });
    setHasUnsavedChanges(false);
    alert('Settings saved successfully!');
  };

  const handleResetDefaults = () => {
    if (confirm('Are you sure you want to reset all settings to defaults? This action cannot be undone.')) {
      setFareSettings({
        baseFare: 2.50,
        perKmRate: 1.20,
        perMinuteRate: 0.15,
        minimumFare: 5.00,
        maximumFare: 150.00,
        peakHourMultiplier: 1.5,
        surgeMultiplier: 2.0,
        cancellationFee: 3.00
      });
      setCommissionSettings({
        driverCommission: 75,
        platformCommission: 25,
        paymentProcessingFee: 2.9,
        referralBonus: 10.00,
        driverSignupBonus: 50.00,
        userSignupBonus: 20.00
      });
      setSafetySettings({
        maxRideDistance: 500,
        maxRideDuration: 480,
        driverBackgroundCheckInterval: 365,
        vehicleInspectionInterval: 180,
        emergencyResponseTime: 5,
        sosAlertTimeout: 30,
        speedLimitAlert: 120,
        nightRideRestrictions: true
      });
      setOperationalSettings({
        driverOnlineRadius: 50,
        rideMatchingRadius: 25,
        waitTimeBeforeCancel: 300,
        driverRatingThreshold: 4.0,
        userRatingThreshold: 3.5,
        maxConcurrentRides: 1,
        maintenanceMode: false,
        newRegistrationsEnabled: true
      });
      setHasUnsavedChanges(true);
    }
  };

  const markChanged = () => {
    setHasUnsavedChanges(true);
  };

  const TabButton: React.FC<{ tab: typeof activeTab; label: string; icon: string }> = ({ tab, label, icon }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
        activeTab === tab
          ? 'bg-blue-600 text-white shadow-md'
          : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
      }`}
    >
      <span className="text-lg">{icon}</span>
      <Text size="sm" weight="medium">{label}</Text>
    </button>
  );

  const SettingField: React.FC<{
    label: string;
    value: number | boolean;
    type: 'number' | 'boolean';
    unit?: string;
    min?: number;
    max?: number;
    step?: number;
    onChange: (value: number | boolean) => void;
    description?: string;
  }> = ({ label, value, type, unit, min, max, step, onChange, description }) => (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <Text size="sm" weight="medium" className="text-gray-900">{label}</Text>
          {description && (
            <Text size="xs" className="text-gray-600 mt-1">{description}</Text>
          )}
        </div>
        {type === 'number' ? (
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={value as number}
              min={min}
              max={max}
              step={step}
              onChange={(e) => {
                onChange(parseFloat(e.target.value) || 0);
                markChanged();
              }}
              className="w-24 px-2 py-1 border border-gray-300 rounded text-right text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {unit && (
              <Text size="sm" className="text-gray-500">{unit}</Text>
            )}
          </div>
        ) : (
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={value as boolean}
              onChange={(e) => {
                onChange(e.target.checked);
                markChanged();
              }}
              className="form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
            />
          </label>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <Text as="h1" size="4xl" weight="bold" className="text-gray-900 mb-2">
          System Settings
        </Text>
        <Text size="base" className="text-gray-600">
          Configure platform settings including fares, commissions, safety rules, and operational parameters.
        </Text>
      </div>

      {/* Status Alert */}
      {hasUnsavedChanges && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-yellow-600">⚠️</span>
              <Text size="sm" weight="medium" className="text-yellow-800">
                You have unsaved changes
              </Text>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" onClick={handleResetDefaults}>
                Reset to Defaults
              </Button>
              <Button size="sm" variant="primary" onClick={handleSaveSettings}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Controls */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
        <Text size="lg" weight="bold" className="text-red-900 mb-3">
          🚨 Emergency Controls
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            variant={operationalSettings.maintenanceMode ? "primary" : "outline"}
            onClick={() => {
              setOperationalSettings(prev => ({ ...prev, maintenanceMode: !prev.maintenanceMode }));
              markChanged();
            }}
          >
            {operationalSettings.maintenanceMode ? '✅ Maintenance Mode ON' : '⚙️ Enable Maintenance Mode'}
          </Button>
          <Button 
            variant={operationalSettings.newRegistrationsEnabled ? "outline" : "primary"}
            onClick={() => {
              setOperationalSettings(prev => ({ ...prev, newRegistrationsEnabled: !prev.newRegistrationsEnabled }));
              markChanged();
            }}
          >
            {operationalSettings.newRegistrationsEnabled ? '🚫 Disable Registrations' : '✅ Enable Registrations'}
          </Button>
          <Button variant="outline" onClick={() => console.log('Emergency shutdown initiated')}>
            🔴 Emergency Shutdown
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-2 mb-6">
        <TabButton tab="fare" label="Fare Settings" icon="💰" />
        <TabButton tab="commission" label="Commission" icon="💼" />
        <TabButton tab="safety" label="Safety Rules" icon="🛡️" />
        <TabButton tab="operational" label="Operations" icon="⚙️" />
      </div>

      {/* Settings Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Fare Settings */}
        {activeTab === 'fare' && (
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-2xl">💰</span>
              <Text size="xl" weight="bold" className="text-gray-900">
                Fare Configuration
              </Text>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SettingField
                label="Base Fare"
                value={fareSettings.baseFare}
                type="number"
                unit="USD"
                min={0}
                step={0.25}
                onChange={(value) => setFareSettings(prev => ({ ...prev, baseFare: value as number }))}
                description="Starting cost for every ride"
              />
              <SettingField
                label="Per Kilometer Rate"
                value={fareSettings.perKmRate}
                type="number"
                unit="USD/km"
                min={0}
                step={0.10}
                onChange={(value) => setFareSettings(prev => ({ ...prev, perKmRate: value as number }))}
                description="Cost per kilometer traveled"
              />
              <SettingField
                label="Per Minute Rate"
                value={fareSettings.perMinuteRate}
                type="number"
                unit="USD/min"
                min={0}
                step={0.05}
                onChange={(value) => setFareSettings(prev => ({ ...prev, perMinuteRate: value as number }))}
                description="Cost per minute of ride time"
              />
              <SettingField
                label="Minimum Fare"
                value={fareSettings.minimumFare}
                type="number"
                unit="USD"
                min={1}
                step={0.50}
                onChange={(value) => setFareSettings(prev => ({ ...prev, minimumFare: value as number }))}
                description="Lowest possible ride cost"
              />
              <SettingField
                label="Maximum Fare"
                value={fareSettings.maximumFare}
                type="number"
                unit="USD"
                min={10}
                step={10}
                onChange={(value) => setFareSettings(prev => ({ ...prev, maximumFare: value as number }))}
                description="Highest possible ride cost"
              />
              <SettingField
                label="Peak Hour Multiplier"
                value={fareSettings.peakHourMultiplier}
                type="number"
                unit="x"
                min={1}
                max={3}
                step={0.1}
                onChange={(value) => setFareSettings(prev => ({ ...prev, peakHourMultiplier: value as number }))}
                description="Rush hour fare multiplier"
              />
              <SettingField
                label="Surge Multiplier"
                value={fareSettings.surgeMultiplier}
                type="number"
                unit="x"
                min={1}
                max={5}
                step={0.1}
                onChange={(value) => setFareSettings(prev => ({ ...prev, surgeMultiplier: value as number }))}
                description="High demand fare multiplier"
              />
              <SettingField
                label="Cancellation Fee"
                value={fareSettings.cancellationFee}
                type="number"
                unit="USD"
                min={0}
                step={0.50}
                onChange={(value) => setFareSettings(prev => ({ ...prev, cancellationFee: value as number }))}
                description="Fee for cancelled rides"
              />
            </div>
          </div>
        )}

        {/* Commission Settings */}
        {activeTab === 'commission' && (
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-2xl">💼</span>
              <Text size="xl" weight="bold" className="text-gray-900">
                Commission & Incentives
              </Text>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SettingField
                label="Driver Commission"
                value={commissionSettings.driverCommission}
                type="number"
                unit="%"
                min={50}
                max={95}
                step={1}
                onChange={(value) => setCommissionSettings(prev => ({ ...prev, driverCommission: value as number }))}
                description="Percentage drivers keep from fares"
              />
              <SettingField
                label="Platform Commission"
                value={commissionSettings.platformCommission}
                type="number"
                unit="%"
                min={5}
                max={50}
                step={1}
                onChange={(value) => setCommissionSettings(prev => ({ ...prev, platformCommission: value as number }))}
                description="Platform's share of ride fares"
              />
              <SettingField
                label="Payment Processing Fee"
                value={commissionSettings.paymentProcessingFee}
                type="number"
                unit="%"
                min={1}
                max={5}
                step={0.1}
                onChange={(value) => setCommissionSettings(prev => ({ ...prev, paymentProcessingFee: value as number }))}
                description="Payment gateway fees"
              />
              <SettingField
                label="Referral Bonus"
                value={commissionSettings.referralBonus}
                type="number"
                unit="USD"
                min={0}
                step={5}
                onChange={(value) => setCommissionSettings(prev => ({ ...prev, referralBonus: value as number }))}
                description="Bonus for successful referrals"
              />
              <SettingField
                label="Driver Signup Bonus"
                value={commissionSettings.driverSignupBonus}
                type="number"
                unit="USD"
                min={0}
                step={10}
                onChange={(value) => setCommissionSettings(prev => ({ ...prev, driverSignupBonus: value as number }))}
                description="Welcome bonus for new drivers"
              />
              <SettingField
                label="User Signup Bonus"
                value={commissionSettings.userSignupBonus}
                type="number"
                unit="USD"
                min={0}
                step={5}
                onChange={(value) => setCommissionSettings(prev => ({ ...prev, userSignupBonus: value as number }))}
                description="Welcome bonus for new users"
              />
            </div>
          </div>
        )}

        {/* Safety Settings */}
        {activeTab === 'safety' && (
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-2xl">🛡️</span>
              <Text size="xl" weight="bold" className="text-gray-900">
                Safety & Compliance Rules
              </Text>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SettingField
                label="Maximum Ride Distance"
                value={safetySettings.maxRideDistance}
                type="number"
                unit="km"
                min={50}
                max={1000}
                step={50}
                onChange={(value) => setSafetySettings(prev => ({ ...prev, maxRideDistance: value as number }))}
                description="Longest allowed single ride"
              />
              <SettingField
                label="Maximum Ride Duration"
                value={safetySettings.maxRideDuration}
                type="number"
                unit="minutes"
                min={60}
                max={720}
                step={30}
                onChange={(value) => setSafetySettings(prev => ({ ...prev, maxRideDuration: value as number }))}
                description="Longest allowed ride time"
              />
              <SettingField
                label="Background Check Interval"
                value={safetySettings.driverBackgroundCheckInterval}
                type="number"
                unit="days"
                min={90}
                max={730}
                step={30}
                onChange={(value) => setSafetySettings(prev => ({ ...prev, driverBackgroundCheckInterval: value as number }))}
                description="How often to re-verify drivers"
              />
              <SettingField
                label="Vehicle Inspection Interval"
                value={safetySettings.vehicleInspectionInterval}
                type="number"
                unit="days"
                min={30}
                max={365}
                step={30}
                onChange={(value) => setSafetySettings(prev => ({ ...prev, vehicleInspectionInterval: value as number }))}
                description="Required vehicle inspection frequency"
              />
              <SettingField
                label="Emergency Response Time"
                value={safetySettings.emergencyResponseTime}
                type="number"
                unit="minutes"
                min={1}
                max={15}
                step={1}
                onChange={(value) => setSafetySettings(prev => ({ ...prev, emergencyResponseTime: value as number }))}
                description="Target SOS response time"
              />
              <SettingField
                label="SOS Alert Timeout"
                value={safetySettings.sosAlertTimeout}
                type="number"
                unit="seconds"
                min={10}
                max={120}
                step={10}
                onChange={(value) => setSafetySettings(prev => ({ ...prev, sosAlertTimeout: value as number }))}
                description="Time before auto-triggering SOS"
              />
              <SettingField
                label="Speed Limit Alert"
                value={safetySettings.speedLimitAlert}
                type="number"
                unit="km/h"
                min={80}
                max={200}
                step={10}
                onChange={(value) => setSafetySettings(prev => ({ ...prev, speedLimitAlert: value as number }))}
                description="Speed that triggers warnings"
              />
              <SettingField
                label="Night Ride Restrictions"
                value={safetySettings.nightRideRestrictions}
                type="boolean"
                onChange={(value) => setSafetySettings(prev => ({ ...prev, nightRideRestrictions: value as boolean }))}
                description="Enable special rules for 10PM-6AM rides"
              />
            </div>
          </div>
        )}

        {/* Operational Settings */}
        {activeTab === 'operational' && (
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-2xl">⚙️</span>
              <Text size="xl" weight="bold" className="text-gray-900">
                Operational Parameters
              </Text>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SettingField
                label="Driver Online Radius"
                value={operationalSettings.driverOnlineRadius}
                type="number"
                unit="km"
                min={10}
                max={100}
                step={5}
                onChange={(value) => setOperationalSettings(prev => ({ ...prev, driverOnlineRadius: value as number }))}
                description="Area where drivers can go online"
              />
              <SettingField
                label="Ride Matching Radius"
                value={operationalSettings.rideMatchingRadius}
                type="number"
                unit="km"
                min={5}
                max={50}
                step={5}
                onChange={(value) => setOperationalSettings(prev => ({ ...prev, rideMatchingRadius: value as number }))}
                description="Distance for finding nearby drivers"
              />
              <SettingField
                label="Wait Time Before Cancel"
                value={operationalSettings.waitTimeBeforeCancel}
                type="number"
                unit="seconds"
                min={60}
                max={600}
                step={30}
                onChange={(value) => setOperationalSettings(prev => ({ ...prev, waitTimeBeforeCancel: value as number }))}
                description="Auto-cancel if no driver accepts"
              />
              <SettingField
                label="Driver Rating Threshold"
                value={operationalSettings.driverRatingThreshold}
                type="number"
                unit="⭐"
                min={3.0}
                max={5.0}
                step={0.1}
                onChange={(value) => setOperationalSettings(prev => ({ ...prev, driverRatingThreshold: value as number }))}
                description="Minimum rating to remain active"
              />
              <SettingField
                label="User Rating Threshold"
                value={operationalSettings.userRatingThreshold}
                type="number"
                unit="⭐"
                min={2.0}
                max={5.0}
                step={0.1}
                onChange={(value) => setOperationalSettings(prev => ({ ...prev, userRatingThreshold: value as number }))}
                description="Minimum user rating allowed"
              />
              <SettingField
                label="Max Concurrent Rides"
                value={operationalSettings.maxConcurrentRides}
                type="number"
                unit="rides"
                min={1}
                max={3}
                step={1}
                onChange={(value) => setOperationalSettings(prev => ({ ...prev, maxConcurrentRides: value as number }))}
                description="Maximum simultaneous rides per driver"
              />
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-8">
        <Button variant="outline" onClick={handleResetDefaults}>
          🔄 Reset to Defaults
        </Button>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => console.log('Export settings')}>
            📥 Export Settings
          </Button>
          <Button variant="outline" onClick={() => console.log('Import settings')}>
            📤 Import Settings
          </Button>
          <Button 
            variant="primary" 
            onClick={handleSaveSettings}
            disabled={!hasUnsavedChanges}
          >
            💾 Save All Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;