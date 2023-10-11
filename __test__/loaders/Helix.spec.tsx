import React from 'react';
import { Helix } from '../../src';
import { render } from '@testing-library/react';
import { DEFAULT_VALUES } from '../../src/loaders/Helix';
import { DEFAULT_ARIA_ATTRIBUTES } from '../../src/type';
import '@testing-library/jest-dom/';
import '@testing-library/jest-dom/jest-globals';

describe('Helix Svg loader', () => {
  it('should render to screen with default props', () => {
    const { getByLabelText } = render(<Helix />);
    const loaderWrapper = getByLabelText(DEFAULT_VALUES.ariaLabel);

    expect(loaderWrapper).toBeInTheDocument();

    // Correct Aria Attributes
    expect(loaderWrapper).toHaveAttribute('role', DEFAULT_ARIA_ATTRIBUTES.role);
    expect(loaderWrapper).toHaveAttribute(
      'aria-busy',
      `${DEFAULT_ARIA_ATTRIBUTES['aria-busy']}`
    );
    expect(loaderWrapper).toHaveAttribute(
      'aria-label',
      DEFAULT_VALUES.ariaLabel
    );

    // Default class
    expect(loaderWrapper).not.toHaveClass('');

    // Correct default styles are applied
    expect(loaderWrapper).toHaveStyle(`width: ${DEFAULT_VALUES.size}`);
    expect(loaderWrapper).toHaveStyle(`height: ${DEFAULT_VALUES.size}`);
    // Class
    expect(loaderWrapper).not.toHaveClass('');
  });
  it('expect the props to be applied when passed to the component', () => {
    const TEST_VALUES = {
      size: 50,
      wrapperClass: 'test-wrapper-class',
      wrapperStyle: { background: 'red' },
      ariaLabel: 'test-aria-label',
      primaryColor: ['red', 'orange'],
      secondaryColor: ['blue', 'purple'],
      ariaDescription: 'test-additional-props-are-passed-through',
    };
    const { getByLabelText } = render(
      <Helix
        size={TEST_VALUES.size}
        wrapperClass={TEST_VALUES.wrapperClass}
        wrapperStyle={TEST_VALUES.wrapperStyle}
        ariaLabel={TEST_VALUES.ariaLabel}
        primaryColor={TEST_VALUES.primaryColor}
        secondaryColor={TEST_VALUES.secondaryColor}
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
      DEFAULT_VALUES.ariaLabel
    );
    expect(loaderWrapper).toHaveAttribute(
      'aria-description',
      TEST_VALUES.ariaDescription
    );
    // custom class
    expect(loaderWrapper).toHaveClass(TEST_VALUES.wrapperClass);
    expect(loaderWrapper).toHaveStyle(TEST_VALUES.wrapperStyle);
    // custom size
    expect(loaderWrapper).toHaveStyle(`width: ${TEST_VALUES.size}`);
    expect(loaderWrapper).toHaveStyle(`height: ${TEST_VALUES.size}`);
  });
  it('will not render when visible is set to false', () => {
    const { container } = render(<Helix visible={false} />);

    expect(container.firstChild).not.toBeInTheDocument();
  });
});
