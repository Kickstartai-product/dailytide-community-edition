'use client';
import React from 'react';
import { StoryObj, Meta } from '@storybook/react';
import ProfileDetailPopup, { ProfileDetailPopupProps } from './index';

const meta: Meta<typeof ProfileDetailPopup> = {
  title: 'ProfileDetailPopup',
  argTypes: {
    name: {
      control: 'text',
    },
    email: {
      control: 'text',
    },
  },
};
export default meta;

type Story = StoryObj<typeof ProfileDetailPopup>;

export const Component: Story = ({ name, email }: ProfileDetailPopupProps) => (
  <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
    <ProfileDetailPopup name={name} email={email} />
  </div>
);

Component.args = {
  name: 'John Doe',
  email: 'johndoe@gmail.com',
};
