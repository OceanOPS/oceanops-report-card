import type { Meta, StoryObj } from '@storybook/react';
import ContentModule from '../../../src/components/ContentModule';

const meta = {
  title: 'Layout/ContentModule',
  component: ContentModule,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: 'select',
      options: ['split', 'full-width'],
      description: 'Layout type: split (sticky title) or full-width (title at top)',
    },
    titleLevel: {
      control: 'select',
      options: ['h2', 'h3'],
      description: 'Heading level (affects title size)',
    },
    kicker: {
      control: 'text',
      description: 'Optional kicker text above title',
    },
    title: {
      control: 'text',
      description: 'Main title text',
    },
    subtitle: {
      control: 'text',
      description: 'Optional subtitle below title',
    },
    introduction: {
      control: 'text',
      description: 'Optional introduction paragraph',
    },
    hasLine: {
      control: 'boolean',
      description: 'Show decorative line above title',
    },
    backgroundColor: {
      control: 'select',
      options: [
        'bg-goos-blue-700', 'bg-goos-blue-800', 'bg-goos-blue-900',
        'bg-goos-cyan-700', 'bg-goos-orange-700', 'bg-goos-green-700',
        'bg-white', 'bg-goos-gray-100',
      ],
      description: 'Background color',
    },
    titleColor: {
      control: 'select',
      options: [
        'text-goos-blue-900', 'text-goos-blue-800', 'text-goos-blue-700',
        'text-white',
      ],
      description: 'Title text color',
    },
    textColor: {
      control: 'select',
      options: [
        'text-goos-gray-900', 'text-goos-gray-800', 'text-goos-gray-700',
        'text-white',
      ],
      description: 'Body text color',
    },
    lineColor: {
      control: 'select',
      options: [
        'bg-goos-blue-500', 'bg-goos-cyan-500', 'bg-goos-orange-500', 'bg-goos-green-500',
      ],
      description: 'Decorative line color',
    },
  },
} satisfies Meta<typeof ContentModule>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ContentModule - Flexible content section layout
 *
 * Features:
 * - **Two layouts**: Split (sticky title) or full-width (title at top)
 * - **Title section**: Kicker, title, subtitle, introduction
 * - **Decorative line** above title
 * - **Button support**: Link, video modal, or content modal
 * - **GSAP animations**: Smooth entrance on scroll
 * - **Sticky title** in split layout
 * - **Two-column content** in full-width layout
 *
 * Use the controls to customize:
 * - Layout type
 * - Title content and level
 * - All colors from GOOS palette
 * - Button configuration
 */
export const SplitLayout: Story = {
  args: {
    layout: 'split',
    titleLevel: 'h2',
    kicker: 'Ocean Observations',
    title: 'Global Monitoring Network',
    subtitle: 'Connecting Science and Society',
    introduction: 'The Global Ocean Observing System provides essential information about the state of our ocean, supporting climate monitoring, weather forecasting, and marine ecosystem management.',
    hasLine: true,
    lineColor: 'bg-goos-orange-500',
    backgroundColor: 'bg-white',
    titleColor: 'text-goos-blue-900',
    textColor: 'text-goos-gray-800',
    button: {
      type: 'link',
      label: 'Learn More',
      url: 'https://www.goosocean.org',
      textColor: 'text-white',
      bgColor: 'bg-goos-orange-600',
    },
    children: (
      <div className="space-y-6">
        <p className="text-base leading-relaxed">
          Ocean observations are critical for understanding climate variability, predicting extreme weather events,
          and managing marine resources sustainably. The global network of observing systems provides data on
          temperature, salinity, currents, sea level, and biogeochemical properties.
        </p>
        <p className="text-base leading-relaxed">
          These observations support a wide range of applications, from seasonal forecasts to century-long climate
          projections, and from local coastal management to global ocean health assessments.
        </p>
        <h3 className="text-xl font-bold text-goos-blue-900 mt-8">Key Components</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Autonomous profiling floats (Argo)</li>
          <li>Surface drifting buoys</li>
          <li>Moored time-series stations</li>
          <li>Ship-based observations</li>
          <li>Satellite remote sensing</li>
        </ul>
      </div>
    ),
  },
};

/**
 * Full-width layout with two-column content
 */
export const FullWidthLayout: Story = {
  args: {
    layout: 'full-width',
    titleLevel: 'h2',
    title: 'Ocean Data and Services',
    introduction: 'Comprehensive ocean information supporting science, policy, and operational applications.',
    hasLine: true,
    lineColor: 'bg-goos-orange-500',
    backgroundColor: 'bg-goos-gray-100',
    titleColor: 'text-goos-blue-900',
    textColor: 'text-goos-gray-800',
    children: (
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-goos-blue-900">Climate Services</h3>
        <p className="text-base leading-relaxed">
          Ocean data underpins our understanding of climate variability and change, supporting seasonal to
          centennial forecasts and climate assessments.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Climate model validation</li>
          <li>Heat content monitoring</li>
          <li>Sea level tracking</li>
        </ul>
      </div>
    ),
    rightColumn: (
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-goos-blue-900">Operational Services</h3>
        <p className="text-base leading-relaxed">
          Real-time ocean observations enable operational forecasting of currents, waves, and marine conditions,
          supporting navigation, search and rescue, and marine operations.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Weather forecasting</li>
          <li>Maritime safety</li>
          <li>Emergency response</li>
        </ul>
      </div>
    ),
  },
};

/**
 * Dark variant with video button
 */
export const DarkVariant: Story = {
  args: {
    layout: 'split',
    titleLevel: 'h2',
    title: 'The Future of Ocean Monitoring',
    subtitle: 'Innovation and Technology',
    introduction: 'Emerging technologies are transforming how we observe and understand our ocean.',
    hasLine: true,
    lineColor: 'bg-goos-orange-500',
    backgroundColor: 'bg-goos-blue-900',
    titleColor: 'text-white',
    textColor: 'text-white',
    button: {
      type: 'video',
      label: 'Watch Video',
      videoType: 'local',
      videoId: '/videos/belbeoch.mp4',
      previewImage: '/images/climate1.webp',
      textColor: 'text-goos-blue-900',
      bgColor: 'bg-goos-orange-500',
    },
    children: (
      <div className="space-y-6">
        <p className="text-base leading-relaxed text-white">
          New observing technologies including autonomous vehicles, smart sensors, and advanced satellite systems
          are expanding our ability to monitor the ocean in unprecedented detail.
        </p>
        <p className="text-base leading-relaxed text-white">
          These innovations promise better understanding of ocean processes, improved forecasts, and more
          effective management of marine resources and ecosystems.
        </p>
      </div>
    ),
  },
};
