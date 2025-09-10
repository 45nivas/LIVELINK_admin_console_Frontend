import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../components/atoms';

const meta: Meta<typeof Icon> = {
  title: 'Atoms/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: { type: 'select' },
      options: ['home', 'user', 'settings', 'close', 'check', 'arrow'],
    },
    size: {
      control: { type: 'number' },
    },
    color: {
      control: { type: 'color' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'home',
  },
};

export const Home: Story = {
  args: {
    name: 'home',
    size: 24,
  },
};

export const User: Story = {
  args: {
    name: 'user',
    size: 24,
  },
};

export const Settings: Story = {
  args: {
    name: 'settings',
    size: 24,
  },
};

export const Check: Story = {
  args: {
    name: 'check',
    size: 24,
    color: '#10B981',
  },
};

export const Close: Story = {
  args: {
    name: 'close',
    size: 24,
    color: '#EF4444',
  },
};

export const Large: Story = {
  args: {
    name: 'home',
    size: 48,
    color: '#007ABF',
  },
};

export const Small: Story = {
  args: {
    name: 'home',
    size: 16,
  },
};

export const AllIcons: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 p-4">
      <div className="text-center">
        <Icon name="home" size={32} />
        <p className="text-sm mt-2">Home</p>
      </div>
      <div className="text-center">
        <Icon name="user" size={32} />
        <p className="text-sm mt-2">User</p>
      </div>
      <div className="text-center">
        <Icon name="settings" size={32} />
        <p className="text-sm mt-2">Settings</p>
      </div>
      <div className="text-center">
        <Icon name="close" size={32} />
        <p className="text-sm mt-2">Close</p>
      </div>
      <div className="text-center">
        <Icon name="check" size={32} />
        <p className="text-sm mt-2">Check</p>
      </div>
      <div className="text-center">
        <Icon name="arrow" size={32} />
        <p className="text-sm mt-2">Arrow</p>
      </div>
    </div>
  ),
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="text-center">
        <Icon name="home" size={16} />
        <p className="text-xs mt-1">16px</p>
      </div>
      <div className="text-center">
        <Icon name="home" size={24} />
        <p className="text-xs mt-1">24px</p>
      </div>
      <div className="text-center">
        <Icon name="home" size={32} />
        <p className="text-xs mt-1">32px</p>
      </div>
      <div className="text-center">
        <Icon name="home" size={48} />
        <p className="text-xs mt-1">48px</p>
      </div>
    </div>
  ),
};
