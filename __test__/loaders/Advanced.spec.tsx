import React from 'react';
import { Advanced } from '../../src';
import { render } from '@testing-library/react';
import { DEFAULT_VALUES } from '../../src/loaders/Advanced';
import { DEFAULT_ARIA_ATTRIBUTES } from '../../src/type';
import '@testing-library/jest-dom/';
import '@testing-library/jest-dom/jest-globals';

describe('Advanced Loader', () => {
  it('should render to screen with default props', () => {
    const { getByLabelText } = render(<Advanced />);
    const loaderContainer = getByLabelText(DEFAULT_VALUES.ariaLabel);
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
      DEFAULT_VALUES.ariaLabel
    );

    // Default class
    expect(loaderContainer).not.toHaveClass('');

    // Correct default styles are applied
    expect(loaderContainer).toHaveStyle(`width: ${DEFAULT_VALUES.size}`);
    expect(loaderContainer).toHaveStyle(`height: ${DEFAULT_VALUES.size}`);
    expect(loader).toHaveStyle(`width: ${DEFAULT_VALUES.size}`);
    expect(loader).toHaveStyle(`height: ${DEFAULT_VALUES.size}`);

    expect(loader).toHaveStyle(
      `border: ${DEFAULT_VALUES.spinnerSize} solid ${DEFAULT_VALUES.color}`
    );
    expect(loader).toHaveStyle(
      `animation: lds-ring ${
        DEFAULT_VALUES.speed
      }s cubic-bezier(0.5, 0, 0.5, 1) infinite ${DEFAULT_VALUES.spinDirection}`
    );
    expect(loader).toHaveStyle(
      `borderColor: ${DEFAULT_VALUES.color} transparent transparent transparent`
    );
  });
  it('expect the props to be applied when passed to the component', () => {

    const TEST_VALUES = {
      size: '1rem',
      color: '#000',
      spinDirection: 'reverse' as 'reverse' | 'normal' | 'alternate' | 'alternate-reverse',
      spinnerSize: '5px',
      speed: 1,
      ariaLabel: 'custom-aria-label',
      className: 'custom-class',
      ariaDescription: 'test-additional-attributes-are-passed'
    }
    const { getByLabelText } = render(
      <Advanced
        size={TEST_VALUES.size}
        color={TEST_VALUES.color}
        spinDirection={TEST_VALUES.spinDirection}
        spinnerSize={TEST_VALUES.spinnerSize}
        speed={TEST_VALUES.speed}
        ariaLabel={TEST_VALUES.ariaLabel}
        className={TEST_VALUES.className}
        aria-description={TEST_VALUES.ariaDescription}
      />
    );
    const loaderContainer = getByLabelText(TEST_VALUES.ariaLabel);
    const loader = loaderContainer.firstChild;

    expect(loaderContainer).toHaveAttribute('aria-label', TEST_VALUES.ariaLabel);
    expect(loaderContainer).not.toHaveAttribute(
      'aria-label',
      DEFAULT_VALUES.ariaLabel
    );
    expect(loaderContainer).toHaveAttribute('aria-description', TEST_VALUES.ariaDescription)

    expect(loaderContainer).toHaveClass(TEST_VALUES.className);

    expect(loaderContainer).toHaveStyle(`width: ${TEST_VALUES.size}`);
    expect(loaderContainer).toHaveStyle(`height: ${TEST_VALUES.size}`);
    expect(loader).toHaveStyle(`width: ${TEST_VALUES.size}`);
    expect(loader).toHaveStyle(`height: ${TEST_VALUES.size}`);

    expect(loader).toHaveStyle(`border: ${TEST_VALUES.spinnerSize} solid ${TEST_VALUES.color}`);
    expect(loader).toHaveStyle(
      `animation: lds-ring ${
        TEST_VALUES.speed
      }s cubic-bezier(0.5, 0, 0.5, 1) infinite ${TEST_VALUES.spinDirection}`
    );
    expect(loader).toHaveStyle(
      `borderColor: ${TEST_VALUES.color} transparent transparent transparent`
    );
  });
  it('will not render when visible is set to false', () => {
    const { container } = render(<Advanced visible={false} />);
    expect(container.firstChild).not.toBeInTheDocument();
  });
});
