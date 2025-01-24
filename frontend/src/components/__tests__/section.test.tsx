import React from 'react';
import { render } from '@testing-library/react';
import { Section } from '@/components';
import { describe, it, expect } from '@jest/globals';

describe('Section component', () => {
  it('renders children', () => {
    const { getByText } = render(<Section>Test Section</Section>);
    const sectionElement = getByText('Test Section');
    expect(sectionElement).toBeInTheDocument();
  });

  it('applies style and id props', () => {
    const { container } = render(
      <Section style="custom-style" id="test-id">
        Test Section
      </Section>,
    );
    const sectionElement = container.firstChild;

    expect(sectionElement).toHaveClass('section');
    expect(sectionElement).toHaveClass('custom-style');
    expect(sectionElement).toHaveAttribute('id', 'test-id');
  });
});
