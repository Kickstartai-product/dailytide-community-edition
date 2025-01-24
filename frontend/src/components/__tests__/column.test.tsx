import React from 'react';
import { render } from '@testing-library/react';
import { Column } from '@/components';
import { describe, it, expect } from '@jest/globals';

describe('Column component', () => {
  it('renders children', () => {
    const { getByText } = render(<Column>Test Content</Column>);
    const contentElement = getByText('Test Content');
    expect(contentElement).toBeInTheDocument();
  });

  it('applies size class when size prop is provided', () => {
    const { container } = render(<Column size="md">Test Content</Column>);
    expect(container.firstChild).toHaveClass('col-md');
  });

  it('applies additional style class when style prop is provided', () => {
    const { container } = render(
      <Column style="customStyle">Test Content</Column>,
    );
    expect(container.firstChild).toHaveClass('customStyle');
  });

  it('applies both size and style classes', () => {
    const { container } = render(
      <Column size="lg" style="customStyle">
        Test Content
      </Column>,
    );
    expect(container.firstChild).toHaveClass('col-lg');
    expect(container.firstChild).toHaveClass('customStyle');
  });
});
