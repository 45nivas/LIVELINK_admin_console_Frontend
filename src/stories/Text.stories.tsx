import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '../components/atoms';

const meta: Meta<typeof Text> = {
  title: 'Atoms/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: { type: 'select' },
      options: ['p', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'],
    },
    weight: {
      control: { type: 'select' },
      options: ['light', 'normal', 'medium', 'semibold', 'bold'],
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is default text',
  },
};

export const Heading1: Story = {
  args: {
    as: 'h1',
    size: '4xl',
    weight: 'bold',
    children: 'Heading 1',
  },
};

export const Heading2: Story = {
  args: {
    as: 'h2',
    size: '3xl',
    weight: 'bold',
    children: 'Heading 2',
  },
};

export const Heading3: Story = {
  args: {
    as: 'h3',
    size: '2xl',
    weight: 'semibold',
    children: 'Heading 3',
  },
};

export const Primary: Story = {
  args: {
    color: 'primary',
    children: 'Primary colored text',
  },
};

export const Success: Story = {
  args: {
    color: 'success',
    children: 'Success colored text',
  },
};

export const Warning: Story = {
  args: {
    color: 'warning',
    children: 'Warning colored text',
  },
};

export const Danger: Story = {
  args: {
    color: 'danger',
    children: 'Danger colored text',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-2">
      <Text size="xs">Extra small text (xs)</Text>
      <Text size="sm">Small text (sm)</Text>
      <Text size="base">Base text (base)</Text>
      <Text size="lg">Large text (lg)</Text>
      <Text size="xl">Extra large text (xl)</Text>
      <Text size="2xl">2XL text (2xl)</Text>
      <Text size="3xl">3XL text (3xl)</Text>
    </div>
  ),
};

export const AllWeights: Story = {
  render: () => (
    <div className="space-y-2">
      <Text weight="light">Light weight text</Text>
      <Text weight="normal">Normal weight text</Text>
      <Text weight="medium">Medium weight text</Text>
      <Text weight="semibold">Semibold weight text</Text>
      <Text weight="bold">Bold weight text</Text>
    </div>
  ),
};

export const AllColors: Story = {
  render: () => (
    <div className="space-y-2">
      <Text color="primary">Primary color</Text>
      <Text color="secondary">Secondary color</Text>
      <Text color="success">Success color</Text>
      <Text color="warning">Warning color</Text>
      <Text color="danger">Danger color</Text>
      <Text color="info">Info color</Text>
    </div>
  ),
};
