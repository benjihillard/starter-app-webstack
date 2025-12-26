import type { Meta, StoryObj } from '@storybook/react-vite';
import Counter from './Counter';

const meta: Meta<typeof Counter> = {
  title: 'Features/Counter',
  component: Counter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Counter>;

export const Default: Story = {};
