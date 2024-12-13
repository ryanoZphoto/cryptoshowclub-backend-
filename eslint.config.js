import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
  js.configs.recommended,
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2020,
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': typescript
    },
    rules: {
      // TypeScript specific rules
      '@typescript-eslint/explicit-function-return-type': ['error', {
        allowExpressions: true,
        allowTypedFunctionExpressions: true
      }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      
      // General rules
      'no-console': ['warn', {
        allow: ['warn', 'error']
      }],
      'no-unused-vars': 'off', // Turned off in favor of @typescript-eslint/no-unused-vars
      'no-undef': 'off', // TypeScript handles this
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': 'error'
    }
  },
  {
    files: ['**/*.test.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off'
    }
  }
]; 