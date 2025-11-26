import type { Meta, StoryObj } from '@storybook/react';
import VideoModal from '../../../src/components/VideoModal';

const meta = {
  title: 'Components/VideoModal',
  component: VideoModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    videoType: {
      control: 'select',
      options: ['youtube', 'local'],
      description: 'Type of video',
    },
    videoId: {
      control: 'text',
      description: 'YouTube video ID or local video URL',
    },
    previewImage: {
      control: 'text',
      description: 'Preview/thumbnail image URL',
    },
    previewAlt: {
      control: 'text',
      description: 'Alt text for preview image',
    },
    caption: {
      control: 'text',
      description: 'Optional caption below preview',
    },
    aspectRatio: {
      control: 'select',
      options: ['video', 'square', 'portrait'],
      description: 'Preview image aspect ratio',
    },
    playButtonColor: {
      control: 'select',
      options: [
        'bg-goos-blue-500', 'bg-goos-cyan-500', 'bg-goos-orange-500', 'bg-goos-green-500',
      ],
      description: 'Play button background color',
    },
    captionColor: {
      control: 'select',
      options: [
        'text-goos-gray-900', 'text-goos-gray-800', 'text-goos-gray-700',
        'text-goos-blue-900', 'text-white',
      ],
      description: 'Caption text color',
    },
  },
} satisfies Meta<typeof VideoModal>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * VideoModal - Video preview with modal player
 *
 * Features:
 * - **Preview image** with play button overlay
 * - **Two video types**: YouTube embed or local video file
 * - **Plyr player**: Professional video player with controls
 * - **Modal display**: Opens in full modal overlay
 * - **Auto-stop**: Stops video when modal closes
 * - **GSAP animations**: Smooth modal fade-in/scale-up
 * - **Three aspect ratios**: Video (16:9), square, or portrait
 * - **Optional caption** below preview
 *
 * Use the controls to customize:
 * - Video type and ID
 * - Preview image and aspect ratio
 * - Play button color
 * - Caption text and color
 *
 * **Note**: Click the preview image to open video modal
 */
export const LocalVideo: Story = {
  args: {
    videoType: 'local',
    videoId: '/videos/belbeoch.mp4',
    previewImage: '/images/climate1.webp',
    previewAlt: 'Ocean research video preview',
    caption: 'Watch the full presentation on ocean monitoring systems',
    aspectRatio: 'video',
    playButtonColor: 'bg-goos-orange-500',
    captionColor: 'text-goos-gray-800',
  },
};

/**
 * YouTube video variant
 */
export const YouTubeVideo: Story = {
  args: {
    videoType: 'youtube',
    videoId: 'dQw4w9WgXcQ',
    previewImage: '/images/climate2.webp',
    previewAlt: 'YouTube video preview',
    caption: 'Learn about global ocean observing systems',
    aspectRatio: 'video',
    playButtonColor: 'bg-goos-cyan-500',
    captionColor: 'text-goos-blue-900',
  },
};

/**
 * Square aspect ratio variant
 */
export const SquarePreview: Story = {
  args: {
    videoType: 'local',
    videoId: '/videos/belbeoch.mp4',
    previewImage: '/images/operational1.webp',
    previewAlt: 'Square video preview',
    aspectRatio: 'square',
    playButtonColor: 'bg-goos-blue-500',
  },
};
