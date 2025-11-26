import type { Meta, StoryObj } from '@storybook/react';
import LanguageSwitcher from '../../../src/components/LanguageSwitcher';

const meta = {
  title: 'Components/LanguageSwitcher',
  component: LanguageSwitcher,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional Tailwind classes for positioning/styling',
    },
  },
} satisfies Meta<typeof LanguageSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * LanguageSwitcher - Language selection buttons
 *
 * Features:
 * - **Three languages**: EN, ES, FR
 * - **i18n integration** using react-i18next
 * - **Orange buttons** with hover effects
 * - **Flexible positioning** via className
 *
 * Use the className prop to position:
 * - Fixed: `"fixed top-4 right-4 z-50"`
 * - Inline: `"flex gap-2"`
 * - Custom: Any Tailwind classes
 *
 * **Note**: Clicking buttons changes the application language globally
 */
export const Default: Story = {
  args: {
    className: 'flex gap-2',
  },
};

/**
 * Fixed position variant - typical usage in app
 */
export const FixedPosition: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    className: 'fixed top-4 right-4 z-50',
  },
};
