import '@testing-library/jest-dom/';
import '@testing-library/jest-dom/jest-globals';

const CONSOLE_FAIL_TYPES = ['error', 'warn'];

// Throw errors when a `console.error` or `console.warn` happens
// by overriding the functions
CONSOLE_FAIL_TYPES.forEach((type) => {
  // @ts-ignore
  // eslint-disable-next-line no-console
  console[type] = (message) => {
    throw new Error(
      `Failing due to console.${type} while running test!\n\n${message}`
    );
  };
});
