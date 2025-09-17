import type { Meta, StoryObj } from '@storybook/react';
import { AdminApp } from './AdminApp';

const meta: Meta<typeof AdminApp> = {
  title: 'Apps/AdminApp',
  component: AdminApp,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete admin application with navigation between dashboard and driver management modules.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AdminApp>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The complete admin app with navigation between different modules.',
      },
    },
  },
};