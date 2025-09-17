import type { Meta, StoryObj } from '@storybook/react';
import { DriverManagement } from './DriverManagement';

const meta: Meta<typeof DriverManagement> = {
  title: 'Pages/DriverManagement',
  component: DriverManagement,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Driver management page for reviewing applications, approving/rejecting drivers, and managing driver accounts.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DriverManagement>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The main driver management view with list of drivers, filters, and action buttons.',
      },
    },
  },
};