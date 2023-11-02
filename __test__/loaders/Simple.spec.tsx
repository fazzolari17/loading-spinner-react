import '@testing-library/jest-dom/';
import '@testing-library/jest-dom/jest-globals';

import React from 'react';
import { render } from '@testing-library/react';
import { Simple } from '../../src';
import { 
  SIMPLE_DEFAULT_VALUES, 
  DEFAULT_ARIA_ATTRIBUTES 
} from '../../src/type';

describe('Simple Loader', () => {
  it('should render to screen with default props', () => {
    const { getByLabelText } = render(<Simple />);
    const loaderContainer = getByLabelText(SIMPLE_DEFAULT_VALUES.ariaLabel);
    const loader = loaderContainer.firstChild;

    expect(loaderContainer).toBeInTheDocument();

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
      SIMPLE_DEFAULT_VALUES.ariaLabel
    );

    expect(loader).toHaveStyle(
      `border: ${SIMPLE_DEFAULT_VALUES.spinnerSize} solid ${SIMPLE_DEFAULT_VALUES.color}`
    );
    expect(loader).toHaveStyle(`height: ${SIMPLE_DEFAULT_VALUES.size}`);
    expect(loader).toHaveStyle(`width: ${SIMPLE_DEFAULT_VALUES.size}`);
    // Check if smallSpinArc is true
    expect(loader).toHaveStyle(
      `border-top: ${SIMPLE_DEFAULT_VALUES.spinnerSize} solid transparent`
    );
    expect(loader).toHaveStyle(
      `border-right: ${SIMPLE_DEFAULT_VALUES.spinnerSize} solid transparent`
    );
  });
  it('component will display custom aria label instead of default if entered', () => {
    const TEST_VALUES = {
      ariaLabel: "custom-aria-label" 
    }
    const { getByLabelText } = render(<Simple ariaLabel={TEST_VALUES.ariaLabel}/>);
    const loaderContainer = getByLabelText(TEST_VALUES.ariaLabel);

    expect(loaderContainer).toHaveAttribute('aria-label', 'custom-aria-label');
    expect(loaderContainer).not.toHaveAttribute(
      'aria-label',
      SIMPLE_DEFAULT_VALUES.ariaLabel
    );
  });
  it('component will display custom color instead of default if entered', () => {
    const { getByLabelText } = render(<Simple color="#000" />);
    const loaderContainer = getByLabelText(SIMPLE_DEFAULT_VALUES.ariaLabel);
    const loader = loaderContainer.firstChild;
    expect(loader).toHaveStyle(
      `border: ${SIMPLE_DEFAULT_VALUES.spinnerSize} solid #000`
    );
    expect(loader).not.toHaveStyle(
      `border: ${SIMPLE_DEFAULT_VALUES.spinnerSize} solid ${SIMPLE_DEFAULT_VALUES.color}`
    );
  });
  it('component will display custom spinnerSize instead of default if entered', () => {
    const { getByLabelText } = render(<Simple spinnerSize="8px" />);
    const loaderContainer = getByLabelText(SIMPLE_DEFAULT_VALUES.ariaLabel);
    const loader = loaderContainer.firstChild;
    expect(loader).toHaveStyle(`border: 8px solid ${SIMPLE_DEFAULT_VALUES.color}`);
    expect(loader).not.toHaveStyle(
      `border: ${SIMPLE_DEFAULT_VALUES.spinnerSize} solid ${SIMPLE_DEFAULT_VALUES.color}`
    );
  });
  it('component will display custom className', () => {
    const { getByLabelText } = render(<Simple className="custom-class" />);
    const loaderContainer = getByLabelText(SIMPLE_DEFAULT_VALUES.ariaLabel);

    expect(loaderContainer.firstChild).toHaveClass('custom-class');
  });
  it('component will display custom size when entered', () => {
    const { getByLabelText } = render(<Simple size="50px" />);
    const loaderContainer = getByLabelText(SIMPLE_DEFAULT_VALUES.ariaLabel);
    const loader = loaderContainer.firstChild;

    expect(loader).toHaveStyle('height: 50px');
    expect(loader).toHaveStyle('width: 50px');

    expect(loader).not.toHaveStyle(`height: ${SIMPLE_DEFAULT_VALUES.size}`);
    expect(loader).not.toHaveStyle(`width: ${SIMPLE_DEFAULT_VALUES.size}`);
  });
  it('component will display changed spinner size when smallSpinnerArc is set to false', () => {
    const { getByLabelText } = render(<Simple smallSpinArc={false} />);
    const loaderContainer = getByLabelText(SIMPLE_DEFAULT_VALUES.ariaLabel);
    const loader = loaderContainer.firstChild;

    expect(loader).toHaveStyle(
      `border-top: ${SIMPLE_DEFAULT_VALUES.spinnerSize} solid transparent`
    );
    expect(loader).not.toHaveStyle(
      `border-right: ${SIMPLE_DEFAULT_VALUES.spinnerSize} solid transparent`
    );
  });
  it('animation defaults are overwritten when passed to component', () => {
    const TEST_VALUES = {
      speed: 5,
      spinDirection: "reverse",

    }
    const { getByLabelText } = render(
      <Simple
        speed={TEST_VALUES.speed}
        spinDirection={TEST_VALUES.spinDirection}
      />
    );
    const loaderContainer = getByLabelText(SIMPLE_DEFAULT_VALUES.ariaLabel);
    const loader = loaderContainer.firstChild;

    expect(loader).toHaveStyle(
      `animation: spin ${TEST_VALUES.speed}s ease-in-out infinite ${TEST_VALUES.spinDirection}`
    );
    expect(loader).not.toHaveStyle(
      `animation: spin ${SIMPLE_DEFAULT_VALUES.speed}s ease-in-out infinite ${SIMPLE_DEFAULT_VALUES.spinDirection}`
    );
  });
  it('additonal props will pass through', () => {
    const TEST_VALUES = {
      ariaDescription: 'additional-props-will-pass-through'
    }
    const { getByLabelText } = render(<Simple aria-description={TEST_VALUES.ariaDescription} />);
    expect(getByLabelText(SIMPLE_DEFAULT_VALUES.ariaLabel)).toHaveAttribute('aria-description', TEST_VALUES.ariaDescription)
  });
  it('will not render when visible is set to false', () => {
    const { container } = render(<Simple visible={false} />);
    expect(container.firstChild).not.toBeInTheDocument();
  });
});
