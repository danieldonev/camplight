# Camplight

## Project Structure

Monorepo using Lerna and workspaces.

- `packages/web` - The main web application
- `packages/shared` - Shared utilities and components

## Getting Started

1. Clone the repository:

2. Install dependencies:

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Testing

### Unit Tests

Run unit tests:

```bash
npm run test
```

Generate test coverage report:

```bash
npm run test:coverage
```

### End-to-End Tests

Before running E2E tests, make sure to install Playwright browsers:

```bash
npx playwright install
```

Run all E2E tests:

```bash
npm run test:e2e
```

Run E2E tests with Playwright UI (recommended for development):

```bash
npm run test:e2e:ui
```

## Code Quality

Run linting:

```bash
npm run lint
```

Fix linting issues:

```bash
npm run lint
```

Format code:

```bash
npm run prettier
```
