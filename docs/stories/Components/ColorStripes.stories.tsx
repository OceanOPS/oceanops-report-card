import type { Meta, StoryObj } from '@storybook/react';
import ColorStripes from '../../../src/components/ColorStripes';

const meta = {
  title: 'Components/ColorStripes',
  component: ColorStripes,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    stripeColors: {
      control: 'object',
      description: 'Array of Tailwind background color classes for each stripe',
    },
    stripeHeight: {
      control: 'text',
      description: 'Custom height (e.g., "100vh", "500px"). Defaults to 100vh',
    },
    deliveryAreas: {
      control: 'object',
      description: 'Array of delivery area objects with icon, text, and section IDs',
    },
    className: {
      control: 'text',
      description: 'Additional Tailwind classes',
    },
  },
} satisfies Meta<typeof ColorStripes>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ColorStripes - Animated delivery area navigation
 *
 * Features:
 * - **Animated stripes** with GSAP ScrollTrigger entrance/exit
 * - **Clickable navigation** to different sections
 * - **Delivery area icons** with text labels
 * - **Hover effects** on stripes
 * - **Responsive sizing** for icons and text
 *
 * Use the controls to customize:
 * - Stripe colors (array of bg-* classes)
 * - Delivery areas (icons, text keys, section IDs)
 * - Custom height
 *
 * **Note**: Animations trigger on scroll (limited in Storybook)
 */
export const Default: Story = {
  args: {
    stripeColors: [
      'bg-goos-cyan-700',
      'bg-goos-orange-700',
      'bg-goos-blue-700',
    ],
    deliveryAreas: [
      {
        iconSrc: '/icons/climate.png',
        iconAlt: 'Climate',
        textKey: 'Climate & Ocean Circulation',
        sectionId: 'amoc-section',
      },
      {
        iconSrc: '/icons/operational_services.png',
        iconAlt: 'Operational Services',
        textKey: 'Operational Services',
        sectionId: 'elnino-section',
      },
      {
        iconSrc: '/icons/ocean_health.png',
        iconAlt: 'Ocean Health',
        textKey: 'Ocean Health',
        sectionId: 'oceanhealth-section',
      },
    ],
    stripeHeight: '100vh',
  },
};
