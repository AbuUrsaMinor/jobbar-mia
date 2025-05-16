# Jobbar Mia

A Progressive Web Application (PWA) that displays Mia's work schedule on a calendar, with heart symbols marking her working days.

The application is built using:
- React 19
- TypeScript
- Vite
- Tailwind CSS
- PWA technology for offline use

## Work Schedule Pattern

The application visualizes Mia's three-week rotating work schedule:

- **Week 1**: Friday, Saturday, Sunday
- **Week 2**: Wednesday, Thursday
- **Week 3**: Monday, Tuesday

A reference point is provided: Friday, May 23rd, 2025 is a workday (beginning of Week 1).

## Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/abuursaminor/jobbar-mia.git

# Navigate to the project directory
cd jobbar-mia

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

### Building for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

### Deployment

The application is configured to deploy to GitHub Pages automatically.

```bash
# Deploy to GitHub Pages
npm run deploy
```

Alternatively, use the provided PowerShell script:

```powershell
# Windows PowerShell
./scripts/deploy.ps1
```

## Features

- Calendar display with Swedish date format
- Heart symbols marking Mia's working days
- Month navigation
- Responsive design for mobile and desktop
- Works offline as a PWA
```
