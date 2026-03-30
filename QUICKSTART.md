# FRED - Quick Start Guide

## Installation & Setup (2 minutes)

```bash
cd /sessions/amazing-lucid-brown/fred-app
npm install
npx expo start --web
```

Then press `w` to open in web browser.

## Demo Accounts (No API Keys Required)

All accounts use password: `password`

| Email | Role | Access |
|-------|------|--------|
| owner@5starpartners.com | Owner | Dashboard, all features |
| admin@5starpartners.com | Admin | Dashboard, leads, schedule, jobs |
| dispatcher@5starpartners.com | Dispatcher | Schedule, job dispatch |
| tech@5starpartners.com | Technician | My jobs, complete workflow |
| csr@5starpartners.com | CSR | Leads, customer management |

## What to Explore

### 1. Login as Technician (tech@5starpartners.com)
- Dashboard shows today's scheduled jobs
- Tap a job to see complete workflow
- Navigate through entire job process:
  - View job details
  - Complete 32-point inspection checklist
  - Take photos
  - Review AI-generated proposals (Good/Better/Best)
  - Get sales coaching
  - Collect customer signature
  - Generate and send invoice
  - Process payment (use any method)

### 2. Login as Admin (admin@5starpartners.com)
- See overall dashboard with revenue, jobs, pipeline
- Go to Leads tab to manage CRM
- Search and filter 20+ demo leads
- Tap a lead to see details
- Call/email/text customers (mock)
- Update lead status
- Schedule jobs

### 3. Login as Owner (owner@5starpartners.com)
- Full dashboard with performance metrics
- Pipeline overview
- Technician performance rankings
- Financial summary

## Key Features to Test

### Job Workflow (Complete Path)
1. Jobs tab → Tap a job
2. Complete 32-point inspection (expand categories)
3. View proposals (select Good/Better/Best)
4. See sales coaching (tap each topic)
5. Customer approval (digital signature)
6. Generate invoice (with line items)
7. Collect payment (try different methods)

### Lead Management
1. Leads tab → Search/filter leads
2. Tap a lead to see full details
3. Next action recommendations
4. Quick actions: Call, Email, Text
5. Update status through workflow

### Price Book
1. More menu → Price Book
2. Browse all services and parts (50+ items)
3. Search by category or keyword
4. View pricing and labor hours

### Invoices & Payment
1. More menu → Invoices
2. View mock invoices with statuses
3. Job detail → Payment section for new invoices

## Mock Data Included

- **20+ Leads** across all stages (New, Contacted, Qualified, Booked, Lost)
- **10+ Jobs** in various statuses (Booked, In Progress, Completed, etc.)
- **5 Technicians** with different specialties and performance metrics
- **5 Customers** with HVAC equipment details
- **32-Point Inspection Checklist** (10 categories, 32 items)
- **50+ Price Book Items** (services, parts, labor)

## Architecture Highlights

- **React Native + Expo** - Works on iOS, Android, Web
- **TypeScript Strict Mode** - Full type safety
- **Expo Router** - Modern file-based routing
- **AsyncStorage** - Local persistence (no backend needed)
- **Mock Providers** - All external services mocked:
  - MockAiProvider (findings, proposals, coaching)
  - MockPaymentProvider (payment processing)
  - MockNotificationProvider (SMS/Email)

## File Structure

```
app/              → All screens and navigation
components/       → Reusable UI components
data/             → 20+ leads, 10+ jobs, 5 technicians, etc.
providers/        → Mock AI, Payment, Notifications
store/            → State management (auth, jobs, leads)
types/            → TypeScript definitions
utils/            → Helper functions
```

## Customization

All data is stored in `/data` directory:
- `leads.ts` - Edit/add leads
- `jobs.ts` - Edit/add jobs
- `technicians.ts` - Edit/add techs
- `pricebook.ts` - Edit/add prices
- `checklist.ts` - Edit inspection items

Changes reload automatically with hot reload enabled.

## Next Steps for Production

1. Replace mock providers with real APIs:
   - Square SDK for payments
   - OpenAI API for AI findings
   - Twilio for SMS notifications
   - Google Maps for location

2. Add real authentication backend

3. Connect to production API

4. Configure push notifications

5. Add photo storage (S3, Firebase)

## Support & Troubleshooting

- **App won't start**: `rm -rf node_modules && npm install`
- **Refresh data**: Close and restart app (AsyncStorage reset)
- **Check console**: Look for error messages
- **TypeScript issues**: All types defined in `types/index.ts`

---

Enjoy exploring FRED! 🔧
