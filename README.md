# FRED - AI-Native HVAC Operating System

A complete React Native (Expo) mobile application for technician-facing HVAC operations, built for 5 Star Partners.

## Overview

FRED is an AI-native platform designed to streamline HVAC service operations, from lead management to field service execution to payment collection. This app provides technicians with a complete workflow system including job scheduling, equipment inspection, proposal generation, and payment processing.

## Tech Stack

- **React Native** with Expo SDK 52+
- **TypeScript** with strict mode
- **Expo Router** for navigation
- **AsyncStorage** for local state management
- **expo-camera** for equipment photography
- **expo-location** for GPS check-in
- **NativeWind** for styling
- Mock providers for all external APIs (Square, Plaid, OpenAI, SMS)

## Features

### 1. Authentication & Role-Based Access
- 5 user roles: Owner, Admin, Dispatcher, Technician, CSR
- Mock authentication with demo accounts
- Role-based navigation and feature access

### 2. CRM & Lead Management
- Lead list with search, filter, and sort
- Lead status workflow: New → Contacted → Qualified → Booked → Lost
- Next Best Action AI recommendations
- Quick actions: Call, Text, Email, Book
- Lead history and notes

### 3. Scheduling & Dispatch
- Day/week view of scheduled jobs
- Job assignment and status tracking
- Customer notifications (mock)
- Technician dispatch workflow

### 4. Technician Mobile Workflow (Core Feature)
Complete job execution flow:

1. **Arrival & Check-in** - GPS location, arrival photo
2. **Booties Photo** - Mandatory compliance documentation
3. **Issue Intake** - Customer problem description + voice notes
4. **32-Point Inspection** - Comprehensive HVAC system checklist with:
   - 10 categories (Thermostat, Air Filter, Electrical, etc.)
   - Pass/Fail/N/A status for each item
   - Photo documentation per item
   - Required vs. optional items

5. **Photo Documentation** - Guided photo capture prompts
6. **AI Findings Summary** - Mock AI analysis of checklist + photos
7. **Good/Better/Best Proposals** - 3 auto-generated service options with:
   - Scope of work
   - Pricing and labor hours
   - Benefits and warranty
   - Urgency level

8. **Sales Coaching** - AI-powered guidance:
   - "How do I explain this to the customer?"
   - Objection handling scripts
   - Closing techniques

9. **Customer Signature** - Digital approval for work authorization
10. **Invoice Generation** - Auto-generated from approved work
11. **Payment Collection** - Mock Square integration:
    - Credit/Debit cards
    - Cash
    - Check
    - Payment plans

12. **Job Completion** - Review request, follow-up scheduling

### 5. Price Book
- 50+ pre-configured HVAC services and parts
- Searchable by category: Diagnostics, Repairs, Maintenance, IAQ, Installations
- Labor hours and part numbers
- Easy reference during job quoting

### 6. Owner/Admin Dashboard
- Today's revenue and job metrics
- Pipeline overview (leads by stage)
- Technician performance metrics
- Financial snapshot

### 7. Invoicing & Payments
- Invoice generation with line items
- Status tracking: Draft, Sent, Paid, Overdue
- Mock SMS/Email sending
- Tax calculation

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation

1. Navigate to the project directory:
```bash
cd /sessions/amazing-lucid-brown/fred-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npx expo start --web
```

4. Open the app:
   - Press `w` for web (Expo web)
   - Scan QR code with Expo Go app for iOS/Android testing
   - Run `npm run ios` or `npm run android` for native builds

### Demo Accounts

The app uses mock authentication. Try these accounts (password: `password`):

- **Owner**: owner@5starpartners.com
- **Admin**: admin@5starpartners.com
- **Dispatcher**: dispatcher@5starpartners.com
- **Technician**: tech@5starpartners.com (Marcus Johnson)
- **CSR**: csr@5starpartners.com

## File Structure

