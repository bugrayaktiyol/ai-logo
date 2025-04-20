# AI Logo Generator Mobile App

A cross-platform mobile application built with Expo and React Native that allows users to generate logos using AI technology.

## 🌟 Features

- Generate custom logos based on user prompts
- Choose from various logo styles
- Preview and download generated logos
- Save favorite designs to your account
- Cross-platform (iOS, Android, Web)

## 🛠️ Tech Stack

- [Expo](https://expo.dev/) - React Native framework
- [Expo Router](https://docs.expo.dev/router/introduction/) - File-based routing
- [Firebase](https://firebase.google.com/) - Authentication and backend services
- [Zustand](https://github.com/pmndrs/zustand) - State management

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (>=18.x)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) 

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd ai-logo/mobile
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Setup environment variables
   Create a `.env` file in the mobile directory with required Firebase configuration

4. Start the development server
   ```bash
   npx expo start
   ```

## 📱 Running the App

- **iOS**: Press `i` in the terminal or use the Expo Go app
- **Android**: Press `a` in the terminal or use the Expo Go app
- **Web**: Press `w` in the terminal

## 📂 Project Structure

```
mobile/
├── app/                 # Main application screens using Expo Router
├── components/          # Reusable UI components
├── hooks/               # Custom React hooks
├── layouts/             # Layout components
├── assets/              # Static assets
├── types/               # TypeScript type definitions
├── data/                # Data models and mock data
└── service-account/     # Firebase service account credentials
```

## 🧪 Development

### Running Tests
```bash
npm test
```

### Linting
```bash
npm run lint
```

## 📄 API Integration

This mobile app integrates with a Firebase backend to generate logos. The API provides the following endpoints:

- `createLogo`: Sends a request to create a new logo
- `getLogo`: Gets information about a generated logo

For more details, refer to the API documentation in the `api/` directory.

## 📦 Building for Production

### Creating a Production Build
```bash
npx expo prebuild
```

### Building for iOS
```bash
npx expo run:ios
```

### Building for Android
```bash
npx expo run:android
```