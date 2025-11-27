import type { Meta, StoryObj } from '@storybook/react';
import Button from '../../../src/components/Button';

const meta = {
  title: '05. Components/Interactive/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['link', 'video', 'modal'],
      description: 'Button variant type',
    },
    label: {
      control: 'text',
      description: 'Button label text',
    },
    bgColor: {
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
    textColor: {
      control: 'select',
      options: [
        'text-white',
        'text-goos-blue-900', 'text-goos-blue-800', 'text-goos-blue-700', 'text-goos-blue-600', 'text-goos-blue-500', 'text-goos-blue-400', 'text-goos-blue-300', 'text-goos-blue-200', 'text-goos-blue-100',
        'text-goos-cyan-900', 'text-goos-cyan-800', 'text-goos-cyan-700', 'text-goos-cyan-600', 'text-goos-cyan-500', 'text-goos-cyan-400', 'text-goos-cyan-300', 'text-goos-cyan-200', 'text-goos-cyan-100',
        'text-goos-orange-900', 'text-goos-orange-800', 'text-goos-orange-700', 'text-goos-orange-600', 'text-goos-orange-500', 'text-goos-orange-400', 'text-goos-orange-300', 'text-goos-orange-200', 'text-goos-orange-100',
        'text-goos-green-900', 'text-goos-green-800', 'text-goos-green-700', 'text-goos-green-600', 'text-goos-green-500', 'text-goos-green-400', 'text-goos-green-300', 'text-goos-green-200', 'text-goos-green-100',
        'text-goos-gray-900', 'text-goos-gray-800', 'text-goos-gray-700', 'text-goos-gray-600', 'text-goos-gray-500', 'text-goos-gray-400', 'text-goos-gray-300', 'text-goos-gray-200', 'text-goos-gray-100',
      ],
      description: 'Text color',
    },
    iconBgColor: {
      control: 'select',
      options: [
        'bg-white',
        'bg-goos-blue-900', 'bg-goos-blue-800', 'bg-goos-blue-700', 'bg-goos-blue-600', 'bg-goos-blue-500', 'bg-goos-blue-400', 'bg-goos-blue-300', 'bg-goos-blue-200', 'bg-goos-blue-100',
        'bg-goos-cyan-900', 'bg-goos-cyan-800', 'bg-goos-cyan-700', 'bg-goos-cyan-600', 'bg-goos-cyan-500', 'bg-goos-cyan-400', 'bg-goos-cyan-300', 'bg-goos-cyan-200', 'bg-goos-cyan-100',
        'bg-goos-orange-900', 'bg-goos-orange-800', 'bg-goos-orange-700', 'bg-goos-orange-600', 'bg-goos-orange-500', 'bg-goos-orange-400', 'bg-goos-orange-300', 'bg-goos-orange-200', 'bg-goos-orange-100',
        'bg-goos-green-900', 'bg-goos-green-800', 'bg-goos-green-700', 'bg-goos-green-600', 'bg-goos-green-500', 'bg-goos-green-400', 'bg-goos-green-300', 'bg-goos-green-200', 'bg-goos-green-100',
        'bg-goos-gray-900', 'bg-goos-gray-800', 'bg-goos-gray-700', 'bg-goos-gray-600', 'bg-goos-gray-500', 'bg-goos-gray-400', 'bg-goos-gray-300', 'bg-goos-gray-200', 'bg-goos-gray-100',
      ],
      description: 'Icon circle background color',
    },
    iconColor: {
      control: 'select',
      options: [
        'text-white',
        'text-goos-blue-900', 'text-goos-blue-800', 'text-goos-blue-700', 'text-goos-blue-600', 'text-goos-blue-500', 'text-goos-blue-400', 'text-goos-blue-300', 'text-goos-blue-200', 'text-goos-blue-100',
        'text-goos-cyan-900', 'text-goos-cyan-800', 'text-goos-cyan-700', 'text-goos-cyan-600', 'text-goos-cyan-500', 'text-goos-cyan-400', 'text-goos-cyan-300', 'text-goos-cyan-200', 'text-goos-cyan-100',
        'text-goos-orange-900', 'text-goos-orange-800', 'text-goos-orange-700', 'text-goos-orange-600', 'text-goos-orange-500', 'text-goos-orange-400', 'text-goos-orange-300', 'text-goos-orange-200', 'text-goos-orange-100',
        'text-goos-green-900', 'text-goos-green-800', 'text-goos-green-700', 'text-goos-green-600', 'text-goos-green-500', 'text-goos-green-400', 'text-goos-green-300', 'text-goos-green-200', 'text-goos-green-100',
        'text-goos-gray-900', 'text-goos-gray-800', 'text-goos-gray-700', 'text-goos-gray-600', 'text-goos-gray-500', 'text-goos-gray-400', 'text-goos-gray-300', 'text-goos-gray-200', 'text-goos-gray-100',
      ],
      description: 'Icon color',
    },
  },
  args: {
    variant: 'link',
    label: 'Visit Website',
    url: 'https://www.goosocean.org',
    bgColor: 'bg-goos-orange-500',
    textColor: 'text-white',
    iconBgColor: 'bg-white',
    iconColor: 'text-goos-orange-500',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Button - Link variant
 *
 * Buttons support three variants:
 * - **link**: External link (with arrow icon)
 * - **video**: Opens video modal
 * - **modal**: Opens content modal
 *
 * Use the GOOS color palette controls to customize:
 * - Button background and text colors
 * - Icon circle background and icon colors
 */
export const Default: Story = {
  args: {
    variant: 'link',
    label: 'Visit Website',
    url: 'https://www.goosocean.org',
    bgColor: 'bg-goos-orange-500',
    textColor: 'text-white',
    iconBgColor: 'bg-white',
    iconColor: 'text-goos-orange-500',
  },
};

/**
 * All Button Variants
 *
 * Shows all three button types side by side:
 * - Link button (arrow icon)
 * - Video button (play icon)
 * - Modal button (info icon)
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <Button
        variant="link"
        label="External Link"
        url="https://www.goosocean.org"
        bgColor="bg-goos-orange-500"
        textColor="text-white"
        iconBgColor="bg-white"
        iconColor="text-goos-orange-500"
      />
      <Button
        variant="video"
        label="Watch Video"
        videoType="local"
        videoId="/videos/belbeoch.mp4"
        bgColor="bg-goos-blue-700"
        textColor="text-white"
        iconBgColor="bg-white"
        iconColor="text-goos-blue-700"
      />
      <Button
        variant="modal"
        label="Learn More"
        modalContent={
          <div>
            <h3 className="text-xl font-bold mb-4">Modal Content</h3>
            <p>This is example content for the modal button variant.</p>
          </div>
        }
        bgColor="bg-goos-cyan-700"
        textColor="text-white"
        iconBgColor="bg-white"
        iconColor="text-goos-cyan-700"
      />
    </div>
  ),
};

/**
 * GOOS Color Palette
 *
 * Shows buttons in each main GOOS color:
 * - Blue (primary brand color)
 * - Cyan (secondary)
 * - Orange (accent)
 * - Green (success/health)
 */
export const GOOSColors: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <Button
        variant="link"
        label="Blue Button"
        url="https://www.goosocean.org"
        bgColor="bg-goos-blue-700"
        textColor="text-white"
        iconBgColor="bg-white"
        iconColor="text-goos-blue-700"
      />
      <Button
        variant="link"
        label="Cyan Button"
        url="https://www.goosocean.org"
        bgColor="bg-goos-cyan-700"
        textColor="text-white"
        iconBgColor="bg-white"
        iconColor="text-goos-cyan-700"
      />
      <Button
        variant="link"
        label="Orange Button"
        url="https://www.goosocean.org"
        bgColor="bg-goos-orange-500"
        textColor="text-white"
        iconBgColor="bg-white"
        iconColor="text-goos-orange-500"
      />
      <Button
        variant="link"
        label="Green Button"
        url="https://www.goosocean.org"
        bgColor="bg-goos-green-700"
        textColor="text-white"
        iconBgColor="bg-white"
        iconColor="text-goos-green-700"
      />
    </div>
  ),
};

/**
 * Dark Background
 *
 * Demonstrates button contrast on dark backgrounds.
 * Common use case in the OceanOPS Report Card design.
 */
export const DarkBackground: Story = {
  render: () => (
    <div className="bg-goos-blue-900 p-8 rounded-lg">
      <div className="flex flex-col gap-4 items-start">
        <Button
          variant="link"
          label="Orange on Dark"
          url="https://www.goosocean.org"
          bgColor="bg-goos-orange-500"
          textColor="text-white"
          iconBgColor="bg-white"
          iconColor="text-goos-orange-500"
        />
        <Button
          variant="link"
          label="Cyan on Dark"
          url="https://www.goosocean.org"
          bgColor="bg-goos-cyan-700"
          textColor="text-white"
          iconBgColor="bg-white"
          iconColor="text-goos-cyan-700"
        />
        <Button
          variant="video"
          label="Watch Video"
          videoType="local"
          videoId="/videos/belbeoch.mp4"
          bgColor="bg-white"
          textColor="text-goos-blue-900"
          iconBgColor="bg-goos-blue-900"
          iconColor="text-white"
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
