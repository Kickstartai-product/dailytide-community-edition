import { Meta, StoryObj } from '@storybook/react';
import Title, { TitleProps } from './index';

const meta: Meta<typeof Title> = {
  title: 'Title',
  argTypes: {
    tagType: {
      control: {
        type: 'select',
      },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    emphasis: {
      control: {
        type: 'select',
      },
      options: ['normal', 'section', 'uppercase'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Title>;

export const NormalEmphasis: Story = ({ children, tagType, emphasis }: TitleProps) => (
  <Title tagType={tagType} emphasis={emphasis}>
    {children}
  </Title>
);

NormalEmphasis.args = {
  tagType: 'h1',
  emphasis: 'normal',
  children: 'Tide of February 25',
};

export const SectionEmphasis: Story = ({ children, tagType, emphasis }: TitleProps) => (
  <Title tagType={tagType} emphasis={emphasis}>
    {children}
  </Title>
);

SectionEmphasis.args = {
  tagType: 'h1',
  emphasis: 'section',
  children: 'Tide of February 25',
};

export const UppercaseEmphasis: Story = ({ children, tagType, emphasis }: TitleProps) => (
  <Title tagType={tagType} emphasis={emphasis}>
    {children}
  </Title>
);

UppercaseEmphasis.args = {
  tagType: 'h1',
  emphasis: 'uppercase',
  children: 'Tide of February 25',
};
