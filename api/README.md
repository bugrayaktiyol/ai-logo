# AI Logo API

This project provides a set of Firebase Cloud Functions for generating logos using AI. The project is structured according to Clean Architecture principles.

## Project Structure

The project is organized following Clean Architecture principles:

```
api/functions/src/
├── index.ts                # Main entry point
└── features/
    └── logo/              # Logo feature
        ├── controller.ts  # HTTP endpoints and request handling
        ├── service.ts     # Business logic
        ├── repository.ts  # Data access layer
        └── model.ts       # Data models
```

### Layers

- **Model**: Contains data structures and interfaces
- **Repository**: Database operations and data access
- **Service**: Business logic and business rules
- **Controller**: HTTP request handling and response generation

## Technologies

- Firebase Cloud Functions (Node.js 20)
- TypeScript
- Firestore

## Functions

### createLogo

Sends a request to create a new logo.

**Request**:
```json
{
  "prompt": "Description for the logo",
  "style": "Logo style"
}
```

**Response**:
```json
{
  "id": "generated-logo-id"
}
```

### getLogo

Gets logo information by ID.

**Request**:
```json
{
  "id": "logo-id"
}
```

**Response**:
```json
{
  "id": "logo-id",
  "prompt": "Description for the logo",
  "style": "Logo style",
  "imageUrl": "https://example.com/image.jpg",
  "status": "completed",
  "createdAt": "2023-01-01T00:00:00.000Z"
}
```

## Development

### Setup

```bash
cd api/functions
npm install
```

### Local Development

```bash
npm run serve
```

### Build

```bash
npm run build
```

### Deployment

```bash
npm run deploy
```

## Error Codes

- `Logo ID must be a string.`: Invalid logo ID format
- `Logo not found.`: Logo with the specified ID not found
- `Eksik veri: prompt ve style alanları zorunludur.`: Required fields are missing
- `Test amaçlı hata fırlatıldı`: Error thrown for testing purposes (triggered with the "error" prompt)

## Logo Statuses

- `pending`: Logo generation process is in progress
- `completed`: Logo generation is completed