```
fred-app/
├── app/                    # Expo Router pages
│   ├── (auth)/            # Authentication screens
│   ├── (tabs)/            # Main tab navigation
│   ├── job/               # Job workflow screens
│   ├── lead/              # Lead detail screens
│   ├── pricebook.tsx
│   ├── invoices.tsx
│   ├── performance.tsx
│   └── settings.tsx
├── components/            # Reusable UI components
│   ├── ui/               # Basic components (Button, Card, etc.)
│   ├── JobCard.tsx
│   ├── LeadCard.tsx
│   ├── ChecklistItem.tsx
│   └── StatCard.tsx
├── providers/             # Mock external service providers
│   ├── MockAiProvider.ts
│   ├── MockPaymentProvider.ts
│   └── MockNotificationProvider.ts
├── store/                 # State management (AsyncStorage)
│   ├── authStore.ts
│   ├── jobStore.ts
│   ├── leadStore.ts
│   └── invoiceStore.ts
├── data/                  # Seed/mock data
│   ├── leads.ts          # 20+ leads with various statuses
│   ├── jobs.ts           # 10+ jobs
│   ├── technicians.ts    # 5 technicians
│   ├── customers.ts      # 5 customers with equipment
│   ├── checklist.ts      # 32-point inspection template
│   └── pricebook.ts      # 50+ services and parts
├── types/                 # TypeScript type definitions
│   └── index.ts
├── utils/                 # Helper functions
│   └── helpers.ts
├── app.json
├── package.json
└── README.md
```

## Key Workflows

### Technician Daily Workflow

1. Log in → See dashboard with today's scheduled jobs
2. Tap a job → View job details
3. Start job → Execute complete workflow:
   - Check-in with GPS and photo
   - Complete 32-point checklist
   - Document with photos
   - Get AI findings and proposal options
   - Present proposal to customer
   - Get digital signature
   - Generate invoice
   - Collect payment
4. Job marked complete

### Admin Lead Management

1. View leads in pipeline
2. Search/filter by status, source, tags
3. Tap lead → See details and next action
4. Quick actions: Call, Email, Text
5. Update status as lead progresses
6. AI recommends next best action

## Mock Providers

All external integrations use mock providers for development:

- **MockAiProvider**: Generates findings, proposals, and coaching
- **MockPaymentProvider**: Processes payments with 95% success rate
- **MockNotificationProvider**: Sends SMS and email notifications
- **MockLocationProvider**: GPS tracking (implemented via expo-location)

To use production APIs in the future, create `.env` file from `.env.example` and update provider implementations.

## Design System

### Colors
- **Primary**: #0A1628 (Navy)
- **Accent**: #C5962A (Gold)
- **Success**: #10B981 (Green)
- **Warning**: #F59E0B (Amber)
- **Danger**: #EF4444 (Red)
- **Gray**: #6B7280, #9CA3AF, #D1D5DB

### Typography
- **Headers**: 16-24pt, Bold, Navy
- **Body**: 12-14pt, Regular, Gray
- **Labels**: 11-12pt, Semibold, Gray

### Touch Targets
- Minimum 44x44 px for mobile accessibility
- Large buttons for gloved operation
- High contrast for outdoor visibility

## Data Persistence

- Uses AsyncStorage for local state
- Seed data loaded on first app launch
- All changes persisted locally
- No network required for demo mode

## TypeScript Strict Mode

The app uses TypeScript strict mode for type safety. All types are defined in `types/index.ts`.

## Performance Optimizations

- Lazy loading of screens via Expo Router
- Memoized components where needed
- Efficient list rendering with FlatList
- Local state management to avoid unnecessary API calls

## Testing the App

### Test Scenarios

1. **Lead Management**: Login as CSR, create and manage leads
2. **Job Execution**: Login as Technician, complete full job workflow
3. **Payment Processing**: Use "card", "cash", "check", or "paymentPlan" methods
4. **Role-Based Access**: Login as different roles to see varying features
5. **Search & Filter**: Test lead/job search with various criteria

### Mock Notifications

- SMS sending works with mock delivery (95% success rate)
- Email sending works with mock delivery
- All notifications are logged to console for debugging

## Future Production Integrations

Replace mock providers with real APIs:

1. **Square**: Update `MockPaymentProvider` with real Square SDK
2. **OpenAI**: Update `MockAiProvider` with GPT API calls
3. **Twilio**: Update `MockNotificationProvider` with real SMS/voice
4. **Google Maps**: Implement real location tracking and mapping
5. **Firebase**: Add real push notifications and analytics

Configure API keys in `.env` file.

## Troubleshooting

### App won't start
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear Expo cache: `expo start --clear`

### AsyncStorage errors
- Data is stored per user session
- Clear app data to reset state

### Navigation issues
- Check Expo Router setup in `app/_layout.tsx`
- Ensure all screens are properly exported

## Contributing

When adding new features:
1. Create TypeScript types in `types/index.ts`
2. Create mock data in `data/` directory
3. Create UI components in `components/`
4. Create screens in `app/` directory
5. Update relevant stores for state management
6. Test role-based access if applicable

## License

Proprietary - 5 Star Partners HVAC

## Support

For issues or feature requests, contact the development team.

---

**FRED v1.0** - Built with React Native, Expo, and TypeScript for 5 Star Partners HVAC
