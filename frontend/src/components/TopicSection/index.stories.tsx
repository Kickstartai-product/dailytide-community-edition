'use client';
import React from 'react';
import { StoryObj, Meta } from '@storybook/react';
import TopicSection, { TopicSectionProps } from './index';

const meta: Meta<typeof TopicSection> = {
  title: 'TopicSection',
  argTypes: {
    date: { control: 'text' },
    articleAmount: { control: 'number' },
  },
};
export default meta;

type Story = StoryObj<typeof TopicSection>;

export const Component: Story = ({ date, articleAmount }: TopicSectionProps) => (
  <TopicSection date={date} articleAmount={articleAmount} />
);

Component.args = {
  date: 'March 25',
  articleAmount: 0,
};
