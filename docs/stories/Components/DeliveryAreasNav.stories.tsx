import type { Meta, StoryObj } from '@storybook/react';
import DeliveryAreasNav from '../../../src/components/DeliveryAreasNav';

const meta = {
  title: 'Components/DeliveryAreasNav',
  component: DeliveryAreasNav,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DeliveryAreasNav>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * DeliveryAreasNav - Fixed navigation bar for delivery areas
 *
 * Features:
 * - **Fixed positioning** at top of page (100% width)
 * - **Three delivery areas**: Climate, Operational Services, Ocean Health
 * - **Active section highlighting** (cyan-200 background)
 * - **Smooth scroll navigation** to corresponding sections
 * - **Responsive layout** (column on mobile, row on larger screens)
 * - **Icon + text** for each area
 *
 * Behavior:
 * - Only visible when viewing AMOC, El Niño, or Ocean Health sections
 * - Highlights current section based on scroll position
 * - Click to navigate to specific section
 *
 * **Note**: In Storybook, nav is always visible. In production, visibility is scroll-based.
 */
export const Default: Story = {
  args: {},
};
