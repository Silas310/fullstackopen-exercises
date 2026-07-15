import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

afterEach(() => {
  cleanup() //reset jsDOM after each test to prevent memory leaks and ensure ambient isolation between tests
})



