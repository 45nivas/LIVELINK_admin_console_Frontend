import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from '../components/atoms';

const meta: Meta<typeof Logo> = {
  title: 'Atoms/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const WithCustomClass: Story = {
  args: {
    size: 'md',
    className: 'border-2 border-primary-500 rounded-lg p-2',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <div className="text-center">
        <Logo size="sm" />
        <p className="text-sm mt-2">Small</p>
      </div>
      <div className="text-center">
        <Logo size="md" />
        <p className="text-sm mt-2">Medium</p>
      </div>
      <div className="text-center">
        <Logo size="lg" />
        <p className="text-sm mt-2">Large</p>
      </div>
    </div>
  ),
};
