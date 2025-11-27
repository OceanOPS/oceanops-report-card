import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import ContentModal from '@/components/ContentModal';

// Wrapper component to manage modal state
const ModalWrapper = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-8">
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-goos-orange-500 text-white font-semibold rounded-lg hover:bg-goos-orange-600 transition-colors"
      >
        Open Modal
      </button>

      <ContentModal
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

const meta = {
  title: 'Components/Interactive/ContentModal',
  component: ContentModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Modal overlay for rich content with configurable max width and scroll support.

## Figma Design

<iframe
  style="border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 8px; margin-top: 20px; margin-bottom: 20px;"
  width="100%"
  height="450"
  src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/JdNQkdV9E6lLtXAY15GM1L/Goos-Report-Card?node-id=2050-8837"
  allowfullscreen
></iframe>

**[→ Open in Figma](https://www.figma.com/design/JdNQkdV9E6lLtXAY15GM1L/Goos-Report-Card?node-id=2050-8837&t=lyDcrmhzDWxp62H7-4)**
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Optional modal title',
    },
    maxWidth: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Maximum width of modal',
    },
    backgroundColor: {
      control: 'select',
      options: [
        'bg-goos-blue-700', 'bg-goos-blue-800', 'bg-goos-blue-900',
        'bg-goos-cyan-700', 'bg-goos-orange-700', 'bg-goos-green-700',
        'bg-white',
      ],
      description: 'Modal background color',
    },
  },
} satisfies Meta<typeof ContentModal>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ContentModal - Generic content modal
 *
 * Features:
 * - **GSAP animations**: Smooth fade-in/scale-up on open
 * - **ESC key support**: Close modal with Escape key
 * - **Backdrop click**: Close by clicking outside modal
 * - **Scroll lock**: Prevents body scrolling when open
 * - **Responsive sizing**: 5 size options (sm to 2xl)
 * - **Custom content**: Accepts any React children
 * - **Close button**: X button in top-right corner
 *
 * Use the controls to customize:
 * - Title and size
 * - Background color
 * - Content (via children prop)
 *
 * **Note**: Click "Open Modal" button to see the modal
 */
export const Default: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: 'Additional Information',
    maxWidth: 'lg',
    backgroundColor: 'bg-white',
    children: (
      <div className="space-y-4">
        <p className="text-base text-goos-blue-900">
          This is a generic content modal that can display any custom content.
        </p>
        <p className="text-base text-goos-blue-900">
          It features smooth animations, keyboard support, and responsive sizing.
        </p>
        <ul className="list-disc list-inside space-y-2 text-goos-blue-900">
          <li>Press ESC to close</li>
          <li>Click outside to close</li>
          <li>Click X button to close</li>
        </ul>
      </div>
    ),
  },
};

/**
 * Dark modal with custom content
 */
export const DarkVariant: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: 'Ocean Data Insights',
    maxWidth: 'xl',
    backgroundColor: 'bg-goos-blue-900',
    children: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-goos-orange-500 mb-3">
            Global Ocean Observation Network
          </h3>
          <p className="text-base text-white leading-relaxed">
            The Global Ocean Observing System (GOOS) is a collaborative network of ocean observations,
            data management, and scientific analysis that provides essential information for
            understanding and managing our ocean.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-goos-orange-500 mb-3">
            Key Statistics
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-3xl font-bold text-white">3,800</p>
              <p className="text-sm text-goos-gray-300">Active Platforms</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">129</p>
              <p className="text-sm text-goos-gray-300">Contributing Countries</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
};
