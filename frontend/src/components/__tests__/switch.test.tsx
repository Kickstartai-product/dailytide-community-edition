import React from 'react';
import { render, fireEvent, getByRole } from '@testing-library/react';
import { Switch } from '@/components';
import { describe, it, expect } from '@jest/globals';

describe('Switch component', () => {
  it('renders with label', () => {
    const { container } = render(<Switch label="Toggle" />);
    const switchElement = container.querySelector('.form-check-label');
    expect(switchElement).toHaveTextContent('Toggle');
    expect(switchElement).toBeInTheDocument();
  });

  it('renders with custom size and style', () => {
    const { container } = render(<Switch size="lg" style="custom-style" />);
    const switchElement = container.querySelector('.custom-style');

    expect(switchElement).toHaveClass('switch-lg');
    expect(switchElement).toHaveClass('custom-style');
  });

  it('calls onChange when clicked', () => {
    const handleChange = jest.fn();
    const { container } = render(
      <Switch label="Toggle" onChange={handleChange} />,
    );
    const switchElement = container.querySelector(
      '.form-check-input',
    ) as HTMLInputElement;

    fireEvent.click(switchElement);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('renders checked and disabled states', () => {
    const { container } = render(<Switch label="Toggle" checked disabled />);
    const switchElement = container.querySelector('.form-check-input');

    expect(switchElement).toBeChecked();
    expect(switchElement).toBeDisabled();
  });
});
