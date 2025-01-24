'use client';
import React from 'react';
import { StoryObj, Meta } from '@storybook/react';
import AuthProviderButton, { AuthProviderButtonProps } from './index';

const meta: Meta<typeof AuthProviderButton> = {
  title: 'AuthProviderButton',
  argTypes: {
    id: { control: 'text' },
    name: { control: 'text' },
    icon: { control: 'text' },
    onClick: { action: 'clicked' },
  },
};
export default meta;

type Story = StoryObj<typeof AuthProviderButton>;

export const Component: Story = ({ id, name, icon, onClick }: AuthProviderButtonProps) => (
  <AuthProviderButton id={id} name={name} icon={icon} onClick={onClick} />
);

Component.args = {
  id: 'google',
  name: 'Login with Google',
  icon: '/icons/brands/google.png',
  // eslint-disable-next-line no-console
  onClick: () => console.log('clicked'),
};
