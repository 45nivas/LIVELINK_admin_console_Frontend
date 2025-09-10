import { useState } from 'react'
import { Logo, Button, Text, Icon, Modal } from './components/atoms'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <Logo size="lg" className="mx-auto mb-4" />
          <Text as="h1" size="4xl" weight="bold" color="primary">
            LIVELINK Admin Console
          </Text>
          <Text size="lg" color="secondary" className="mt-2">
            Built with React 18, TypeScript, Tailwind CSS & Storybook
          </Text>
        </header>

        {/* Component Showcase */}
        <div className="space-y-12">
          {/* Buttons Section */}
          <section className="bg-white rounded-lg p-6 shadow-sm">
            <Text as="h2" size="2xl" weight="semibold" className="mb-6">
              Button Components
            </Text>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="primary" loading>Loading...</Button>
              <Button variant="secondary" disabled>Disabled</Button>
            </div>
          </section>

          {/* Typography Section */}
          <section className="bg-white rounded-lg p-6 shadow-sm">
            <Text as="h2" size="2xl" weight="semibold" className="mb-6">
              Typography System
            </Text>
            <div className="space-y-4">
              <Text as="h1" size="4xl" weight="bold">Heading 1 - 4XL Bold</Text>
              <Text as="h2" size="3xl" weight="bold">Heading 2 - 3XL Bold</Text>
              <Text as="h3" size="2xl" weight="semibold">Heading 3 - 2XL Semibold</Text>
              <Text as="h4" size="xl" weight="semibold">Heading 4 - XL Semibold</Text>
              <Text size="base" color="secondary">
                Body text - Base size with secondary color for readable content
              </Text>
              <Text size="sm" color="secondary">
                Small text - SM size for captions and descriptions
              </Text>
            </div>
          </section>

          {/* Icons Section */}
          <section className="bg-white rounded-lg p-6 shadow-sm">
            <Text as="h2" size="2xl" weight="semibold" className="mb-6">
              Icon Components
            </Text>
            <div className="flex flex-wrap gap-6">
              <div className="text-center">
                <Icon name="home" size={32} color="#007ABF" />
                <Text size="sm" className="mt-2">Home</Text>
              </div>
              <div className="text-center">
                <Icon name="user" size={32} color="#007ABF" />
                <Text size="sm" className="mt-2">User</Text>
              </div>
              <div className="text-center">
                <Icon name="settings" size={32} color="#007ABF" />
                <Text size="sm" className="mt-2">Settings</Text>
              </div>
              <div className="text-center">
                <Icon name="check" size={32} color="#10B981" />
                <Text size="sm" className="mt-2">Check</Text>
              </div>
              <div className="text-center">
                <Icon name="close" size={32} color="#EF4444" />
                <Text size="sm" className="mt-2">Close</Text>
              </div>
            </div>
          </section>

          {/* Modal Section */}
          <section className="bg-white rounded-lg p-6 shadow-sm">
            <Text as="h2" size="2xl" weight="semibold" className="mb-6">
              Modal Component
            </Text>
            <Button onClick={() => setIsModalOpen(true)}>
              Open Modal Demo
            </Button>
            
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Demo Modal"
            >
              <div className="space-y-4">
                <Text>
                  This is a demonstration of the modal component with custom styling 
                  and brand colors.
                </Text>
                <div className="flex justify-end space-x-3">
                  <Button 
                    variant="secondary" 
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="primary"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Confirm
                  </Button>
                </div>
              </div>
            </Modal>
          </section>

          {/* Storybook Info */}
          <section className="bg-primary-50 rounded-lg p-6">
            <Text as="h2" size="2xl" weight="semibold" className="mb-4">
              📚 Explore Components in Storybook
            </Text>
            <Text size="base" className="mb-4">
              All components are documented with interactive examples in Storybook.
              Run the following command to explore:
            </Text>
            <div className="bg-gray-900 rounded p-3 mb-4">
              <span className="text-green-400 font-mono text-sm">
                npm run storybook
              </span>
            </div>
            <Text size="sm" color="secondary">
              Storybook will be available at http://localhost:6006
            </Text>
          </section>
        </div>
      </div>
    </div>
  )
}

export default App
