import type { Meta, StoryObj } from '@storybook/react';
import ImageGrid from '../../../src/components/ImageGrid';

const meta = {
  title: 'Components/Media/ImageGrid',
  component: ImageGrid,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Flexible image grid with configurable columns and seamless layout.

## Figma Design

<iframe
  style="border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 8px; margin-top: 20px; margin-bottom: 20px;"
  width="100%"
  height="450"
  src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/JdNQkdV9E6lLtXAY15GM1L/Goos-Report-Card?node-id=1417-2457"
  allowfullscreen
></iframe>

**[→ Open in Figma](https://www.figma.com/design/JdNQkdV9E6lLtXAY15GM1L/Goos-Report-Card?node-id=1417-2457&t=lyDcrmhzDWxp62H7-4)**
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    images: {
      control: 'object',
      description: 'Array of image objects with src and alt text',
    },
    columns: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
      description: 'Number of columns (1-6)',
    },
    backgroundColor: {
      control: 'select',
      options: [
        'bg-goos-blue-100', 'bg-goos-blue-200', 'bg-goos-blue-300', 'bg-goos-blue-400', 'bg-goos-blue-500',
        'bg-goos-blue-600', 'bg-goos-blue-700', 'bg-goos-blue-800', 'bg-goos-blue-900',
        'bg-goos-cyan-100', 'bg-goos-cyan-200', 'bg-goos-cyan-300', 'bg-goos-cyan-400', 'bg-goos-cyan-500',
        'bg-goos-cyan-600', 'bg-goos-cyan-700', 'bg-goos-cyan-800', 'bg-goos-cyan-900',
        'bg-goos-orange-100', 'bg-goos-orange-200', 'bg-goos-orange-300', 'bg-goos-orange-400', 'bg-goos-orange-500',
        'bg-goos-orange-600', 'bg-goos-orange-700', 'bg-goos-orange-800', 'bg-goos-orange-900',
        'bg-goos-green-100', 'bg-goos-green-200', 'bg-goos-green-300', 'bg-goos-green-400', 'bg-goos-green-500',
        'bg-goos-green-600', 'bg-goos-green-700', 'bg-goos-green-800', 'bg-goos-green-900',
        'bg-goos-gray-100', 'bg-goos-gray-200', 'bg-goos-gray-300', 'bg-goos-gray-400', 'bg-goos-gray-500',
        'bg-goos-gray-600', 'bg-goos-gray-700', 'bg-goos-gray-800', 'bg-goos-gray-900',
        'bg-white',
      ],
      description: 'Background color',
    },
    className: {
      control: 'text',
      description: 'Additional Tailwind classes',
    },
  },
} satisfies Meta<typeof ImageGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ImageGrid - Flexible image grid
 *
 * Features:
 * - **Configurable columns** (1-6)
 * - **Square aspect ratio** for all images
 * - **No gaps** between images (seamless)
 * - **Responsive** layout
 * - **Object-fit cover** to fill containers
 *
 * Use the controls to customize:
 * - Number of columns
 * - Images array
 * - Background color from GOOS palette
 */
export const Default: Story = {
  args: {
    columns: 3,
    images: [
      { src: '/images/climate1.webp', alt: 'Ocean research vessel' },
      { src: '/images/climate2.webp', alt: 'Ocean waves' },
      { src: '/images/climate3.webp', alt: 'Marine ecosystem' },
      { src: '/images/operational1.webp', alt: 'Data collection' },
      { src: '/images/operational2.webp', alt: 'Ocean monitoring' },
      { src: '/images/operational3.webp', alt: 'Research platform' },
    ],
    backgroundColor: 'bg-white',
  },
};
