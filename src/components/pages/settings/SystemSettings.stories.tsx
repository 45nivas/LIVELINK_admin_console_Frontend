import type { Meta, StoryObj } from '@storybook/react';
import SystemSettings from './SystemSettings';

const meta: Meta<typeof SystemSettings> = {
  title: 'Pages/SystemSettings',
  component: SystemSettings,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof SystemSettings>;

export const Default: Story = {};

export const WithDescription: Story = {
  parameters: {
    docs: {
      description: {
        story: `
### System Settings Module

The System Settings page allows platform administrators to configure core operational parameters. Features include:

**Configuration Sections:**

**💰 Fare Settings:**
- Base fare and per-km/minute rates
- Minimum and maximum fare limits
- Peak hour and surge multipliers
- Cancellation fee configuration

**💼 Commission & Incentives:**
- Driver and platform commission percentages
- Payment processing fees
- Referral and signup bonuses
- Revenue sharing configuration

**🛡️ Safety & Compliance:**
- Maximum ride distance and duration limits
- Background check and vehicle inspection intervals
- Emergency response time targets
- Speed limits and night ride restrictions

**⚙️ Operational Parameters:**
- Driver online and ride matching radius
- Rating thresholds for drivers and users
- Wait times and concurrent ride limits
- System maintenance controls

**Emergency Controls:**
- Maintenance mode toggle
- New registration controls
- Emergency shutdown capabilities

**Key Features:**
- Real-time setting updates with change tracking
- Default value restoration
- Settings import/export functionality
- Comprehensive validation and safety checks

This module provides the administrative backbone for platform operations and business rules.
        `,
      },
    },
  },
};