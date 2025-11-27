import type { Meta, StoryObj } from '@storybook/react';
import QuoteBlock from '../../../src/components/QuoteBlock';

const meta = {
  title: 'Components/Content/QuoteBlock',
  component: QuoteBlock,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['quote', 'highlight'],
      description: 'Style variant: quote (with icon) or highlight (with border)',
    },
    quote: {
      control: 'text',
      description: 'Quote text content',
    },
    authorName: {
      control: 'text',
      description: 'Name of the person quoted',
    },
    authorTitle: {
      control: 'text',
      description: 'Title/position of the person',
    },
    logoSrc: {
      control: 'text',
      description: 'URL to organization logo',
    },
    quoteColor: {
      control: 'select',
      options: [
        'text-goos-blue-900', 'text-goos-blue-800', 'text-goos-blue-700', 'text-goos-blue-600', 'text-goos-blue-500',
        'text-goos-cyan-900', 'text-goos-cyan-800', 'text-goos-cyan-700', 'text-goos-cyan-600', 'text-goos-cyan-500',
        'text-goos-orange-900', 'text-goos-orange-800', 'text-goos-orange-700', 'text-goos-orange-600', 'text-goos-orange-500',
        'text-goos-green-900', 'text-goos-green-800', 'text-goos-green-700', 'text-goos-green-600', 'text-goos-green-500',
        'text-goos-gray-900', 'text-goos-gray-800', 'text-goos-gray-700', 'text-goos-gray-600', 'text-goos-gray-500',
      ],
      description: 'Text color for quote',
    },
    authorColor: {
      control: 'select',
      options: [
        'text-goos-blue-900', 'text-goos-blue-800', 'text-goos-blue-700', 'text-goos-blue-600', 'text-goos-blue-500',
        'text-goos-cyan-900', 'text-goos-cyan-800', 'text-goos-cyan-700', 'text-goos-cyan-600', 'text-goos-cyan-500',
        'text-goos-orange-900', 'text-goos-orange-800', 'text-goos-orange-700', 'text-goos-orange-600', 'text-goos-orange-500',
        'text-goos-green-900', 'text-goos-green-800', 'text-goos-green-700', 'text-goos-green-600', 'text-goos-green-500',
        'text-goos-gray-900', 'text-goos-gray-800', 'text-goos-gray-700', 'text-goos-gray-600', 'text-goos-gray-500',
      ],
      description: 'Text color for author info',
    },
    iconColor: {
      control: 'select',
      options: [
        'fill-goos-blue-900', 'fill-goos-blue-800', 'fill-goos-blue-700', 'fill-goos-blue-600', 'fill-goos-blue-500',
        'fill-goos-cyan-900', 'fill-goos-cyan-800', 'fill-goos-cyan-700', 'fill-goos-cyan-600', 'fill-goos-cyan-500',
        'fill-goos-orange-900', 'fill-goos-orange-800', 'fill-goos-orange-700', 'fill-goos-orange-600', 'fill-goos-orange-500',
        'fill-goos-green-900', 'fill-goos-green-800', 'fill-goos-green-700', 'fill-goos-green-600', 'fill-goos-green-500',
        'fill-goos-gray-900', 'fill-goos-gray-800', 'fill-goos-gray-700', 'fill-goos-gray-600', 'fill-goos-gray-500',
      ],
      description: 'Fill color for quote icon (quote variant)',
    },
    borderColor: {
      control: 'select',
      options: [
        'border-goos-blue-900', 'border-goos-blue-800', 'border-goos-blue-700', 'border-goos-blue-600', 'border-goos-blue-500',
        'border-goos-cyan-900', 'border-goos-cyan-800', 'border-goos-cyan-700', 'border-goos-cyan-600', 'border-goos-cyan-500',
        'border-goos-orange-900', 'border-goos-orange-800', 'border-goos-orange-700', 'border-goos-orange-600', 'border-goos-orange-500',
        'border-goos-green-900', 'border-goos-green-800', 'border-goos-green-700', 'border-goos-green-600', 'border-goos-green-500',
        'border-goos-gray-900', 'border-goos-gray-800', 'border-goos-gray-700', 'border-goos-gray-600', 'border-goos-gray-500',
      ],
      description: 'Border color for left border (highlight variant)',
    },
  },
  args: {
    variant: 'quote',
    quote: 'In the face of climate change, ocean observing is more important than ever.',
    authorName: 'Mathieu Belbéoch',
    authorTitle: 'OceanOPS Manager',
    quoteColor: 'text-goos-blue-900',
    authorColor: 'text-goos-blue-900',
    iconColor: 'fill-goos-orange-500',
    borderColor: 'border-goos-orange-500',
  },
} satisfies Meta<typeof QuoteBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * QuoteBlock - Styled quote with attribution
 *
 * Two variants available:
 * - **quote**: With decorative quote icon (for testimonials, quotes)
 * - **highlight**: With left border accent (for callouts, highlights)
 *
 * Use the controls to customize:
 * - Quote text and colors
 * - Author name and title
 * - Organization logo
 * - Icon/border colors from GOOS palette
 */
export const Default: Story = {
  args: {
    variant: 'quote',
    quote: 'In the face of climate change, ocean observing is more important than ever.',
    authorName: 'Mathieu Belbéoch',
    authorTitle: 'OceanOPS Manager',
    quoteColor: 'text-goos-blue-900',
    authorColor: 'text-goos-blue-900',
    iconColor: 'fill-goos-orange-500',
  },
};
