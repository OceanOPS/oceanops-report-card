import type { Meta, StoryObj } from '@storybook/react';
import ImageGallery from '../../../src/components/ImageGallery';

const meta = {
  title: '05. Components/Media/ImageGallery',
  component: ImageGallery,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    aspectRatio: {
      control: 'select',
      options: ['video', 'square', 'portrait', 'auto'],
      description: 'Aspect ratio for images',
    },
    objectFit: {
      control: 'select',
      options: ['cover', 'contain', 'fill'],
      description: 'How images should fit',
    },
    captionColor: {
      control: 'select',
      options: [
        'text-goos-blue-900', 'text-goos-blue-800', 'text-goos-gray-900', 'text-goos-gray-800', 'text-goos-gray-700',
      ],
      description: 'Caption text color',
    },
    arrowColor: {
      control: 'select',
      options: ['text-white', 'text-goos-blue-900', 'text-goos-gray-900'],
      description: 'Arrow icon color',
    },
    arrowBgColor: {
      control: 'select',
      options: [
        'bg-goos-blue-900', 'bg-goos-blue-800', 'bg-goos-blue-700', 'bg-goos-blue-600', 'bg-goos-blue-500',
        'bg-goos-cyan-700', 'bg-goos-cyan-600', 'bg-goos-orange-700', 'bg-goos-orange-600',
      ],
      description: 'Arrow button background color',
    },
    dotColor: {
      control: 'select',
      options: ['bg-gray-400', 'bg-gray-500', 'bg-white'],
      description: 'Inactive dot color',
    },
    activeDotColor: {
      control: 'select',
      options: [
        'bg-goos-orange-500', 'bg-goos-blue-500', 'bg-goos-cyan-500', 'bg-goos-green-500', 'bg-white',
      ],
      description: 'Active dot color',
    },
  },
} satisfies Meta<typeof ImageGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ImageGallery - Interactive image carousel
 *
 * Features:
 * - **Navigation arrows** with customizable colors
 * - **Dot indicators** (Instagram-style) showing current image
 * - **Crossfade transitions** between images
 * - **Optional captions** per image
 * - **Image preloading** for smooth navigation
 *
 * Use the controls to customize:
 * - Aspect ratio and fit mode
 * - Arrow and dot colors
 * - Caption colors
 *
 * **Note**: Navigation only appears with 2+ images
 */
export const Default: Story = {
  args: {
    images: [
      {
        src: '/images/climate1.webp',
        alt: 'Ocean observation equipment',
        caption: 'Advanced ocean monitoring technology in action'
      },
      {
        src: '/images/climate2.webp',
        alt: 'Marine data collection',
        caption: 'Scientists collecting critical ocean data'
      },
      {
        src: '/images/climate3.webp',
        alt: 'Research vessel',
        caption: 'Research vessel conducting ocean surveys'
      },
    ],
    aspectRatio: 'video',
    objectFit: 'cover',
    captionColor: 'text-goos-gray-800',
    arrowColor: 'text-white',
    arrowBgColor: 'bg-goos-blue-700',
    dotColor: 'bg-gray-400',
    activeDotColor: 'bg-goos-orange-500',
  },
};
