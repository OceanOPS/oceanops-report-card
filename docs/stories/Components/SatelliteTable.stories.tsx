import type { Meta, StoryObj } from '@storybook/react';
import SatelliteTable from '../../../src/components/SatelliteTable';

const meta = {
  title: '05. Components/Data/SatelliteTable',
  component: SatelliteTable,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SatelliteTable>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * SatelliteTable - Satellite observations timeline
 *
 * Features:
 * - **Timeline visualization** (1990-2030)
 * - **7 essential variables**: Sea Ice, Ocean Color, Sea Level, SST, SSS, Sea State, Wind
 * - **Gradient bars** showing adequacy levels (adequate, marginal, inadequate)
 * - **2025 marker line** (current position)
 * - **Responsive design**: Table on desktop, cards on mobile
 * - **Animated entrance** with GSAP (bars grow on scroll)
 * - **Modal with details** for each variable with collapsible sections
 * - **Color legend** (orange-500 = adequate, orange-300 = marginal, orange-100 = inadequate)
 *
 * This component has no configurable props - it displays hardcoded satellite observation data
 * from translations. The table shows the historical and projected adequacy of satellite
 * measurements for essential ocean and climate variables.
 *
 * **Note**: Timeline animations trigger on scroll (limited in Storybook)
 */
export const Default: Story = {
  args: {},
};
