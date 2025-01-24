'use client';
import React from 'react';
import { StoryObj, Meta } from '@storybook/react';
import PasswordMeter, { PasswordMeterProps } from './index';

const meta: Meta<typeof PasswordMeter> = {
  title: 'PasswordMeter',
  argTypes: {
    password: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof PasswordMeter>;

function logPasswordRequirementsStatus(hasMetRequirements: boolean) {
  // eslint-disable-next-line no-console
  console.log(hasMetRequirements);
}

export const Component: Story = ({ password }: PasswordMeterProps) => (
  <PasswordMeter password={password} requirementsStatus={(status) => logPasswordRequirementsStatus(status)} />
);

Component.args = {
  password: 'Ol2.c3@4FF',
};
