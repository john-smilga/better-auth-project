```ts
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintPluginPromise from "eslint-plugin-promise";
import eslintPluginSecurity from "eslint-plugin-security";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import eslintPluginSonarjs from "eslint-plugin-sonarjs";
import eslintPluginUnicorn from "eslint-plugin-unicorn";

import customPlugin from "./eslint-rules/index.js";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "eslint-rules/**", // Ignore custom ESLint rules directory
  ]),
  // eslint-plugin-unicorn: Best practices and modern JavaScript patterns
  {
    ...eslintPluginUnicorn.configs.recommended,
    plugins: {
      "unicorn": eslintPluginUnicorn,
    },
  },
  // eslint-plugin-sonarjs: Bug detection and code complexity analysis
  {
    ...eslintPluginSonarjs.configs.recommended,
    plugins: {
      "sonarjs": eslintPluginSonarjs,
    },
  },
  // eslint-plugin-security: Security vulnerability detection
  {
    ...eslintPluginSecurity.configs.recommended,
    plugins: {
      "security": eslintPluginSecurity,
    },
  },
  {
    // Register remaining plugins
    plugins: {
      "promise": eslintPluginPromise,
      "simple-import-sort": simpleImportSort,
      "custom": customPlugin,
    },
    rules: {
      // no-relative-imports: Enforce using @/ path aliases instead of relative imports, './' is allowed
      "custom/no-relative-imports": "error",
      // Disable prevent-abbreviations as it's too strict (e.g., props, utils)
      "unicorn/prevent-abbreviations": "off",
      // eslint-plugin-promise: Essential rules for async/await usage
      "promise/catch-or-return": "error", // Ensures error handling in async functions
      "promise/prefer-await-to-then": "warn", // Catches any .then() usage (prefer async/await)
      // Optional: Only relevant if you create promises manually with new Promise()
      "promise/no-new-statics": "error", // Prevents new Promise.resolve() (syntax error)
      "promise/param-names": "error", // Standard resolve/reject names
      "promise/valid-params": "warn", // Ensures valid Promise constructor
      // eslint-plugin-simple-import-sort: Auto-fixable import/export sorting
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      // Disable sonarjs/no-try-promise as @typescript-eslint/return-await is more specific
      "sonarjs/no-try-promise": "off",
    },
  },
  // Type-aware linting configuration for TypeScript files only
  {
    files: ["**/*.ts", "**/*.tsx"],
    // Enable type-aware linting for @typescript-eslint rules that require type information
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      "@typescript-eslint/return-await": "error", // Requires type information
    },
  },
  // React component files: allow null returns (React convention)
  {
    files: ["**/*.tsx"],
    rules: {
      "unicorn/no-null": "off", // React components conventionally return null for conditional rendering
    },
  },
]);

export default eslintConfig;
```