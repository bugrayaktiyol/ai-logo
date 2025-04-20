# AI Logo API

Backend API for the AI Logo project.

## Features

- Logo generation based on prompt and style
- Firebase Functions integration
- Firestore database for storing logos and styles

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file with the following variables:

```
PORT=3000
```

3. Build the project:

```bash
npm run build
```

4. Start the development server:

```bash
npm run dev
```

## Firebase Functions

This project includes Firebase Functions for logo generation. To deploy the functions:

1. Install the Firebase CLI:

```bash
npm install -g firebase-tools
```

2. Login to Firebase:

```bash
firebase login
```

3. Initialize Firebase (if not already done):

```bash
firebase init functions
```

4. Deploy the functions:

```bash
npm run deploy
```

## API Endpoints

### Express API

- `GET /`: Health check
- `GET /api/logo-styles`: Get all logo styles
- `POST /api/generate-logo`: Generate a logo
- `GET /api/logos/:id`: Get a logo by ID
- `GET /api/logos`: Get all logos

### Firebase Functions

- `getLogoStyles`: Get all logo styles
- `generateLogo`: Generate a logo
- `getLogoById`: Get a logo by ID

## Development

To run the Firebase emulators:

```bash
npm run serve
```

This will start the Firebase emulators for local development. 