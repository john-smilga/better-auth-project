# Next.js 16 Generic Structure Guide

This guide documents the recommended folder structure for organizing features, components, queries, stores, schemas, and tests in a Next.js 16 application with TypeScript, React Query, shadcn/ui, Tailwind CSS, React Hook Form, Zod, Zustand, Vitest, and React Testing Library.

## Tech Stack

- **Next.js 16** - App Router with React Server Components
- **TypeScript** - Strict type checking
- **React Query (TanStack Query)** - Data fetching and caching
- **shadcn/ui** - Component library
- **Tailwind CSS** - Utility-first CSS
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Zustand** - State management
- **Vitest** - Unit and integration testing
- **React Testing Library** - Component testing

## Naming Conventions

**All file names must use kebab-case** (ESLint Unicorn requirement):

✅ **Good**: `login-form.tsx`, `use-login-mutation.ts`, `auth-store.ts`
❌ **Bad**: `LoginForm.tsx`, `useLoginMutation.ts`, `authStore.ts`

**Exception**: Next.js route files (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`) remain as-is.

## Core Principle

**Routes are URLs; Features are domain boundaries. They don't need to match.**

- Routes reflect the URL hierarchy (e.g., `/stores/[storeId]/products`)
- Features reflect domain boundaries and business logic (e.g., `features/stores/`, `features/products/`)
- A single feature can be used across multiple routes
- Routes compose features, but features don't know about routes

## Complete Folder Structure

```
project/
├── app/                              # Next.js app directory (routes)
│   ├── (auth)/                       # Public routes (authentication)
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   │
│   ├── dashboard/                  # Protected routes (dashboard)
│   │   ├── stores/
│   │   │   ├── page.tsx
│   │   │   ├── create/
│   │   │   │   └── page.tsx
│   │   │   └── [store-id]/
│   │   │       ├── page.tsx
│   │   │       └── edit/
│   │   │           └── page.tsx
│   │   │
│   │   ├── products/
│   │   │   ├── page.tsx
│   │   │   ├── create/
│   │   │   │   └── page.tsx
│   │   │   └── [product-id]/
│   │   │       ├── page.tsx
│   │   │       └── edit/
│   │   │           └── page.tsx
│   │   │
│   │   └── layout.tsx                # Dashboard layout with navigation
│   │
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Home page
│   └── providers.tsx                 # React Query and other providers
│
├── features/                         # Feature-based organization
│   ├── auth/
│   │   ├── components/
│   │   │   ├── login-form/
│   │   │   │   ├── login-form.tsx
│   │   │   │   └── login-form.test.tsx
│   │   │   ├── register-form/
│   │   │   │   ├── register-form.tsx
│   │   │   │   └── register-form.test.tsx
│   │   │   └── index.ts              # Re-exports
│   │   ├── queries/
│   │   │   ├── use-login-mutation.ts
│   │   │   ├── use-login-mutation.test.ts
│   │   │   ├── use-register-mutation.ts
│   │   │   ├── use-register-mutation.test.ts
│   │   │   ├── use-current-user-query.ts
│   │   │   ├── use-current-user-query.test.ts
│   │   │   └── index.ts
│   │   ├── schemas/
│   │   │   ├── login-schema.ts
│   │   │   ├── register-schema.ts
│   │   │   └── index.ts
│   │   ├── store/
│   │   │   ├── auth-store.ts
│   │   │   ├── auth-store.test.ts
│   │   │   └── index.ts
│   │   └── types.ts
│   │
│   ├── stores/
│   │   ├── components/
│   │   │   ├── store-list/
│   │   │   │   ├── store-list.tsx
│   │   │   │   └── store-list.test.tsx
│   │   │   ├── store-card/
│   │   │   │   ├── store-card.tsx
│   │   │   │   └── store-card.test.tsx
│   │   │   ├── store-detail/
│   │   │   │   ├── store-detail.tsx
│   │   │   │   └── store-detail.test.tsx
│   │   │   ├── store-form/
│   │   │   │   ├── store-form.tsx
│   │   │   │   └── store-form.test.tsx
│   │   │   └── index.ts
│   │   ├── queries/
│   │   │   └── stores/
│   │   │       ├── use-stores-query.ts
│   │   │       ├── use-stores-query.test.ts
│   │   │       ├── use-store-query.ts
│   │   │       ├── use-store-query.test.ts
│   │   │       ├── use-create-store-mutation.ts
│   │   │       ├── use-create-store-mutation.test.ts
│   │   │       ├── use-update-store-mutation.ts
│   │   │       ├── use-update-store-mutation.test.ts
│   │   │       ├── use-delete-store-mutation.ts
│   │   │       ├── use-delete-store-mutation.test.ts
│   │   │       └── index.ts
│   │   ├── store/
│   │   │   ├── store-store.ts        # Zustand store for store feature
│   │   │   ├── store-store.test.ts
│   │   │   └── index.ts
│   │   ├── schemas/
│   │   │   ├── store-form-schema.ts
│   │   │   └── index.ts
│   │   └── types.ts
│   │
│   └── products/
│       ├── components/
│       │   ├── product-list/
│       │   │   ├── product-list.tsx
│       │   │   └── product-list.test.tsx
│       │   ├── product-card/
│       │   │   ├── product-card.tsx
│       │   │   └── product-card.test.tsx
│       │   ├── product-detail/
│       │   │   ├── product-detail.tsx
│       │   │   └── product-detail.test.tsx
│       │   ├── product-form/
│       │   │   ├── product-form.tsx
│       │   │   └── product-form.test.tsx
│       │   └── index.ts
│       ├── queries/
│       │   └── products/
│       │       ├── use-products-query.ts
│       │       ├── use-products-query.test.ts
│       │       ├── use-product-query.ts
│       │       ├── use-product-query.test.ts
│       │       ├── use-create-product-mutation.ts
│       │       ├── use-create-product-mutation.test.ts
│       │       ├── use-update-product-mutation.ts
│       │       ├── use-update-product-mutation.test.ts
│       │       ├── use-delete-product-mutation.ts
│       │       ├── use-delete-product-mutation.test.ts
│       │       └── index.ts
│       ├── store/
│       │   ├── product-store.ts
│       │   ├── product-store.test.ts
│       │   └── index.ts
│       ├── schemas/
│       │   ├── product-form-schema.ts
│       │   └── index.ts
│       └── types.ts
│
├── schemas/                          # API response schemas
│   ├── generated/                    # ⚠️ AUTO-GENERATED - DO NOT EDIT
│   │   ├── index.ts                  # Re-exports all generated schemas
│   │   ├── user.ts                   # Generated from API
│   │   ├── store.ts                  # Generated from API
│   │   ├── product.ts                # Generated from API
│   │   └── ...                       # All other generated schemas
│   │
│   └── manual/                       # Manual API schemas (when needed)
│       ├── index.ts
│       └── custom-response.ts        # For responses not auto-generated
│
├── store/                            # Global Zustand store (if needed)
│   ├── index.ts                      # Store setup with createSelectors
│   ├── index.test.ts
│   └── slices/
│       ├── user-slice.ts
│       ├── user-slice.test.ts
│       ├── cart-slice.ts
│       ├── cart-slice.test.ts
│       └── index.ts
│
├── lib/                              # Shared utilities and configurations
│   ├── http/
│   │   ├── client.ts                 # HTTP client (fetch/axios)
│   │   ├── client.test.ts
│   │   ├── http-request.ts           # Request wrapper with Zod validation
│   │   ├── http-request.test.ts
│   │   ├── errors.ts                 # Error normalization
│   │   └── errors.test.ts
│   ├── react-query.ts                # QueryClient configuration
│   ├── react-query.test.ts
│   ├── create-selectors.ts           # Zustand selector helper
│   ├── create-selectors.test.ts
│   ├── utils.ts                      # General utilities
│   ├── utils.test.ts
│   └── test-utils.tsx                 # Testing utilities (RTL setup, mocks)
│
├── components/                       # Shared UI components
│   ├── ui/                           # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── button.test.tsx
│   │   ├── input.tsx
│   │   ├── input.test.tsx
│   │   ├── form.tsx                  # React Hook Form wrapper
│   │   ├── form.test.tsx
│   │   ├── card.tsx
│   │   ├── card.test.tsx
│   │   └── ...                       # Other shadcn components
│   │
│   └── layout/                       # Layout components
│       ├── header/
│       │   ├── header.tsx
│       │   └── header.test.tsx
│       ├── footer/
│       │   ├── footer.tsx
│       │   └── footer.test.tsx
│       ├── navigation/
│       │   ├── navigation.tsx
│       │   └── navigation.test.tsx
│       └── index.ts
│
├── types/                            # Shared types (not feature-specific)
│   ├── api.ts                        # API-related types
│   ├── common.ts                     # Common types used across features
│   └── index.ts                      # Re-exports
│
├── __tests__/                        # Integration and E2E tests (optional)
│   ├── setup.ts                      # Test setup file
│   └── helpers/                      # Test helpers
│       └── test-helpers.ts
│
├── scripts/                          # Build and generation scripts
│   ├── generate-schemas.ts           # Script to generate schemas
│   └── validate-schemas.ts           # Validate generated schemas
│
├── vitest.config.ts                  # Vitest configuration
├── vitest.setup.ts                   # Vitest setup file
└── tsconfig.json                      # TypeScript configuration
```

## Testing File Organization

### Component Testing Pattern

Each component lives in its own folder with its test file side-by-side:

```
features/auth/components/login-form/
├── login-form.tsx                    # Component implementation
└── login-form.test.tsx               # Component tests
```

**Benefits:**

- Tests are co-located with components (easy to find)
- Clear relationship between component and its tests
- Easy to delete component and tests together
- Matches ESLint Unicorn kebab-case naming

### Query Hook Testing Pattern

React Query hooks are tested alongside their implementation:

```
features/auth/queries/
├── use-login-mutation.ts             # Hook implementation
└── use-login-mutation.test.ts        # Hook tests
```

### Store Testing Pattern

Zustand stores are tested alongside their implementation:

```
features/auth/store/
├── auth-store.ts                     # Store implementation
└── auth-store.test.ts                # Store tests
```

### Test File Naming

All test files use kebab-case with `.test.ts` or `.test.tsx` extension:

✅ **Good**: `login-form.test.tsx`, `use-login-mutation.test.ts`, `auth-store.test.ts`
❌ **Bad**: `LoginForm.test.tsx`, `useLoginMutation.test.ts`, `authStore.test.ts`

## Feature Organization Principles

### 1. Domain-Based, Not Route-Based

Features are organized by business domain, not by URL structure:

✅ **Good**: `features/stores/`, `features/products/` (domain boundaries)
❌ **Bad**: `features/dashboard/stores/` (mirroring routes)

### 2. Self-Contained Features

Each feature contains everything it needs:

- `components/` - Feature-specific UI components (with tests)
- `queries/` - React Query hooks for data fetching (with tests)
- `store/` - Zustand stores for feature-specific state (with tests)
- `schemas/` - Form validation schemas (Zod)
- `types.ts` - Feature-specific types

### 3. Component Organization

Components are grouped by functionality, not by route. Each component is in its own folder:

```
features/stores/components/
├── store-list/
│   ├── store-list.tsx
│   └── store-list.test.tsx
├── store-detail/
│   ├── store-detail.tsx
│   └── store-detail.test.tsx
├── store-form/
│   ├── store-form.tsx
│   └── store-form.test.tsx
└── index.ts                          # Re-exports all components
```

**Not organized like:**

```
❌ features/stores/components/
   └── [store-id]/
       └── store-detail.tsx           # Route-based (bad)
```

## Schema Organization

### Generated Schemas (from API)

All API response schemas are stored in `schemas/generated/`.

- Each schema file is auto-generated from API definitions
- Files are marked with `⚠️ AUTO-GENERATED - DO NOT EDIT` comment
- Types are inferred from Zod schemas using `z.infer<typeof schema>`
- Use kebab-case for file names: `user-profile.ts`, `store-detail.ts`

### Manual Form Schemas (Client-Side Validation)

Form validation schemas live in features under `features/*/schemas/`.

- Used for client-side form validation with React Hook Form
- Separate from API response schemas
- Types are inferred from schemas
- Use kebab-case: `login-schema.ts`, `store-form-schema.ts`

### Usage Pattern

- Import generated schemas from `@/schemas/generated` for API responses
- Import form schemas from feature directories for form validation
- Use generated schemas in `httpRequest` to validate API responses
- Use form schemas with React Hook Form for client-side validation

## Query Organization

Queries are grouped by entity within the feature:

```
features/stores/queries/
└── stores/
    ├── use-stores-query.ts
    ├── use-stores-query.test.ts
    ├── use-store-query.ts
    ├── use-store-query.test.ts
    ├── use-create-store-mutation.ts
    ├── use-create-store-mutation.test.ts
    ├── use-update-store-mutation.ts
    ├── use-update-store-mutation.test.ts
    ├── use-delete-store-mutation.ts
    ├── use-delete-store-mutation.test.ts
    └── index.ts
```

### Query Example with Route Context

Queries can accept route parameters (like `storeId`) to fetch data in context of a specific route. The query key should include these parameters for proper caching.

## Store Organization

### Feature-Specific Stores

If state is only used within a feature, keep it in the feature:

- Store file: `features/*/store/*-store.ts` (kebab-case)
- Test file: `features/*/store/*-store.test.ts`
- Use `createSelectors` helper for auto-generated selectors
- Store contains feature-specific UI state and actions

### Global Stores

If state is shared across multiple features, use global store:

- Store slices: `store/slices/*-slice.ts` (kebab-case)
- Test files: `store/slices/*-slice.test.ts`
- Combined in `store/index.ts` with `createSelectors`
- Use for cross-feature state like user authentication, cart, etc.

## Route Implementation

Pages are thin composers that import from features:

### Route Structure

- **Stores List**: `app/(dashboard)/stores/page.tsx` - Uses `StoreList` component
- **Store Detail**: `app/(dashboard)/stores/[store-id]/page.tsx` - Uses `StoreDetail` component
- **Create Store**: `app/(dashboard)/stores/create/page.tsx` - Uses `StoreForm` component
- **Edit Store**: `app/(dashboard)/stores/[store-id]/edit/page.tsx` - Uses `StoreForm` component
- **Products List**: `app/(dashboard)/products/page.tsx` - Uses `ProductList` component
- **Product Detail**: `app/(dashboard)/products/[product-id]/page.tsx` - Uses `ProductDetail` component
- **Create Product**: `app/(dashboard)/products/create/page.tsx` - Uses `ProductForm` component
- **Edit Product**: `app/(dashboard)/products/[product-id]/edit/page.tsx` - Uses `ProductForm` component

### Page Pattern

Pages should:

- Use React Server Components when possible (default in Next.js 16)
- Use `'use client'` directive only when needed (hooks, interactivity)
- Import components from features
- Pass route parameters to feature components
- Handle navigation and mutations at the page level
- Keep business logic in features, not pages

## Import Patterns

### ✅ Good Import Patterns

- Import from generated schemas: `@/schemas/generated` (use index, not direct file)
- Import form schemas from feature: `@/features/*/schemas`
- Import queries from feature: `@/features/*/queries/*/use-*-query.ts`
- Import components from feature: `@/features/*/components/*`
- Import stores from feature: `@/features/*/store/*-store.ts`
- Use path aliases (`@/`) instead of relative imports

### ❌ Bad Import Patterns

- Don't import generated schemas directly (use index): `@/schemas/generated/store`
- Don't import from routes: `@/app/(dashboard)/stores/[store-id]/components/*`
- Don't mix feature boundaries: `@/features/stores/components/products/*`
- Don't use relative imports beyond `./` or `../` (use `@/` aliases)

## Testing Setup

### Vitest Configuration

Create `vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
```

### Test Utilities

Create `lib/test-utils.tsx` for React Testing Library setup:

```typescript
import { render, type RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type ReactElement } from 'react';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

export const renderWithProviders = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => {
  const queryClient = createTestQueryClient();

  const Wrapper = ({ children }: { children: React.ReactNode }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

  return render(ui, { wrapper: Wrapper, ...options });
};

export * from '@testing-library/react';
```

## When to Split Features

Split features when:

1. **Domain Independence**: The feature can function independently
2. **Complex Functionality**: The feature has substantial logic
3. **Reusability**: The feature is used in multiple contexts
4. **Team Ownership**: Different teams own different features

Keep together when:

1. **Tight Coupling**: Features are always used together
2. **Simple Functionality**: The feature is small and simple
3. **Single Context**: The feature is only used in one place

## Benefits

1. **Separation of Concerns**: Routes handle navigation, features handle business logic
2. **Reusability**: Features can be used across multiple routes
3. **Maintainability**: Clear boundaries make code easier to understand
4. **Testability**: Features can be tested independently of routes
5. **Scalability**: Easy to add new features without affecting existing ones
6. **Team Collaboration**: Different teams can work on different features
7. **ESLint Compliance**: Kebab-case naming follows Unicorn rules
8. **Test Co-location**: Tests are easy to find and maintain

## Summary

- **Routes** = URL structure (hierarchical, user-facing)
- **Features** = Domain boundaries (business logic, reusable)
- **Components** = Organized by functionality in folders with side-by-side tests
- **Schemas** = Generated (API) vs Manual (forms), both using Zod
- **Stores** = Feature-specific or global based on scope
- **Queries** = Grouped by entity within features with tests
- **Pages** = Thin composers that import from features
- **Tests** = Co-located with implementation files using kebab-case
- **Naming** = All files use kebab-case (ESLint Unicorn requirement)

This structure keeps your codebase organized, maintainable, testable, and scalable as your application grows while adhering to ESLint Unicorn naming conventions.
