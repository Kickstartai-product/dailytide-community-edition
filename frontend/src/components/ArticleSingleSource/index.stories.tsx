'use client';
import React from 'react';
import { StoryObj, Meta } from '@storybook/react';
import { ReduxProvider } from '@/providers';
import ArticleSingleSource, { ArticleSingleSourceProps } from './index';

const meta: Meta<typeof ArticleSingleSource> = {
  title: 'ArticleSingleSource',
  argTypes: {
    source: {
      control: {
        type: 'text',
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof ArticleSingleSource>;

export const Component: Story = ({ source }: ArticleSingleSourceProps) => (
  <ReduxProvider>
    <ArticleSingleSource source={source} />
  </ReduxProvider>
);

Component.args = {
  source: {
    _id: '1',
    source_name: 'News',
    title: 'The difference between artificial intelligence and machine learning and why it matters',
    link: 'https://breakingdefense.com/2024/03/the-difference-between-artificial-intelligence-and-machine-learning-and-why-it-matters/',
  },
};
