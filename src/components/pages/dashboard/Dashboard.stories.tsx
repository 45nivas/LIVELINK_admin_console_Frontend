import type { Meta, StoryObj } from '@storybook/react';
import { Dashboard } from './Dashboard';

const meta: Meta<typeof Dashboard> = {
  title: 'Pages/Dashboard',
  component: Dashboard,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Main admin dashboard for the ridesharing platform showing key metrics, quick actions, and recent activity.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Dashboard>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The main dashboard view with all metrics and quick actions.',
      },
    },
  },
};