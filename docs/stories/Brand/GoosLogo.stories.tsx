import type { Meta, StoryObj } from '@storybook/react';
import GoosLogo from '../../../src/components/GoosLogo';

const meta = {
  title: 'Brand/GoosLogo',
  component: GoosLogo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
GOOS official logo component with two color variants.

## Figma Design

<iframe
  style="border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 8px; margin-top: 20px; margin-bottom: 20px;"
  width="100%"
  height="450"
  src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/JdNQkdV9E6lLtXAY15GM1L/Goos-Report-Card?node-id=1223-1884"
  allowfullscreen
></iframe>

**[→ Open in Figma](https://www.figma.com/design/JdNQkdV9E6lLtXAY15GM1L/Goos-Report-Card?node-id=1223-1884&t=TLsKfb2iMRfoqQx2-4)**
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['white', 'color'],
      description: 'Logo color variant',
    },
    url: {
      control: 'text',
      description: 'Optional external URL to link to',
    },
    className: {
      control: 'text',
      description: 'Optional additional Tailwind classes (e.g., margins, borders)',
    },
  },
  args: {
    variant: 'color',
  },
} satisfies Meta<typeof GoosLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default GOOS Logo
 *
 * The logo has fixed responsive heights (h-16 on mobile → h-28 on desktop).
 *
 * Use the controls below to:
 * - **variant**: Switch between white and color versions
 * - **url**: Add an optional URL to make it clickable
 * - **className**: Add additional styling (margins, borders, etc.)
 */
export const Default: Story = {
  args: {
    variant: 'color',
  },
};
