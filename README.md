# LIVELINK Admin Console Frontend

A modern React 18 application built with TypeScript, Tailwind CSS, and Storybook, following Atomic Design methodology for scalable component architecture.

## 🚀 Features

- **React 18** with TypeScript for type-safe development
- **Tailwind CSS** for utility-first styling with custom brand colors
- **Storybook** for component development and documentation
- **Atomic Design** methodology for organized component structure
- **Vite** for fast development and optimized builds
- **ESLint & Prettier** for code quality and consistency

## 🏗️ Project Structure

```
src/
├── components/
│   ├── atoms/          # Basic building blocks
│   │   ├── Button/     # Button component with variants
│   │   ├── Text/       # Typography component
│   │   ├── Icon/       # Icon component (placeholder)
│   │   ├── Logo/       # LIVELINK logo component
│   │   └── Modal/      # Modal component
│   ├── molecules/      # Combinations of atoms
│   ├── organisms/      # Complex UI components
│   ├── templates/      # Page layouts
│   └── pages/          # Full page components
├── constants/          # App constants
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── assets/             # Static assets (images, icons)
├── stories/            # Storybook stories
├── App.tsx
└── index.tsx
```

## 🎨 Design System

### Brand Colors

```css
Primary: #007ABF (LIVELINK Blue)
- 50: #e6f4fc   100: #cce9f9   200: #99d3f3
- 300: #66bdec  400: #33a7e6   500: #007ABF (main)
- 600: #006ba8  700: #005c91   800: #004d7a
- 900: #003e63

Secondary: Neutral Grays
- 50: #f9fafb   100: #f3f4f6   200: #e5e7eb
- 300: #d1d5db  400: #9ca3af   500: #6b7280
- 600: #4b5563  700: #374151   800: #1f2937
- 900: #111827
```

### Typography Scale

- **Headings**: h1–h6 with responsive scaling
- **Body text**: xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl
- **Font weights**: light (300), normal (400), medium (500), semibold (600), bold (700)

### Component Variants

#### Buttons
- **Primary**: Brand blue background
- **Secondary**: White with gray border
- **Outline**: Transparent with blue border
- **Ghost**: Transparent with hover effect
- **Danger**: Red for destructive actions

#### Badges
- **Success**: Green for positive states
- **Warning**: Yellow for caution
- **Danger**: Red for errors
- **Info**: Blue for information
- **Neutral**: Gray for general use

#### Modals
- **Confirmation**: For user confirmations
- **Alert**: For important notifications
- **Delete**: For destructive actions

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/45nivas/LIVELINK_admin_console_Frontend.git
cd LIVELINK_admin_console_Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run Storybook
npm run storybook

# Build Storybook
npm run build-storybook

# Lint code
npm run lint
```

## 📚 Storybook Usage

Storybook provides an isolated environment for developing and testing UI components.

### Running Storybook

```bash
npm run storybook
```

This will start Storybook at `http://localhost:6006`

### Component Stories

Each atomic component has comprehensive stories showing:
- All variants and states
- Different sizes and props
- Interactive examples
- Usage guidelines

### Available Stories

- **Logo**: All sizes (sm, md, lg) with brand colors
- **Button**: All variants, sizes, loading and disabled states
- **Text**: Typography scale, weights, and colors
- **Icon**: Placeholder icons with different sizes
- **Modal**: Basic modal with various configurations

## 🧩 Component Usage

### Button Component

```tsx
import { Button } from './components/atoms';

// Primary button
<Button variant="primary" size="md" onClick={handleClick}>
  Click me
</Button>

// Loading state
<Button variant="primary" loading>
  Processing...
</Button>
```

### Text Component

```tsx
import { Text } from './components/atoms';

// Heading
<Text as="h1" size="4xl" weight="bold">
  Page Title
</Text>

// Body text
<Text size="base" color="secondary">
  This is body text
</Text>
```

### Logo Component

```tsx
import { Logo } from './components/atoms';

// Default logo
<Logo size="md" />

// Large logo for headers
<Logo size="lg" className="mb-4" />
```

### Modal Component

```tsx
import { Modal, Button } from './components/atoms';

const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirmation"
>
  <p>Are you sure you want to proceed?</p>
  <div className="flex justify-end space-x-3 mt-4">
    <Button variant="secondary" onClick={() => setIsOpen(false)}>
      Cancel
    </Button>
    <Button variant="primary">
      Confirm
    </Button>
  </div>
</Modal>
```

## 🎯 Development Guidelines

### Component Creation

1. **Follow Atomic Design**: Place components in appropriate directories (atoms, molecules, organisms, templates, pages)
2. **Use TypeScript**: Define interfaces for all component props
3. **Create Stories**: Add Storybook stories for all new components
4. **Follow Naming**: Use PascalCase for components and descriptive names

### Styling Guidelines

1. **Use Tailwind**: Prefer Tailwind utilities over custom CSS
2. **Custom Classes**: Use `@layer components` for reusable component styles
3. **Responsive Design**: Always consider mobile-first approach
4. **Brand Colors**: Use defined color palette consistently

### Code Quality

1. **TypeScript**: Use strict typing, avoid `any`
2. **ESLint**: Fix all linting errors before committing
3. **Component Props**: Always define prop interfaces
4. **Accessibility**: Follow WCAG guidelines for accessible components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-component`
3. Follow the development guidelines above
4. Add/update tests and stories
5. Commit your changes: `git commit -m 'Add new component'`
6. Push to the branch: `git push origin feature/new-component`
7. Submit a pull request

### Commit Convention

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation updates
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test updates
- `chore:` Build process or auxiliary tool changes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Repository](https://github.com/45nivas/LIVELINK_admin_console_Frontend)
- [Storybook Documentation](http://localhost:6006) (when running locally)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

---

Built with ❤️ by the LIVELINK team
