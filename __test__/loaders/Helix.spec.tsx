import '@testing-library/jest-dom/';
import '@testing-library/jest-dom/jest-globals';

import React from 'react';
import { render } from '@testing-library/react';
import { Helix } from '../../src';
import { 
  HELIX_DEFAULT_VALUES, 
  DEFAULT_ARIA_ATTRIBUTES 
} from '../../src/type';

describe('Helix Svg loader', () => {
  it('should render to screen with default props', () => {
    const { getByLabelText } = render(<Helix />);
    const loaderWrapper = getByLabelText(HELIX_DEFAULT_VALUES.ariaLabel);

    expect(loaderWrapper).toBeInTheDocument();

    // Correct Aria Attributes
    expect(loaderWrapper).toHaveAttribute('role', DEFAULT_ARIA_ATTRIBUTES.role);
    expect(loaderWrapper).toHaveAttribute(
      'aria-busy',
      `${DEFAULT_ARIA_ATTRIBUTES['aria-busy']}`
    );
    expect(loaderWrapper).toHaveAttribute(
      'aria-label',
      HELIX_DEFAULT_VALUES.ariaLabel
    );

    // Default class
    expect(loaderWrapper).not.toHaveClass('');

    // Correct default styles are applied
    expect(loaderWrapper).toHaveAttribute(`width`, `${HELIX_DEFAULT_VALUES.size}`);
    expect(loaderWrapper).toHaveAttribute(`height`, `${HELIX_DEFAULT_VALUES.size}`);
    // Class
    expect(loaderWrapper).not.toHaveClass('');
  });
  it('expect the props to be applied when passed to the component', () => {
    const TEST_VALUES = {
      size: 50,
      className: 'test-wrapper-class',
      style: { background: 'red' },
      ariaLabel: 'test-aria-label',
      colors: ['red', 'orange', 'blue', 'purple'],
      ariaDescription: 'test-additional-props-are-passed-through',
    };
    const { getByLabelText } = render(
      <Helix
        size={TEST_VALUES.size}
        className={TEST_VALUES.className}
        style={TEST_VALUES.style}
        ariaLabel={TEST_VALUES.ariaLabel}
        colors={TEST_VALUES.colors}
        aria-description={TEST_VALUES.ariaDescription}
      />
    );
    const loaderWrapper = getByLabelText(TEST_VALUES.ariaLabel);
    expect(loaderWrapper).toBeInTheDocument();

    // Custom aria
    expect(loaderWrapper).toHaveAttribute(
      'aria-label',
      TEST_VALUES.ariaLabel
    );
    expect(loaderWrapper).not.toHaveAttribute(
      'aria-label',
      HELIX_DEFAULT_VALUES.ariaLabel
    );
    expect(loaderWrapper).toHaveAttribute(
      'aria-description',
      TEST_VALUES.ariaDescription
    );
    // custom class
    expect(loaderWrapper).toHaveClass(TEST_VALUES.className);
    expect(loaderWrapper).toHaveStyle(TEST_VALUES.style);
    // custom size
    expect(loaderWrapper).toHaveStyle(`width: ${TEST_VALUES.size}`);
    expect(loaderWrapper).toHaveStyle(`height: ${TEST_VALUES.size}`);
  });
  it('will not render when visible is set to false', () => {
    const { container } = render(<Helix visible={false} />);

    expect(container.firstChild).not.toBeInTheDocument();
  });
});
