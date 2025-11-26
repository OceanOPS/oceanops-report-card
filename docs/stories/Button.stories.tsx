import type { Meta, StoryObj } from '@storybook/react';
import Button from '../../src/components/Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LinkButton: Story = {
  args: {
    variant: 'link',
    label: 'Visit Website',
    url: 'https://www.goosocean.org',
    bgColor: 'bg-goos-orange-500',
    textColor: 'text-white',
    iconBgColor: 'bg-white',
    iconColor: 'text-goos-orange-500',
  },
};

export const BlueButton: Story = {
  args: {
    variant: 'link',
    label: 'Learn More',
    url: 'https://example.com',
    bgColor: 'bg-goos-blue-700',
    textColor: 'text-white',
    iconBgColor: 'bg-goos-orange-500',
    iconColor: 'text-white',
  },
};
