import { Meta, StoryObj } from '@storybook/react';
import Footer from './index';

const meta: Meta<typeof Footer> = {
  title: 'Footer',
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Footer>;

export const Component: Story = ({}) => <Footer />;

Component.args = {};
