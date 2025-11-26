import type { Meta, StoryObj } from '@storybook/react';

// Typography Component
interface TypographyProps {
  showLineHeight?: boolean;
  showSample?: boolean;
}

const Typography = ({ showLineHeight = true, showSample = true }: TypographyProps) => {
  const fontSizes = [
    { name: 'text-xs', size: '12px', lineHeight: '16px', sample: 'The quick brown fox jumps over the lazy dog' },
    { name: 'text-sm', size: '14px', lineHeight: '20px', sample: 'The quick brown fox jumps over the lazy dog' },
    { name: 'text-base', size: '16px', lineHeight: '24px', sample: 'The quick brown fox jumps over the lazy dog' },
    { name: 'text-lg', size: '18px', lineHeight: '1.5', sample: 'The quick brown fox jumps over the lazy dog' },
    { name: 'text-xl', size: '20px', lineHeight: '1.5', sample: 'The quick brown fox jumps over the lazy dog' },
    { name: 'text-2xl', size: '24px', lineHeight: '32px', sample: 'The quick brown fox jumps over the lazy dog' },
    { name: 'text-3xl', size: '30px', lineHeight: '36px', sample: 'The quick brown fox jumps over the lazy dog' },
    { name: 'text-4xl', size: '36px', lineHeight: '40px', sample: 'The quick brown fox jumps' },
    { name: 'text-5xl', size: '48px', lineHeight: '1.2', sample: 'The quick brown fox' },
    { name: 'text-6xl', size: '60px', lineHeight: '60px', sample: 'The quick brown' },
    { name: 'text-7xl', size: '72px', lineHeight: '72px', sample: 'Quick Fox' },
    { name: 'text-8xl', size: '96px', lineHeight: '96px', sample: 'Fox' },
    { name: 'text-9xl', size: '128px', lineHeight: '128px', sample: 'Aa' },
  ];

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Typography Scale</h2>
        <p className="text-gray-600">
          Complete font size system with consistent line heights for visual hierarchy.
        </p>
      </div>

      <div className="space-y-8">
        {fontSizes.map((font) => (
          <div key={font.name} className="border-b border-gray-200 pb-6">
            <div className="flex items-baseline justify-between mb-2">
              <div className="font-mono text-xs text-gray-500">
                {font.name}
              </div>
              <div className="text-xs text-gray-400">
                {font.size} {showLineHeight && `/ ${font.lineHeight}`}
              </div>
            </div>
            {showSample && (
              <div className={`${font.name} whitespace-nowrap overflow-hidden text-ellipsis max-w-full`}>
                {font.sample}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="font-bold mb-3">Usage Guidelines</h3>
        <ul className="space-y-1 text-sm text-gray-700">
          <li>• <strong>xs-sm</strong>: Captions, labels, metadata</li>
          <li>• <strong>base-lg</strong>: Body text, paragraphs</li>
          <li>• <strong>xl-2xl</strong>: Subheadings, card titles</li>
          <li>• <strong>3xl-5xl</strong>: Section headings</li>
          <li>• <strong>6xl-9xl</strong>: Hero text, large displays</li>
        </ul>
      </div>
    </div>
  );
};

const meta = {
  title: 'Foundation/Typography',
  component: Typography,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    showLineHeight: {
      control: 'boolean',
      description: 'Show line height values',
    },
    showSample: {
      control: 'boolean',
      description: 'Show sample text',
    },
  },
  args: {
    showLineHeight: true,
    showSample: true,
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Typography Scale
 *
 * Interactive typography system showing all font sizes.
 * Use the controls to toggle line height and sample text visibility.
 */
export const Default: Story = {
  args: {
    showLineHeight: true,
    showSample: true,
  },
};
