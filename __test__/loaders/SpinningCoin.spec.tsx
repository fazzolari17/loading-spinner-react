import '@testing-library/jest-dom/';
import '@testing-library/jest-dom/jest-globals';

import React from 'react';
import { render } from '@testing-library/react';
import { SpinningCoin } from '../../src';
import { 
  SPINNINGCOIN_DEFAULT_VALUES,
  DEFAULT_ARIA_ATTRIBUTES, 
} from '../../src/type';

// Global variables
const speed = [2.2, 2.4, 2.6];

describe('Spinning Coin Loader', () => {
  it('should render to screen with default props', () => {
    const { getByLabelText } = render(<SpinningCoin />);
    const loaderContainer = getByLabelText('spinning-coin-loader');
    const loader = loaderContainer.firstChild;

    expect(loaderContainer).toBeInTheDocument();
    // Standard Flex
    expect(loaderContainer).toHaveStyle('display: flex');
    expect(loaderContainer).toHaveStyle('justify-content: center');
    expect(loaderContainer).toHaveStyle('align-items: center');
    // // Correct Aria Attributes
    expect(loaderContainer).toHaveAttribute(
      'role',
      DEFAULT_ARIA_ATTRIBUTES.role
    );
    expect(loaderContainer).toHaveAttribute(
      'aria-busy',
      `${DEFAULT_ARIA_ATTRIBUTES['aria-busy']}`
    );
    expect(loaderContainer).toHaveAttribute(
      'aria-label',
      SPINNINGCOIN_DEFAULT_VALUES.ariaLabel
    );

    // Default class
    expect(loaderContainer).not.toHaveClass('');

    // Correct default styles are applied
    expect(loader).toHaveStyle(`width: ${SPINNINGCOIN_DEFAULT_VALUES.size}`);
    expect(loader).toHaveStyle(`height: ${SPINNINGCOIN_DEFAULT_VALUES.size}`);

    expect(loader).toHaveStyle(
      `animation: spin-coin ${
        speed[SPINNINGCOIN_DEFAULT_VALUES.spinnerSpeed]
      }s cubic-bezier(0, 0.2, 0.8, 1) infinite ${SPINNINGCOIN_DEFAULT_VALUES.spinDirection}`
    );
  });
  it('expect the props to be applied when passed to the component', () => {

    const TEST_VALUES = {
      size: '1rem',
      color: '#000',
      spinDirection: 'reverse' as 'reverse' | 'normal' | 'alternate' | 'alternate-reverse',
      spinnerSpeed: 0,
      ariaLabel: 'custom-aria-label',
      className: 'custom-class',
      ariaDescription: 'additional-props-will-pass-through'
    }
    const { getByLabelText } = render(
      <SpinningCoin
        size={TEST_VALUES.size}
        color={TEST_VALUES.color}
        spinDirection={TEST_VALUES.spinDirection}
        spinnerSpeed={TEST_VALUES.spinnerSpeed}
        ariaLabel={TEST_VALUES.ariaLabel}
        className={TEST_VALUES.className}
        aria-description={TEST_VALUES.ariaDescription}
      />
    );
    const loaderContainer = getByLabelText('custom-aria-label');
    const loader = loaderContainer.firstChild;

    expect(loaderContainer).toHaveAttribute('aria-label', 'custom-aria-label');
    expect(loaderContainer).not.toHaveAttribute(
      'aria-label',
      SPINNINGCOIN_DEFAULT_VALUES.ariaLabel
    );
    expect(loaderContainer).toHaveAttribute(
      'aria-description',
      TEST_VALUES.ariaDescription
    );

    expect(loaderContainer).toHaveClass('custom-class');

    expect(loader).toHaveStyle(`width: 1rem`);
    expect(loader).toHaveStyle(`height: 1rem`);

    expect(loader).toHaveStyle(
      `animation: spin-coin ${
        speed[0]
      }s cubic-bezier(0, 0.2, 0.8, 1) infinite ${'reverse'}`
    );
  });
  it('will not render when visible is set to false', () => {
    const { container } = render(<SpinningCoin visible={false} />);
    expect(container.firstChild).not.toBeInTheDocument();
  });
});
