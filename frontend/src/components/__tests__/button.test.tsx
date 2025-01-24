import { render, fireEvent } from '@testing-library/react';
import Button from '../Button';
import ThemeContext from '@/contexts/themeContext';
import { describe, it, expect } from '@jest/globals';

const mockValue = {
  isDarkTheme: true,
  toggleThemeHandler: jest.fn(),
};

describe('Button Component', () => {
  it('renders text correctly', () => {
    const { getByText } = render(<Button text="Click Me" />);
    expect(getByText('Click Me')).toBeInTheDocument();
  });

  it('applies style correctly', () => {
    const { getByText } = render(<Button text="Styled Button" style="customStyle" />);
    const button = getByText('Styled Button');
    expect(button).toHaveClass('customStyle');
  });

  it('renders image when img prop is provided', () => {
    const { getByAltText } = render(<Button />);
    const image = getByAltText('Image Alt Text');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/_next/image?url=%2Fimages%2FKickstartAI.png&w=16&q=75');
  });

  it('triggers onClick event when button is clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Button text="Clickable Button" onClick={handleClick} />);
    const button = getByText('Clickable Button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies dark theme class based on ThemeContext', () => {
    const { container } = render(
      <ThemeContext.Provider value={mockValue}>
        <Button text="Themed Button" />
      </ThemeContext.Provider>,
    );
    const button = container.querySelector('.button.dark');
    expect(button).toBeInTheDocument();
  });
});
