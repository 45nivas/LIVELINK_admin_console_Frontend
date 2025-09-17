import type { Meta, StoryObj } from '@storybook/react';
import CustomerSupport from './CustomerSupport';

const meta: Meta<typeof CustomerSupport> = {
  title: 'Pages/CustomerSupport',
  component: CustomerSupport,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof CustomerSupport>;

export const Default: Story = {};

export const WithDescription: Story = {
  parameters: {
    docs: {
      description: {
        story: `
### Customer Support Module

The Customer Support page manages support tickets from users and drivers. Features include:

**Key Features:**
- Support ticket management with status tracking
- Priority-based ticket handling (urgent, high, medium, low)
- Category filtering (payment, driver, user, technical, safety, other)
- Assignment system for support staff
- Resolution workflow with detailed responses
- Escalation capabilities for complex issues

**Ticket Lifecycle:**
1. **Open** → New tickets awaiting assignment
2. **In Progress** → Assigned tickets being worked on
3. **Resolved** → Completed tickets with solutions
4. **Closed** → Archived resolved tickets

**Admin Actions:**
- Assign tickets to support staff
- Resolve tickets with detailed explanations
- Escalate tickets to higher priority
- View complete ticket conversation history
- Filter and search through all tickets

This module is essential for maintaining customer satisfaction and resolving platform issues efficiently.
        `,
      },
    },
  },
};