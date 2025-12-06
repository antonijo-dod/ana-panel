import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

// Add custom matchers
expect.extend(matchers)

// Cleanup after each test case
afterEach(() => {
  cleanup()
})

// Mock environment variables for testing
Object.defineProperty(import.meta, 'env', {
  value: {
    VITE_COOLIFY_API: 'http://localhost:8000',
    VITE_COOLIFY_TOKEN_KEY: 'test-token-123'
  },
  writable: true
})