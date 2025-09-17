# LIVELINK Admin Console (Frontend)

A web-based admin dashboard for the LIVELINK ridesharing platform. Enables administrators to manage drivers, users, rides, safety, support, and system settings.

---

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript  
- **Styling**: Tailwind CSS  
- **Component Library & Docs**: Storybook  
- **Build Tool**: Vite  
- **Architecture**: Atomic Design

---

## ⚙️ Admin Modules (MVP Complete)

| Module | What it does |
|--------|---------------|
| Dashboard | Overview of rides, earnings, active users/drivers, metrics |
| Driver Management | Driver applications, document verification, status control |
| User Management | User/KYC verification, blocking/suspending, account control |
| Ride Management | Tracking rides, handling disputes & cancellations |
| Verification Queue | Workflow for approving/rejecting documents |
| Emergency & Safety | SOS alerts, incident reports, safety protocols |
| Customer Support | Ticket system, complaints & resolutions |
| System Settings | Manage fares, commissions, safety rules, platform config |

---

## 📥 Getting Started

### Prerequisites
- Node.js version >= 18  
- npm (or yarn)

### Installation
```bash
git clone https://github.com/45nivas/LIVELINK_admin_console_Frontend.git
cd LIVELINK_admin_console_Frontend
npm install
```

### Running
```bash
# Start development server
npm run dev

# Start component documentation
npm run storybook
```

**Open in browser:**
- **Main App**: http://localhost:5173
- **Storybook**: http://localhost:6006

---

## 🗂 Project Structure

```
src/  
├── components/
│   ├── atoms/               # Basic UI components
│   │   ├── Button/         # Button variants (primary, secondary, outline, danger)
│   │   ├── Text/           # Typography with LIVELINK branding
│   │   ├── Logo/           # LIVELINK brand logo
│   │   ├── Icon/           # Icon system
│   │   └── Modal/          # Modal dialogs
│   ├── pages/              # Complete admin modules
│   │   ├── dashboard/      # 🏠 Dashboard - metrics & overview
│   │   ├── drivers/        # 🚗 Driver Management - applications & approvals
│   │   ├── users/          # 👥 User Management - KYC & account control
│   │   ├── rides/          # 🚕 Ride Management - tracking & disputes
│   │   ├── verification/   # ✅ Document verification workflow
│   │   ├── emergency/      # 🚨 Emergency & Safety - SOS & incidents
│   │   ├── support/        # 💬 Customer Support - tickets & complaints
│   │   └── settings/       # ⚙️ System Settings - platform config
│   └── AdminApp.tsx        # Main admin app with navigation
├── data/
│   └── mockData.ts         # Sample data (50+ drivers, 100+ users, 200+ rides)
├── types/
│   ├── index.ts            # General TypeScript types
│   └── rideshare.ts        # Admin-specific interfaces
└── App.tsx                 # Application entry point
```

---

## 🎨 Design System

**LIVELINK Brand Colors:**
- Primary: `#007ABF` (LIVELINK Blue)
- Success: `#10b981` | Warning: `#f59e0b` | Danger: `#ef4444`

**Key Components:**
- Responsive design with mobile support
- Professional admin interface
- Complete Storybook documentation
- Atomic design architecture

---

## 🛠 Development Commands

```bash
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview production build
npm run storybook    # Component documentation
npm run lint         # Code linting
```

**Adding New Features:**
1. Create components in `atoms/` or `pages/` folders
2. Add TypeScript types in `types/rideshare.ts`
3. Update mock data if needed
4. Add Storybook stories
5. Follow existing patterns

---

## 📊 Mock Data Included

- **50+ Drivers** - Various statuses, documents, ratings
- **100+ Users** - Different verification levels, trip history  
- **200+ Rides** - Complete trip data, payments, disputes
- **Support Tickets** - All priority levels and categories
- **Emergency Alerts** - SOS responses, incidents
- **Documents** - License, insurance, vehicle registration

---

## 🔧 Contributing

1. **Fork** the project
2. **Create feature branch**: `git checkout -b feature/<your-feature>`
3. **Follow existing patterns** & naming conventions
4. **Add Storybook stories** if applicable
5. **Commit with clear message**: `feat:`, `fix:`, `docs:`, etc.
6. **Push and submit** Pull Request

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/45nivas/LIVELINK_admin_console_Frontend/issues)
- **Component Docs**: Run `npm run storybook`

---

✅ **Status: MVP Complete** - All 8 admin modules ready for production

🚗 **Built for LIVELINK Ridesharing Platform**
