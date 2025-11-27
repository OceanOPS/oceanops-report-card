import type { Meta, StoryObj } from '@storybook/react';
import MenuSidebar from '@/components/MenuSidebar';

const meta = {
  title: 'Components/Interactive/MenuSidebar',
  component: MenuSidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    menuItems: {
      control: 'object',
      description: 'Array of menu items with title keys and accent colors',
    },
  },
} satisfies Meta<typeof MenuSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * MenuSidebar - Slide-in navigation menu
 *
 * Features:
 * - **Slide-in animation**: Opens from right side with GSAP
 * - **Language selector**: EN, ES, FR buttons
 * - **Navigation items**: Sections with colored accent bars
 * - **Smooth scrolling**: Auto-scrolls to sections on click
 * - **Download button**: Link to download report
 * - **Social links**: Twitter and Email icons
 * - **ESC key support**: Close with Escape key
 * - **Backdrop click**: Close by clicking outside
 * - **Hamburger toggle**: Opens/closes menu
 * - **Past reports**: Collapsible section for archives
 *
 * Use the controls to customize:
 * - Menu items (sections with colors)
 *
 * **Note**: Click the hamburger icon (floating globe on the right) to open the sidebar.
 */
export const Default: Story = {
  args: {
    menuItems: [
      { id: 'introduction-section', titleKey: 'Introduction', accentColor: 'bg-goos-orange-500' },
      { id: 'networks-section', titleKey: 'Ocean Observing Networks', accentColor: 'bg-goos-cyan-500' },
      { id: 'satellite-section', titleKey: 'Satellite Observations', accentColor: 'bg-goos-blue-500' },
      { id: 'partners-section', titleKey: 'Partner Countries', accentColor: 'bg-goos-green-500' },
      { id: 'conclusion-section', titleKey: 'Looking Forward', accentColor: 'bg-goos-orange-700' },
    ],
  },
};
