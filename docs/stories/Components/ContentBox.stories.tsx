import type { Meta, StoryObj } from '@storybook/react';
import ContentBox from '../../../src/components/ContentBox';

const meta = {
  title: 'Components/Content/ContentBox',
  component: ContentBox,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    titleKey: {
      control: 'text',
      description: 'Title text (or translation key)',
    },
    backgroundColor: {
      control: 'select',
      options: [
        'bg-goos-blue-900', 'bg-goos-blue-800', 'bg-goos-blue-700',
        'bg-goos-cyan-700', 'bg-goos-orange-700', 'bg-goos-green-700',
      ],
      description: 'Box background color',
    },
    textColor: {
      control: 'select',
      options: ['text-white', 'text-goos-gray-100', 'text-goos-blue-900'],
      description: 'Content text color',
    },
    titleColor: {
      control: 'select',
      options: ['text-white', 'text-goos-gray-100', 'text-goos-orange-500'],
      description: 'Title text color',
    },
    padding: {
      control: 'select',
      options: ['p-4', 'p-6', 'p-8', 'p-10', 'p-12'],
      description: 'Box padding',
    },
    collapsible: {
      control: 'boolean',
      description: 'Make box collapsible (accordion)',
    },
    defaultCollapsed: {
      control: 'boolean',
      description: 'Start collapsed (if collapsible)',
    },
    buttonTextColor: {
      control: 'select',
      options: ['text-white', 'text-goos-blue-900'],
      description: 'Button text color',
    },
    buttonBgColor: {
      control: 'select',
      options: ['bg-goos-blue-900', 'bg-goos-blue-800', 'bg-goos-cyan-700'],
      description: 'Button background color',
    },
    buttonIconColor: {
      control: 'select',
      options: ['text-white', 'text-goos-orange-500'],
      description: 'Plus/minus icon color',
    },
    buttonIconBgColor: {
      control: 'select',
      options: ['bg-goos-blue-700', 'bg-goos-orange-500', 'bg-white'],
      description: 'Icon circle background',
    },
    buttonLeftBorderColor: {
      control: 'select',
      options: ['', 'border-goos-orange-500', 'border-goos-blue-700', 'border-goos-cyan-500'],
      description: 'Left border color (optional accent)',
    },
  },
} satisfies Meta<typeof ContentBox>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ContentBox - Flexible content container
 *
 * Two modes:
 * - **Regular**: Simple content box with optional title
 * - **Collapsible**: Accordion-style with expand/collapse button
 *
 * Features:
 * - **Customizable colors** from GOOS palette
 * - **Flexible padding** options
 * - **Optional left border** accent
 * - **Smooth animations** for collapse/expand
 * - **Plus/minus icon** with circular background
 *
 * Use the controls to customize:
 * - Collapsible mode
 * - All colors and padding
 * - Border accents
 */
export const Default: Story = {
  args: {
    titleKey: 'Content Box Title',
    backgroundColor: 'bg-goos-blue-800',
    textColor: 'text-white',
    titleColor: 'text-white',
    padding: 'p-8',
    collapsible: false,
    children: (
      <div>
        <p className="mb-4">This is a regular content box with some example content.</p>
        <p>It can contain any React children components.</p>
      </div>
    ),
  },
};

/**
 * Collapsible variant - "Learn More" accordion style
 */
export const Collapsible: Story = {
  args: {
    titleKey: 'LEARN MORE',
    backgroundColor: 'bg-goos-blue-800',
    textColor: 'text-white',
    padding: 'p-8',
    collapsible: true,
    defaultCollapsed: true,
    buttonTextColor: 'text-white',
    buttonBgColor: 'bg-goos-blue-900',
    buttonIconColor: 'text-white',
    buttonIconBgColor: 'bg-goos-blue-700',
    buttonLeftBorderColor: 'border-goos-orange-500',
    children: (
      <div className="space-y-4">
        <p>Hidden content that reveals when clicking the button.</p>
        <p>Perfect for "Learn More" sections or additional details.</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Smooth expand/collapse animations</li>
          <li>Customizable colors and styling</li>
          <li>Left border accent option</li>
        </ul>
      </div>
    ),
  },
};

/**
 * Multiple Color Schemes
 *
 * Shows ContentBox in different GOOS color backgrounds
 */
