# Project Requirements and Specifications

## Project Overview
The "jobbar-mia" project is a web application built using React, Vite, Tailwind CSS, and TypeScript. It is designed to display Mia's three-week rotating work schedule in a calendar format, with working days highlighted with a heart symbol.

## Work Schedule Pattern
The work schedule follows a three-week rotating pattern:
- **Week 1**: Friday, Saturday, Sunday
- **Week 2**: Wednesday, Thursday
- **Week 3**: Monday, Tuesday

A reference point is provided: Friday, May 23rd, 2025 is a workday (beginning of Week 1).

## Key Features
- **Calendar Component**: Displays a calendar view with working days highlighted with heart symbols in Swedish format.
- **Header Component**: Provides navigation and branding for the application.
- **Custom Hook**: `useWorkSchedule` calculates work days based on the rotating pattern.
- **Responsive Design**: Utilizes Tailwind CSS for a mobile-friendly layout.
- **PWA Support**: Implements service workers for offline capabilities and improved performance.

## File Structure
The project follows a structured file organization to separate concerns and enhance maintainability:

- **public/**: Contains static assets such as the favicon, robots.txt, manifest.json, and service worker.
- **src/**: Contains the main application code, including components, hooks, styles, types, and utilities.
- **docs/**: Holds project documentation, including requirements and specifications.

## Technical Specifications
- **React**: A JavaScript library for building user interfaces.
- **Vite**: A build tool that provides a fast development environment.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **PWA**: Progressive Web App features for enhanced user experience.

## Dependencies
The project relies on several key libraries and tools:
- React
- React-DOM
- Vite
- Tailwind CSS
- TypeScript

## Development Guidelines
- Follow best practices for code organization and component design.
- Ensure components are reusable and maintainable.
- Regularly update documentation to reflect changes in the project.

## Deployment
- The application will be deployed as a GitHub Pages site.
- The deployment process should be automated through npm scripts.
- The base URL will be https://abuursaminor.github.io/jobbar-mia

## Future Enhancements
- Add toggleable views (month, week, day)
- Integrate Swedish public holidays
- Allow customization of the work pattern
- Add notifications for upcoming work days
- Implement dark/light mode toggle