import { Meta, StoryObj } from '@storybook/react';
import { ThemeContextProvider } from '@/contexts/themeContext';
import { Roboto } from 'next/font/google';
import { ReduxProvider, AuthenticationProvider, ReactQueryProvider } from '@/providers';
import CustomNavBar from './index';

const meta: Meta<typeof CustomNavBar> = {
  title: 'CustomNavBar',
  argTypes: {},
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};
export default meta;

type Story = StoryObj<typeof CustomNavBar>;

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-roboto',
});

export const Component: Story = ({}) => (
  <AuthenticationProvider>
    <ThemeContextProvider>
      <ReduxProvider>
        <ReactQueryProvider>
          <CustomNavBar />
        </ReactQueryProvider>
      </ReduxProvider>
    </ThemeContextProvider>
  </AuthenticationProvider>
);
Component.args = {};
