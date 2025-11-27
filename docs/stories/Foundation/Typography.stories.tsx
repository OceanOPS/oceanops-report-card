import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: '03. Foundation/Typography',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
GOOS typography system using Roboto and Roboto Condensed font families.

## Figma Design

<iframe
  style="border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 8px; margin-top: 20px; margin-bottom: 20px;"
  width="100%"
  height="450"
  src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/JdNQkdV9E6lLtXAY15GM1L/Goos-Report-Card?node-id=1227-3441"
  allowfullscreen
></iframe>

**[→ Open in Figma](https://www.figma.com/design/JdNQkdV9E6lLtXAY15GM1L/Goos-Report-Card?node-id=1227-3441&t=lyDcrmhzDWxp62H7-4)**
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Font Size Scale
 *
 * Complete Tailwind font size system showing all available sizes from text-xs to text-9xl.
 * Each size includes the corresponding pixel value and line height.
 */
export const FontSizeScale: Story = {
  render: () => {
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
        {fontSizes.map((font) => (
          <div key={font.name} className="border-b border-gray-200 pb-6">
            <div className="flex items-baseline justify-between mb-2">
              <div className="font-mono text-xs text-gray-500">
                {font.name}
              </div>
              <div className="text-xs text-gray-400">
                {font.size} / {font.lineHeight}
              </div>
            </div>
            <div className={`${font.name} whitespace-nowrap overflow-hidden text-ellipsis max-w-full`}>
              {font.sample}
            </div>
          </div>
        ))}

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
  },
};

/**
 * Roboto Font Weights
 *
 * All available weights of Roboto font family.
 * Used as the primary font throughout the application.
 */
export const RobotoWeights: Story = {
  render: () => {
    const weights = [
      { weight: '100', name: 'Thin', className: 'font-thin' },
      { weight: '300', name: 'Light', className: 'font-light' },
      { weight: '400', name: 'Regular', className: 'font-normal' },
      { weight: '500', name: 'Medium', className: 'font-medium' },
      { weight: '700', name: 'Bold', className: 'font-bold' },
      { weight: '900', name: 'Black', className: 'font-black' },
    ];

    return (
      <div className="space-y-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Roboto Font Weights</h2>
          <p className="text-gray-600">
            Primary typeface for body text, headings, and UI elements.
          </p>
        </div>

        <div className="space-y-6">
          {weights.map((w) => (
            <div key={w.weight} className="border-b border-gray-200 pb-6">
              <div className="flex items-baseline justify-between mb-3">
                <div>
                  <span className="font-mono text-sm text-gray-500">{w.className}</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm text-gray-600">{w.name}</span>
                </div>
                <span className="text-xs text-gray-400">Weight {w.weight}</span>
              </div>
              <p className={`${w.className} text-2xl mb-2`}>
                The quick brown fox jumps over the lazy dog
              </p>
              <p className={`${w.className} text-base text-gray-600`}>
                ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-bold mb-3 text-blue-900">Usage in Project</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• <strong>Regular (400)</strong>: Body text, paragraphs, descriptions</li>
            <li>• <strong>Medium (500)</strong>: Emphasized text, subheadings</li>
            <li>• <strong>Bold (700)</strong>: Headings, titles, important information</li>
            <li>• <strong>Light (300)</strong>: Secondary text, captions</li>
            <li>• <strong>Black (900)</strong>: Hero text, major headings</li>
          </ul>
        </div>
      </div>
    );
  },
};

/**
 * Roboto Condensed Font Weights
 *
 * All available weights of Roboto Condensed font family.
 * Used for compact layouts and data-heavy displays.
 */
export const RobotoCondensedWeights: Story = {
  render: () => {
    const weights = [
      { weight: '300', name: 'Light', className: 'font-light' },
      { weight: '400', name: 'Regular', className: 'font-normal' },
      { weight: '700', name: 'Bold', className: 'font-bold' },
    ];

    return (
      <div className="space-y-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Roboto Condensed Font Weights</h2>
          <p className="text-gray-600">
            Condensed variant for space-efficient typography in tables and data displays.
          </p>
        </div>

        <div className="space-y-6">
          {weights.map((w) => (
            <div key={w.weight} className="border-b border-gray-200 pb-6">
              <div className="flex items-baseline justify-between mb-3">
                <div>
                  <span className="font-mono text-sm text-gray-500">font-['Roboto_Condensed'] {w.className}</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm text-gray-600">{w.name}</span>
                </div>
                <span className="text-xs text-gray-400">Weight {w.weight}</span>
              </div>
              <p className={`${w.className} text-2xl mb-2`} style={{ fontFamily: 'Roboto Condensed, sans-serif' }}>
                The quick brown fox jumps over the lazy dog
              </p>
              <p className={`${w.className} text-base text-gray-600`} style={{ fontFamily: 'Roboto Condensed, sans-serif' }}>
                ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-cyan-50 rounded-lg border border-cyan-200">
          <h3 className="font-bold mb-3 text-cyan-900">When to Use Roboto Condensed</h3>
          <ul className="space-y-2 text-sm text-cyan-800">
            <li>• <strong>Data Tables</strong>: Compact display of numerical data</li>
            <li>• <strong>Labels</strong>: Uppercase labels in tight spaces</li>
            <li>• <strong>Navigation</strong>: Menu items and navigation labels</li>
            <li>• <strong>Statistics</strong>: Numbers and metrics in dashboards</li>
          </ul>
        </div>
      </div>
    );
  },
};

/**
 * Font Comparison
 *
 * Side-by-side comparison of Roboto and Roboto Condensed.
 */
export const FontComparison: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Roboto vs Roboto Condensed</h2>
        <p className="text-gray-600">
          Visual comparison of both typefaces at the same size and weight.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Roboto Column */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-4 text-gray-900">Roboto</h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">text-4xl font-bold</p>
              <p className="text-4xl font-bold text-gray-900">Ocean Report</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">text-2xl font-medium</p>
              <p className="text-2xl font-medium text-gray-900">Network Statistics</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">text-base font-normal</p>
              <p className="text-base font-normal text-gray-700">
                The Global Ocean Observing System (GOOS) provides essential data for climate science,
                operational services, and ocean health monitoring.
              </p>
            </div>
          </div>
        </div>

        {/* Roboto Condensed Column */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-4 text-blue-900">Roboto Condensed</h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-blue-600 mb-1">text-4xl font-bold</p>
              <p className="text-4xl font-bold text-blue-900" style={{ fontFamily: 'Roboto Condensed, sans-serif' }}>
                Ocean Report
              </p>
            </div>
            <div>
              <p className="text-xs text-blue-600 mb-1">text-2xl font-medium</p>
              <p className="text-2xl font-medium text-blue-900" style={{ fontFamily: 'Roboto Condensed, sans-serif' }}>
                Network Statistics
              </p>
            </div>
            <div>
              <p className="text-xs text-blue-600 mb-1">text-base font-normal</p>
              <p className="text-base font-normal text-blue-800" style={{ fontFamily: 'Roboto Condensed, sans-serif' }}>
                The Global Ocean Observing System (GOOS) provides essential data for climate science,
                operational services, and ocean health monitoring.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-orange-50 rounded-lg border border-orange-200">
        <h3 className="font-bold mb-3 text-orange-900">Key Differences</h3>
        <ul className="space-y-2 text-sm text-orange-800">
          <li>• <strong>Width</strong>: Roboto Condensed is ~15% narrower, fitting more text in less space</li>
          <li>• <strong>Readability</strong>: Roboto is better for body text; Condensed for labels and data</li>
          <li>• <strong>Hierarchy</strong>: Use Roboto for primary content, Condensed for secondary/compact elements</li>
        </ul>
      </div>
    </div>
  ),
};
