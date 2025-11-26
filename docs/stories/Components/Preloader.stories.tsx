import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Preloader from '../../../src/components/Preloader';
import Button from '../../../src/components/Button';

// Wrapper component to trigger preloader
const PreloaderWrapper = (args: any) => {
  const [showPreloader, setShowPreloader] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleStart = () => {
    setShowPreloader(true);
    setCompleted(false);
  };

  const handleComplete = () => {
    setShowPreloader(false);
    setCompleted(true);
  };

  return (
    <div className="p-8">
      {!showPreloader && (
        <div className="space-y-4">
          <Button
            variant="primary"
            label={completed ? 'Restart Preloader' : 'Start Preloader'}
            onClick={handleStart}
            bgColor="bg-goos-orange-600"
            textColor="text-white"
          />
          {completed && (
            <p className="text-goos-green-700 font-semibold">
              Preloader completed!
            </p>
          )}
        </div>
      )}

      {showPreloader && (
        <Preloader {...args} onComplete={handleComplete} />
      )}
    </div>
  );
};

const meta = {
  title: 'Components/Preloader',
  component: Preloader,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    videoUrl: {
      control: 'text',
      description: 'Optional video URL to preload',
    },
  },
} satisfies Meta<typeof Preloader>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Preloader - Loading screen with animations
 *
 * Features:
 * - **GOOS Logo**: Centered white logo on blue background
 * - **Background image**: Subtle ocean pattern (10% opacity)
 * - **Progress tracking**: Simulates loading (0-100%)
 * - **Mouse tracking** (desktop): Progress circle follows cursor smoothly
 * - **Mobile optimized**: Static progress text at bottom quarter
 * - **Video preloading**: Optional video URL to preload
 * - **GSAP animations**: Smooth entrance and exit transitions
 * - **Reduced motion**: Respects user preferences (skips animations)
 * - **Exit animation**: Logo fade-out and scale-up
 *
 * Behavior:
 * - Desktop: Progress circle (100px) follows mouse with smooth lerp
 * - Mobile: Static loading text with percentage at bottom
 * - Auto-completes when progress reaches 100%
 * - Calls onComplete callback when finished
 *
 * Use the controls to customize:
 * - Optional video URL to preload
 *
 * **Note**: Click "Start Preloader" to see the animation
 */
export const Default: Story = {
  render: (args) => <PreloaderWrapper {...args} />,
  args: {},
};

/**
 * With video preloading
 */
export const WithVideo: Story = {
  render: (args) => <PreloaderWrapper {...args} />,
  args: {
    videoUrl: '/videos/belbeoch.mp4',
  },
};
