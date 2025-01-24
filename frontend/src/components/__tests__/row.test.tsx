import React from 'react';
import { render } from '@testing-library/react';
import { Row } from '@/components';
import { describe, it, expect } from '@jest/globals';

describe('Row component', () => {
  it('renders children', () => {
    const { getByText } = render(<Row>Test Row</Row>);
    const rowElement = getByText('Test Row');
    expect(rowElement).toBeInTheDocument();
  });

  it('applies size and style classNames', () => {
    const { container } = render(
      <Row size="large" style="custom-style">
        Test Row
      </Row>,
    );
    const rowElement = container.firstChild;

    expect(rowElement).toHaveClass('row');
    expect(rowElement).toHaveClass('row-large');
    expect(rowElement).toHaveClass('custom-style');
  });
});
