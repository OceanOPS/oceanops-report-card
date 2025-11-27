import type { Meta, StoryObj } from '@storybook/react';
import ImageCaption from '../../../src/components/ImageCaption';

const meta = {
  title: '05. Components/Media/ImageCaption',
  component: ImageCaption,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Single image with optional caption and customizable aspect ratio.

## Figma Design

<iframe
  style="border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 8px; margin-top: 20px; margin-bottom: 20px;"
  width="100%"
  height="450"
  src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/JdNQkdV9E6lLtXAY15GM1L/Goos-Report-Card?node-id=1596-2100"
  allowfullscreen
></iframe>

**[→ Open in Figma](https://www.figma.com/design/JdNQkdV9E6lLtXAY15GM1L/Goos-Report-Card?node-id=1596-2100&t=lyDcrmhzDWxp62H7-4)**
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'Image source URL',
    },
    alt: {
      control: 'text',
      description: 'Alt text for image',
    },
    caption: {
      control: 'text',
      description: 'Caption text (credits, description)',
    },
    aspectRatio: {
      control: 'select',
      options: ['video', 'square', 'portrait', 'auto'],
      description: 'Aspect ratio for image container',
    },
    objectFit: {
      control: 'select',
      options: ['cover', 'contain', 'fill'],
      description: 'How image should fit in container',
    },
    captionColor: {
      control: 'select',
      options: [
        'text-goos-blue-900', 'text-goos-blue-800', 'text-goos-blue-700', 'text-goos-blue-600', 'text-goos-blue-500',
        'text-goos-cyan-900', 'text-goos-cyan-800', 'text-goos-cyan-700', 'text-goos-cyan-600', 'text-goos-cyan-500',
        'text-goos-orange-900', 'text-goos-orange-800', 'text-goos-orange-700', 'text-goos-orange-600', 'text-goos-orange-500',
        'text-goos-green-900', 'text-goos-green-800', 'text-goos-green-700', 'text-goos-green-600', 'text-goos-green-500',
        'text-goos-gray-900', 'text-goos-gray-800', 'text-goos-gray-700', 'text-goos-gray-600', 'text-goos-gray-500',
      ],
      description: 'Text color for caption',
    },
  },
  args: {
    src: '/images/climate1.webp',
    alt: 'Ocean research vessel',
    caption: 'Photo by Ocean Institute',
    aspectRatio: 'video',
    objectFit: 'cover',
    captionColor: 'text-goos-gray-800',
  },
} satisfies Meta<typeof ImageCaption>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ImageCaption - Image with optional caption
 *
 * Flexible image component with:
 * - **Aspect ratios**: video (16:9), square (1:1), portrait (3:4), auto
 * - **Object fit**: cover, contain, fill
 * - **Optional caption** for credits or descriptions
 *
 * Use the controls to customize:
 * - Image source URL
 * - Aspect ratio and fit mode
 * - Caption text and color
 */
export const Default: Story = {
  args: {
    src: '/images/climate1.webp',
    alt: 'Ocean research vessel',
    caption: 'Photo by Ocean Institute',
    aspectRatio: 'video',
    objectFit: 'cover',
    captionColor: 'text-goos-gray-800',
  },
};
