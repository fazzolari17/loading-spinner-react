import '@testing-library/jest-dom/';
import '@testing-library/jest-dom/jest-globals';

import React from 'react';
import { Hourglass } from '../../src';
import { render } from '@testing-library/react';
import { 
  HOURGLASS_DEFAULT_VALUES, 
  DEFAULT_ARIA_ATTRIBUTES 
} from '../../src/type';

describe('Hourglass loader', () => {
  it('should render to screen with default props', () => {
    const { getByLabelText } = render(<Hourglass />);
    const loaderWrapper = getByLabelText(HOURGLASS_DEFAULT_VALUES.ariaLabel);

    expect(loaderWrapper).toBeInTheDocument();

    // Correct Aria Attributes
    expect(loaderWrapper).toHaveAttribute('role', DEFAULT_ARIA_ATTRIBUTES.role);
    expect(loaderWrapper).toHaveAttribute(
      'aria-busy',
      `${DEFAULT_ARIA_ATTRIBUTES['aria-busy']}`
    );
    expect(loaderWrapper).toHaveAttribute(
      'aria-label',
      HOURGLASS_DEFAULT_VALUES.ariaLabel
    );

    // Default class
    expect(loaderWrapper).not.toHaveClass('');

    // Correct default styles are applied
    expect(loaderWrapper.firstChild).toHaveStyle(`border: ${HOURGLASS_DEFAULT_VALUES.size} solid ${HOURGLASS_DEFAULT_VALUES.color}`);
    // Class
    expect(loaderWrapper).not.toHaveClass('');
  });
  it('expect the props to be applied when passed to the component', () => {
    const TEST_DEFAULTS = {
      size: 50,
      color: '#000',
      className: 'test-wrapper-class',
      style: { background: 'red' },
      ariaLabel: 'test-aria-label',
      ariaDesciption: 'test-additional-props-are-passed-through'
    };
    const { getByLabelText } = render(
      <Hourglass
        size={TEST_DEFAULTS.size}
        color={TEST_DEFAULTS.color}
        className={TEST_DEFAULTS.className}
        style={TEST_DEFAULTS.style}
        ariaLabel={TEST_DEFAULTS.ariaLabel}
        aria-description={TEST_DEFAULTS.ariaDesciption}
      />
    );
    const loaderWrapper = getByLabelText(TEST_DEFAULTS.ariaLabel);
    expect(loaderWrapper).toBeInTheDocument();

    // Custom aria
    expect(loaderWrapper).toHaveAttribute(
      'aria-label',
      TEST_DEFAULTS.ariaLabel
    );
    expect(loaderWrapper).not.toHaveAttribute(
      'aria-label',
      HOURGLASS_DEFAULT_VALUES.ariaLabel
    );
    expect(loaderWrapper).toHaveAttribute(
      'aria-description',
      TEST_DEFAULTS.ariaDesciption
    );
    // custom class
    expect(loaderWrapper).toHaveClass(TEST_DEFAULTS.className);
    expect(loaderWrapper).toHaveStyle(TEST_DEFAULTS.style);
    // custom size
    expect(loaderWrapper).toHaveStyle(`border: ${TEST_DEFAULTS.size} solid ${TEST_DEFAULTS.color}`);
  });
  it('will not render when visible is set to false', () => {
    const { container } = render(<Hourglass visible={false} />);

    expect(container.firstChild).not.toBeInTheDocument();
  });
});
