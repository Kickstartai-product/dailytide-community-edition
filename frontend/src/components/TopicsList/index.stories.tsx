'use client';
import { Suspense } from 'react';
import { StoryObj, Meta } from '@storybook/react';
import { ThemeContextProvider } from '@/contexts/themeContext';
import { ReactQueryProvider, ReduxProvider, AuthenticationProvider } from '@/providers';
import TopicsList from './index';

const meta: Meta<typeof TopicsList> = {
  title: 'TopicsList',
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof TopicsList>;

export const Component: Story = () => (
  <AuthenticationProvider>
    <ThemeContextProvider>
      <ReduxProvider>
        <ReactQueryProvider>
          <Suspense fallback={<>Loading component.</>}>
            <TopicsList />
          </Suspense>
        </ReactQueryProvider>
      </ReduxProvider>
    </ThemeContextProvider>
  </AuthenticationProvider>
);

Component.args = {};