export const ColorVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <ContentBox
        titleKey="Blue Background"
        backgroundColor="bg-goos-blue-800"
        textColor="text-white"
        titleColor="text-white"
        padding="p-6"
      >
        <p>Content box with blue background - the primary GOOS color.</p>
      </ContentBox>
      <ContentBox
        titleKey="Cyan Background"
        backgroundColor="bg-goos-cyan-700"
        textColor="text-white"
        titleColor="text-white"
        padding="p-6"
      >
        <p>Content box with cyan background - a secondary GOOS color.</p>
      </ContentBox>
      <ContentBox
        titleKey="Orange Background"
        backgroundColor="bg-goos-orange-700"
        textColor="text-white"
        titleColor="text-white"
        padding="p-6"
      >
        <p>Content box with orange background - the GOOS accent color.</p>
      </ContentBox>
      <ContentBox
        titleKey="Green Background"
        backgroundColor="bg-goos-green-700"
        textColor="text-white"
        titleColor="text-white"
        padding="p-6"
      >
        <p>Content box with green background - for ocean health themes.</p>
      </ContentBox>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

/**
 * Multiple Collapsible Boxes
 *
 * Demonstrates accordion-style FAQ or sections
 */
export const MultipleCollapsible: Story = {
  render: () => (
    <div className="space-y-4">
      <ContentBox
        titleKey="What is GOOS?"
        backgroundColor="bg-goos-blue-800"
        textColor="text-white"
        padding="p-6"
        collapsible={true}
        defaultCollapsed={true}
        buttonTextColor="text-white"
        buttonBgColor="bg-goos-blue-900"
        buttonIconColor="text-white"
        buttonIconBgColor="bg-goos-blue-700"
        buttonLeftBorderColor="border-goos-orange-500"
      >
        <p className="mb-3">The Global Ocean Observing System (GOOS) is a collaborative system of ocean observations, encompassing in situ networks, satellite systems, governments, UN agencies and individual scientists.</p>
        <p>GOOS provides the ocean information needed for sustainable development, safety, wellbeing and prosperity.</p>
      </ContentBox>

      <ContentBox
        titleKey="What are Delivery Areas?"
        backgroundColor="bg-goos-blue-800"
        textColor="text-white"
        padding="p-6"
        collapsible={true}
        defaultCollapsed={true}
        buttonTextColor="text-white"
        buttonBgColor="bg-goos-blue-900"
        buttonIconColor="text-white"
        buttonIconBgColor="bg-goos-blue-700"
        buttonLeftBorderColor="border-goos-orange-500"
      >
        <p className="mb-3">GOOS organizes ocean observations around three Delivery Areas:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Climate:</strong> Long-term observations supporting climate science and policy</li>
          <li><strong>Operational Services:</strong> Real-time data for weather forecasting, navigation, and emergency response</li>
          <li><strong>Ocean Health:</strong> Monitoring ecosystem health, biodiversity, and pollution</li>
        </ul>
      </ContentBox>

      <ContentBox
        titleKey="How are networks rated?"
        backgroundColor="bg-goos-blue-800"
        textColor="text-white"
        padding="p-6"
        collapsible={true}
        defaultCollapsed={true}
        buttonTextColor="text-white"
        buttonBgColor="bg-goos-blue-900"
        buttonIconColor="text-white"
        buttonIconBgColor="bg-goos-blue-700"
        buttonLeftBorderColor="border-goos-orange-500"
      >
        <p className="mb-3">Networks are evaluated across five categories using a 0-3 star rating:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Implementation Status:</strong> Network deployment and coverage</li>
          <li><strong>Real-Time Data:</strong> Availability of real-time data streams</li>
          <li><strong>Archived High-Quality Data:</strong> Long-term data preservation</li>
          <li><strong>Metadata:</strong> Quality of data documentation</li>
          <li><strong>Best Practices:</strong> Adherence to GOOS standards</li>
        </ul>
      </ContentBox>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

/**
 * Without Title
 *
 * ContentBox can be used without a title for simple content containers
 */
export const WithoutTitle: Story = {
  args: {
    backgroundColor: 'bg-goos-blue-800',
    textColor: 'text-white',
    padding: 'p-8',
    children: (
      <div>
        <p className="mb-4">This ContentBox has no title.</p>
        <p>It works as a simple styled container for content sections.</p>
      </div>
    ),
  },
};
