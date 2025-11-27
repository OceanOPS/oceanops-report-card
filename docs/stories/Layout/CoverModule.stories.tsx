import type { Meta, StoryObj } from '@storybook/react';
import CoverModule from '../../../src/components/CoverModule';

const meta = {
  title: 'Layout/CoverModule',
  component: CoverModule,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Full-screen cover component with title, year, logos, and customizable background media.

## Figma Design

<iframe
  style="border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 8px; margin-top: 20px; margin-bottom: 20px;"
  width="100%"
  height="450"
  src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/JdNQkdV9E6lLtXAY15GM1L/Goos-Report-Card?node-id=1330-821"
  allowfullscreen
></iframe>

**[→ Open in Figma](https://www.figma.com/design/JdNQkdV9E6lLtXAY15GM1L/Goos-Report-Card?node-id=1330-821&t=lyDcrmhzDWxp62H7-4)**

## Interactive Prototype

<iframe
  style="border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 8px; margin-top: 20px; margin-bottom: 20px;"
  width="100%"
  height="450"
  src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/proto/JdNQkdV9E6lLtXAY15GM1L/Goos-Report-Card?page-id=1237%3A5520&node-id=1237-5523&viewport=186%2C168%2C0.08&t=TBYkuIk7QmD2DPX5-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1237%3A5523"
  allowfullscreen
></iframe>

**[→ Open Prototype in Figma](https://www.figma.com/proto/JdNQkdV9E6lLtXAY15GM1L/Goos-Report-Card?page-id=1237%3A5520&node-id=1237-5523&viewport=186%2C168%2C0.08&t=TBYkuIk7QmD2DPX5-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1237%3A5523)**
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Main title text',
    },
    year: {
      control: 'text',
      description: 'Year to display',
    },
    yearColor: {
      control: 'select',
      options: [
        'text-white',
        'text-goos-blue-900', 'text-goos-blue-800', 'text-goos-blue-700', 'text-goos-blue-600', 'text-goos-blue-500', 'text-goos-blue-400', 'text-goos-blue-300', 'text-goos-blue-200', 'text-goos-blue-100',
        'text-goos-cyan-900', 'text-goos-cyan-800', 'text-goos-cyan-700', 'text-goos-cyan-600', 'text-goos-cyan-500', 'text-goos-cyan-400', 'text-goos-cyan-300', 'text-goos-cyan-200', 'text-goos-cyan-100',
        'text-goos-orange-900', 'text-goos-orange-800', 'text-goos-orange-700', 'text-goos-orange-600', 'text-goos-orange-500', 'text-goos-orange-400', 'text-goos-orange-300', 'text-goos-orange-200', 'text-goos-orange-100',
        'text-goos-green-900', 'text-goos-green-800', 'text-goos-green-700', 'text-goos-green-600', 'text-goos-green-500', 'text-goos-green-400', 'text-goos-green-300', 'text-goos-green-200', 'text-goos-green-100',
        'text-goos-gray-900', 'text-goos-gray-800', 'text-goos-gray-700', 'text-goos-gray-600', 'text-goos-gray-500', 'text-goos-gray-400', 'text-goos-gray-300', 'text-goos-gray-200', 'text-goos-gray-100',
      ],
      description: 'Text color for year',
    },
    backgroundColor: {
      control: 'select',
      options: [
        'bg-goos-blue-900', 'bg-goos-blue-800', 'bg-goos-blue-700', 'bg-goos-blue-600', 'bg-goos-blue-500', 'bg-goos-blue-400', 'bg-goos-blue-300', 'bg-goos-blue-200', 'bg-goos-blue-100',
        'bg-goos-cyan-900', 'bg-goos-cyan-800', 'bg-goos-cyan-700', 'bg-goos-cyan-600', 'bg-goos-cyan-500', 'bg-goos-cyan-400', 'bg-goos-cyan-300', 'bg-goos-cyan-200', 'bg-goos-cyan-100',
        'bg-goos-orange-900', 'bg-goos-orange-800', 'bg-goos-orange-700', 'bg-goos-orange-600', 'bg-goos-orange-500', 'bg-goos-orange-400', 'bg-goos-orange-300', 'bg-goos-orange-200', 'bg-goos-orange-100',
        'bg-goos-green-900', 'bg-goos-green-800', 'bg-goos-green-700', 'bg-goos-green-600', 'bg-goos-green-500', 'bg-goos-green-400', 'bg-goos-green-300', 'bg-goos-green-200', 'bg-goos-green-100',
        'bg-goos-gray-900', 'bg-goos-gray-800', 'bg-goos-gray-700', 'bg-goos-gray-600', 'bg-goos-gray-500', 'bg-goos-gray-400', 'bg-goos-gray-300', 'bg-goos-gray-200', 'bg-goos-gray-100',
      ],
      description: 'GOOS background color',
    },
    backgroundMedia: {
      control: 'text',
      description: 'URL for background image or video',
    },
    mediaType: {
      control: 'select',
      options: ['image', 'video'],
      description: 'Type of background media',
    },
    backgroundOpacity: {
      control: { type: 'range', min: 0, max: 100, step: 5 },
      description: 'Opacity of background media (0-100)',
    },
    backgroundPosition: {
      control: 'select',
      options: ['center', 'top', 'bottom', 'left', 'right', 'top left', 'top right', 'bottom left', 'bottom right', '75% 50%'],
      description: 'CSS object-position for background',
    },
    backgroundSize: {
      control: 'select',
      options: ['cover', 'contain', 'fill', '50%', '80% auto', '100%'],
      description: 'CSS object-fit for background',
    },
    backgroundBlendMode: {
      control: 'select',
      options: ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'],
      description: 'CSS mix-blend-mode for background',
    },
    goosLogoVariant: {
      control: 'select',
      options: ['white', 'color'],
      description: 'Color variant for GOOS logo',
    },
    partnerLogosVariant: {
      control: 'select',
      options: ['white', 'color'],
      description: 'Color variant for partner logos',
    },
    startAnimation: {
      control: 'boolean',
      description: 'Enable entrance animations',
    },
  },
  args: {
    title: 'Report Card',
    year: '2025',
    yearColor: 'text-goos-orange-500',
    backgroundColor: 'bg-goos-blue-900',
    backgroundMedia: '/images/climate1.webp',
    backgroundOpacity: 40,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundBlendMode: 'multiply',
    mediaType: 'image',
    goosLogoVariant: 'white',
    partnerLogosVariant: 'white',
    startAnimation: true,
  },
} satisfies Meta<typeof CoverModule>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * CoverModule - Full-screen cover layout
 *
 * A complete layout component that combines:
 * - **GOOS Logo** (top)
 * - **Title and Year** (center)
 * - **Partner Logos** (bottom)
 * - **Background media** with customizable opacity, position, and blend modes
 *
 * Use the controls to customize:
 * - Text content and colors
 * - Background color from GOOS palette
 * - Background media (image/video URL)
 * - Media opacity, position, and blend mode
 * - Logo variants (white/color)
 *
 * **Note**: Entrance animations are enabled by default.
 * Toggle `startAnimation` control to disable them for easier customization.
 */
export const Default: Story = {
  args: {
    title: 'Report Card',
    year: '2025',
    yearColor: 'text-goos-orange-500',
    backgroundColor: 'bg-goos-blue-900',
    backgroundMedia: '/images/climate1.webp',
    backgroundOpacity: 40,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundBlendMode: 'multiply',
    mediaType: 'image',
    goosLogoVariant: 'white',
    partnerLogosVariant: 'white',
    startAnimation: true,
  },
};
