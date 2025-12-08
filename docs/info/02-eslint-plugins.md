# ESLint Plugins Configuration

This document describes the ESLint plugins used in this project and how to work with them.

## Plugins

### eslint-plugin-unicorn

**Purpose:** Enforces modern JavaScript/TypeScript best practices and code quality.

**Installation:**
```bash
npm install --save-dev eslint-plugin-unicorn
```

**Usage:**
- Run linting: `npm run lint`
- Auto-fix issues: `npm run lint -- --fix`

**Disable a rule:**
```js
// In eslint.config.mjs
rules: {
  "unicorn/prevent-abbreviations": "off", // Disable specific rule
}
```

**Common rule to disable:**
The `prevent-abbreviations` rule can be strict (e.g., requires `properties` instead of `props`). You may want to disable it:
```js
rules: {
  "unicorn/prevent-abbreviations": "off",
}
```

**Resources:**
- [GitHub](https://github.com/sindresorhus/eslint-plugin-unicorn)
- [Rules Documentation](https://github.com/sindresorhus/eslint-plugin-unicorn?tab=readme-ov-file#rules)

### eslint-plugin-sonarjs

**Purpose:** Detects bugs, code smells, and maintainability issues. Focuses on code complexity and potential logical errors.

**Installation:**
```bash
npm install --save-dev eslint-plugin-sonarjs
```

**Usage:**
- Run linting: `npm run lint`
- Most rules are not auto-fixable (require manual fixes)

**Disable a rule:**
```js
// In eslint.config.mjs
rules: {
  "sonarjs/cognitive-complexity": "off", // Disable specific rule
}
```

**Common rule to customize:**
The `cognitive-complexity` rule can be adjusted to your team's threshold:
```js
rules: {
  "sonarjs/cognitive-complexity": ["error", 15], // Default is 15
}
```

**Resources:**
- [GitHub](https://github.com/SonarSource/eslint-plugin-sonarjs)
- [Rules Documentation](https://github.com/SonarSource/eslint-plugin-sonarjs#rules)

### eslint-plugin-promise

**Purpose:** Enforces best practices for Promises and async/await. Catches common Promise mistakes and anti-patterns.

**Installation:**
```bash
npm install --save-dev eslint-plugin-promise
```

**Usage:**
- Run linting: `npm run lint`
- Some rules are auto-fixable: `npm run lint -- --fix`

**Disable a rule:**
```js
// In eslint.config.mjs
rules: {
  "promise/always-return": "off", // Disable specific rule
}
```

**Common rules:**
- `promise/always-return` - Ensures promises always return a value
- `promise/catch-or-return` - Requires error handling for promises
- `promise/no-nesting` - Prevents nested promises (callback hell)

**Resources:**
- [GitHub](https://github.com/eslint-community/eslint-plugin-promise)
- [Rules Documentation](https://github.com/eslint-community/eslint-plugin-promise#rules)

### eslint-plugin-security

**Purpose:** Detects potential security vulnerabilities in JavaScript/TypeScript code. Identifies unsafe patterns like `eval()`, dangerous regex, and other security risks.

**Installation:**
```bash
npm install --save-dev eslint-plugin-security
```

**Usage:**
- Run linting: `npm run lint`
- Rules are not auto-fixable (require manual review and fixes)

**Disable a rule:**
```js
// In eslint.config.mjs
rules: {
  "security/detect-eval-with-expression": "off", // Disable specific rule
}
```

**Common rules:**
- `security/detect-eval-with-expression` - Detects use of `eval()`
- `security/detect-non-literal-regexp` - Flags unsafe regex patterns
- `security/detect-unsafe-regex` - Detects ReDoS vulnerabilities
- `security/detect-buffer-noassert` - Flags unsafe buffer operations

**Note:** This plugin may produce false positives. Review each warning carefully.

**Resources:**
- [GitHub](https://github.com/eslint-community/eslint-plugin-security)
- [Rules Documentation](https://github.com/eslint-community/eslint-plugin-security#rules)

### eslint-plugin-tailwindcss

**Status:** Skipped - Not compatible with Tailwind CSS v4 (project uses Tailwind v4, plugin requires v3.4.0).

**Note:** This plugin may be added in the future when Tailwind CSS v4 support is available.

### eslint-plugin-simple-import-sort

**Purpose:** Automatically sorts import and export statements. Ensures consistent import ordering and improves code readability.

**Installation:**
```bash
npm install --save-dev eslint-plugin-simple-import-sort
```

**Usage:**
- Run linting: `npm run lint`
- Auto-fix imports: `npm run lint -- --fix` (fully auto-fixable!)

**Disable a rule:**
```js
// In eslint.config.mjs
rules: {
  "simple-import-sort/imports": "off", // Disable import sorting
  "simple-import-sort/exports": "off", // Disable export sorting
}
```

**How it works:**
- Groups imports: side effects → Node built-ins → external packages → relative imports
- Sorts alphabetically within each group
- Preserves comments attached to imports
- Auto-fixes on save (if configured in your editor)

**Resources:**
- [GitHub](https://github.com/lydell/eslint-plugin-simple-import-sort)
- [Rules Documentation](https://github.com/lydell/eslint-plugin-simple-import-sort#rules)

