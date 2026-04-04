# dataEntry

A React Native data entry application built with Expo.

## Tech Stack

- **Framework**: Expo SDK 54 / React Native 0.81.5
- **Navigation**: React Navigation (native-stack)
- **Styling**: NativeWind (Tailwind CSS)
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **HTTP Client**: Axios
- **Fonts**: Inter & Manrope (Google Fonts)

## Project Structure

```
src/
├── context/           # React Context providers (ThemeContext)
├── navigation/        # Navigation stacks (Auth, Employee, TeamLead, Admin)
├── providers/         # Query provider setup
├── screens/           # Screen components
│   ├── admin/         # Admin screens
│   ├── auth/          # Login, Splash
│   ├── employee/      # Employee screens
│   └── lead/          # TeamLead screens
├── services/api/      # API service modules
├── store/             # Zustand stores
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## User Roles

- **Admin**: Access to AdminDashboard
- **Team Lead**: Access to TeamLeadDashboard
- **Employee**: Access to EmployeeDashboard

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

2. Start the development server:
   ```bash
   npx expo start
   ```

3. Run on specific platforms:
   ```bash
   npx expo start --android
   npx expo start --ios
   npx expo start --web
   ```

## Scripts

- `npm start` - Start Expo development server
- `npm run android` - Start for Android
- `npm run ios` - Start for iOS
- `npm run web` - Start for Web

## Environment Details

- Environment: `production`
- Version: `1.0.0`
- Build: `1`
