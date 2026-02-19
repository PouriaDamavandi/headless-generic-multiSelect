// Setup Vitest environment for Storybook tests

// Import Vitest's expect globally
import { afterEach } from "vitest";

// Import jest-dom matchers for Testing Library
import "@testing-library/jest-dom";

// Optional: any global configuration for testing-library
import { cleanup } from "@testing-library/react";

// Ensure cleanup after each test
afterEach(() => {
  cleanup();
});
