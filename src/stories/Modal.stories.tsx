import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal, Button } from '../components/atoms';

const meta: Meta<typeof Modal> = {
  title: 'Atoms/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: { type: 'boolean' },
    },
    showCloseButton: {
      control: { type: 'boolean' },
    },
    closeOnBackdropClick: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: 'Modal Title',
    children: <p>This is a basic modal content.</p>,
    onClose: () => {},
  },
};

export const WithoutCloseButton: Story = {
  args: {
    isOpen: true,
    title: 'Modal Without Close Button',
    showCloseButton: false,
    children: <p>This modal doesn't have a close button in the header.</p>,
    onClose: () => {},
  },
};

export const NoBackdropClose: Story = {
  args: {
    isOpen: true,
    title: 'No Backdrop Close',
    closeOnBackdropClick: false,
    children: <p>This modal won't close when clicking the backdrop.</p>,
    onClose: () => {},
  },
};

export const LongContent: Story = {
  args: {
    isOpen: true,
    title: 'Modal with Long Content',
    children: (
      <div>
        <p>This modal has a lot of content to demonstrate scrolling behavior.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
        <p>Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt.</p>
        <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
        <p>Sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
        <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>
      </div>
    ),
    onClose: () => {},
  },
};

export const ConfirmationModal: Story = {
  args: {
    isOpen: true,
    title: 'Confirm Action',
    children: (
      <div>
        <p className="mb-4">Are you sure you want to delete this item? This action cannot be undone.</p>
        <div className="flex justify-end space-x-3">
          <Button variant="secondary" size="sm">Cancel</Button>
          <Button variant="danger" size="sm">Delete</Button>
        </div>
      </div>
    ),
    onClose: () => {},
  },
};

export const Interactive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Interactive Modal"
        >
          <div>
            <p className="mb-4">This is an interactive modal that you can open and close.</p>
            <Button onClick={() => setIsOpen(false)}>Close Modal</Button>
          </div>
        </Modal>
      </div>
    );
  },
};
