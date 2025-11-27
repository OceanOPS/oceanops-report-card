import type { Meta, StoryObj } from '@storybook/react';
import QuoteWithImage from '../../../src/components/QuoteWithImage';

const meta = {
  title: 'Components/Content/QuoteWithImage',
  component: QuoteWithImage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    quote: {
      control: 'text',
      description: 'Quote text content',
    },
    authorName: {
      control: 'text',
      description: 'Author name',
    },
    authorTitle: {
      control: 'text',
      description: 'Author title/position',
    },
    imageSrc: {
      control: 'text',
      description: 'Image URL (optional)',
    },
    imageAlt: {
      control: 'text',
      description: 'Image alt text',
    },
    imagePosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Image position',
    },
    height: {
      control: 'select',
      options: ['fullscreen', 'auto'],
      description: 'Height mode',
    },
    logoSrc: {
      control: 'text',
      description: 'Logo URL (optional)',
    },
    showIcon: {
      control: 'boolean',
      description: 'Show quote icon',
    },
    backgroundColor: {
      control: 'select',
      options: [
        'bg-white', 'bg-goos-gray-100',
        'bg-goos-blue-900', 'bg-goos-blue-800', 'bg-goos-blue-700',
        'bg-goos-cyan-700', 'bg-goos-orange-700',
      ],
      description: 'Quote section background',
    },
    quoteColor: {
      control: 'select',
      options: [
        'text-white', 'text-goos-blue-900', 'text-goos-blue-800', 'text-goos-blue-700',
      ],
      description: 'Quote text color',
    },
    authorColor: {
      control: 'select',
      options: [
        'text-white', 'text-goos-blue-900', 'text-goos-blue-800', 'text-goos-gray-700',
      ],
      description: 'Author text color',
    },
    iconColor: {
      control: 'select',
      options: [
        'fill-goos-orange-500', 'fill-goos-blue-500', 'fill-goos-cyan-500', 'fill-white',
      ],
      description: 'Quote icon color',
    },
  },
} satisfies Meta<typeof QuoteWithImage>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * QuoteWithImage - Full-width quote with image
 *
 * Features:
 * - **Two-column layout** (50/50 split)
 * - **Image positioning** (left or right)
 * - **Height modes**: fullscreen or auto
 * - **Optional logo** below author
 * - **Quote icon** with customizable color
 * - **Responsive** layout (stacks on mobile)
 *
 * Use the controls to customize:
 * - Quote text and author
 * - Image position and URL
 * - All colors from GOOS palette
 * - Height mode
 */
export const Default: Story = {
  args: {
    quote: 'In the face of climate change, ocean observing is more important than ever. Our global network of observations helps us understand and protect our planet.',
    authorName: 'Dr. Marine Scientist',
    authorTitle: 'OceanOPS Manager',
    imageSrc: '/images/climate1.webp',
    imageAlt: 'Ocean research vessel',
    imagePosition: 'left',
    height: 'auto',
    showIcon: true,
    backgroundColor: 'bg-white',
    quoteColor: 'text-goos-blue-700',
    authorColor: 'text-goos-blue-700',
    iconColor: 'fill-goos-orange-500',
  },
};

/**
 * Dark variant with image on right
 */
export const DarkVariant: Story = {
  args: {
    quote: 'The ocean connects us all. Understanding its complexities is essential for our future.',
    authorName: 'Jane Smith',
    authorTitle: 'Climate Research Lead',
    imageSrc: '/images/climate2.webp',
    imageAlt: 'Ocean waves',
    imagePosition: 'right',
    height: 'auto',
    showIcon: true,
    backgroundColor: 'bg-goos-blue-900',
    quoteColor: 'text-white',
    authorColor: 'text-white',
    iconColor: 'fill-goos-orange-500',
  },
};

/**
 * Without image - full width
 */
export const NoImage: Story = {
  args: {
    quote: 'Ocean observations provide critical data for climate modeling, weather forecasting, and marine ecosystem management.',
    authorName: 'John Doe',
    authorTitle: 'Director of Ocean Research',
    height: 'auto',
    showIcon: true,
    backgroundColor: 'bg-goos-cyan-700',
    quoteColor: 'text-white',
    authorColor: 'text-white',
    iconColor: 'fill-white',
  },
};
