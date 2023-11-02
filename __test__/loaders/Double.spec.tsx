import '@testing-library/jest-dom/';
import '@testing-library/jest-dom/jest-globals';

import React from 'react';
import { render } from '@testing-library/react';
import { Double } from '../../src';
import { 
  DOUBLE_DEFAULT_VALUES, 
  DEFAULT_ARIA_ATTRIBUTES } from '../../src/type';

describe('Double Loader', () => {
  it('should render to screen with default props', () => {
    const { getByLabelText } = render(<Double />);
    const loaderContainer = getByLabelText(DOUBLE_DEFAULT_VALUES.ariaLabel);
    const textElement = loaderContainer.children[4];

    expect(loaderContainer).toBeInTheDocument();
    // // Standard Flex
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
      DOUBLE_DEFAULT_VALUES.ariaLabel
    );

    // Default class
    expect(loaderContainer).not.toHaveClass('');

    // Correct default styles are applied
    expect(loaderContainer).toHaveStyle(`width: ${DOUBLE_DEFAULT_VALUES.size}px`);
    expect(loaderContainer).toHaveStyle(`height: ${DOUBLE_DEFAULT_VALUES.size}px`);

    expect(loaderContainer.children[0]).toHaveStyle(
      `border: ${DOUBLE_DEFAULT_VALUES.spinnerSize} solid ${DOUBLE_DEFAULT_VALUES.colors[0]}`
    );
    expect(loaderContainer.children[1]).toHaveStyle(
      `border: ${DOUBLE_DEFAULT_VALUES.spinnerSize} solid ${DOUBLE_DEFAULT_VALUES.colors[1]}`
    );
    expect(loaderContainer.children[2]).toHaveStyle(
      `border: ${DOUBLE_DEFAULT_VALUES.spinnerSize} solid ${DOUBLE_DEFAULT_VALUES.colors[2]}`
    );
    expect(loaderContainer.children[3]).toHaveStyle(
      `border: ${DOUBLE_DEFAULT_VALUES.spinnerSize} solid ${DOUBLE_DEFAULT_VALUES.colors[3]}`
    );
    // Correct default text element styles applied
    expect(textElement).toHaveStyle(`color: ${DOUBLE_DEFAULT_VALUES.textColor}}`);
    expect(textElement).toHaveStyle(`font-size: ${DOUBLE_DEFAULT_VALUES.fontSize}}`);
    expect(textElement).toHaveStyle(
      `font-family: ${DOUBLE_DEFAULT_VALUES.fontFamily}}`
    );
    expect(textElement).toHaveStyle(
      `animation: ${'flash 2s ease-in-out infinite'}}`
    );
    expect(textElement).toHaveTextContent(`${DOUBLE_DEFAULT_VALUES.text}`);
  });
  it('should pass props to component', () => {
    const TEST_DEFAULTS = {
      size: 50,
      colors: ['#000', '#FFF', '#000', '#FFF'],
      text: 'CUSTOM TEXT...',
      textColor: '#000',
      textAnimation: true,
      displayText: true,
      fontFamily: 'Ariel',
      fontSize: '30px',
      spinnerThickness: '1px',
      ariaLabel: 'test-aria-label',
      className: 'test-class',
      ariaDescription: 'test-additional-props-pass-through'
    };
    const { getByLabelText } = render(
      <Double
        size={TEST_DEFAULTS.size}
        colors={TEST_DEFAULTS.colors}
        text={TEST_DEFAULTS.text}
        textColor={TEST_DEFAULTS.textColor}
        textAnimation={TEST_DEFAULTS.textAnimation}
        displayText={TEST_DEFAULTS.displayText}
        fontFamily={TEST_DEFAULTS.fontFamily}
        fontSize={TEST_DEFAULTS.fontSize}
        spinnerSize={TEST_DEFAULTS.spinnerThickness}
        ariaLabel={TEST_DEFAULTS.ariaLabel}
        className={TEST_DEFAULTS.className}
        aria-description={TEST_DEFAULTS.ariaDescription}
      />
    );
    const loaderContainer = getByLabelText(TEST_DEFAULTS.ariaLabel);
    const textElement = loaderContainer.children[4];

    expect(loaderContainer).toBeInTheDocument();
    // // Standard Flex
    expect(loaderContainer).toHaveStyle('display: flex');
    expect(loaderContainer).toHaveStyle('justify-content: center');
    expect(loaderContainer).toHaveStyle('align-items: center');
    // Correct Aria Attributes
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
      TEST_DEFAULTS.ariaLabel
    );
    expect(loaderContainer).toHaveAttribute(
      'aria-description',
      TEST_DEFAULTS.ariaDescription
    );

    // Correct class is applied
    expect(loaderContainer).toHaveClass(TEST_DEFAULTS.className);

    // Correct default styles are applied
    expect(loaderContainer).toHaveStyle(`width: ${TEST_DEFAULTS.size}px`);
    expect(loaderContainer).toHaveStyle(`height: ${TEST_DEFAULTS.size}px`);

    expect(loaderContainer.children[0]).toHaveStyle(
      `border: ${TEST_DEFAULTS.spinnerThickness} solid ${TEST_DEFAULTS.colors[0]}`
    );
    expect(loaderContainer.children[1]).toHaveStyle(
      `border: ${TEST_DEFAULTS.spinnerThickness} solid ${TEST_DEFAULTS.colors[1]}`
    );
    expect(loaderContainer.children[2]).toHaveStyle(
      `border: ${TEST_DEFAULTS.spinnerThickness} solid ${TEST_DEFAULTS.colors[2]}`
    );
    expect(loaderContainer.children[3]).toHaveStyle(
      `border: ${TEST_DEFAULTS.spinnerThickness} solid ${TEST_DEFAULTS.colors[3]}`
    );
    // Correct default text element styles applied
    // expect(textElement).toHaveStyle(`color: ${TEST_DEFAULTS.textColor}}`);
    expect(textElement).toHaveStyle(`font-size: ${TEST_DEFAULTS.fontSize}}`);
    expect(textElement).toHaveStyle(
      `font-family: ${TEST_DEFAULTS.fontFamily}}`
    );
  });
  it('will not render when visible is set to false', () => {
    const { container } = render(<Double visible={false} />);
    expect(container.firstChild).not.toBeInTheDocument();
  });
});
