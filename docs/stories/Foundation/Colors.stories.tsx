import type { Meta, StoryObj } from '@storybook/react';

// Color Palette Component
interface ColorPaletteProps {
  showHex?: boolean;
  showClasses?: boolean;
}

const ColorPalette = ({ showHex = true, showClasses = true }: ColorPaletteProps) => {
  const ColorGradient = ({
    name,
    colors
  }: {
    name: string;
    colors: { shade: string; hex: string; className: string }[]
  }) => (
    <div className="mb-8">
      <h3 className="text-lg font-bold mb-3 capitalize">{name}</h3>
      <div className="flex rounded-lg overflow-hidden shadow-lg">
        {colors.map((color) => (
          <div key={color.shade} className="flex-1 group relative">
            <div className={`${color.className} h-32 flex items-end justify-center pb-3 transition-all group-hover:h-40`}>
              <span className="text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                {color.shade}
              </span>
            </div>
            {(showHex || showClasses) && (
              <div className="p-2 bg-white text-center text-xs">
                {showHex && <div className="text-gray-600 mb-1">{color.hex}</div>}
                {showClasses && <div className="text-gray-400 font-mono">{color.className}</div>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const colorFamilies = {
    blue: [
      { shade: '900', hex: '#0B1E42', className: 'bg-goos-blue-900' },
      { shade: '800', hex: '#12336E', className: 'bg-goos-blue-800' },
      { shade: '700', hex: '#184596', className: 'bg-goos-blue-700' },
      { shade: '600', hex: '#205BC6', className: 'bg-goos-blue-600' },
      { shade: '500', hex: '#3975DF', className: 'bg-goos-blue-500' },
      { shade: '400', hex: '#6593E6', className: 'bg-goos-blue-400' },
      { shade: '300', hex: '#91B2ED', className: 'bg-goos-blue-300' },
      { shade: '200', hex: '#BDD1F4', className: 'bg-goos-blue-200' },
      { shade: '100', hex: '#E9F0FB', className: 'bg-goos-blue-100' },
    ],
    cyan: [
      { shade: '900', hex: '#072A46', className: 'bg-goos-cyan-900' },
      { shade: '800', hex: '#0C4674', className: 'bg-goos-cyan-800' },
      { shade: '700', hex: '#1062A2', className: 'bg-goos-cyan-700' },
      { shade: '600', hex: '#157FD2', className: 'bg-goos-cyan-600' },
      { shade: '500', hex: '#2E98EA', className: 'bg-goos-cyan-500' },
      { shade: '400', hex: '#5DAFEF', className: 'bg-goos-cyan-400' },
      { shade: '300', hex: '#8BC6F3', className: 'bg-goos-cyan-300' },
      { shade: '200', hex: '#B9DDF8', className: 'bg-goos-cyan-200' },
      { shade: '100', hex: '#E8F4FD', className: 'bg-goos-cyan-100' },
    ],
    orange: [
      { shade: '900', hex: '#492604', className: 'bg-goos-orange-900' },
      { shade: '800', hex: '#793F06', className: 'bg-goos-orange-800' },
      { shade: '700', hex: '#AA5909', className: 'bg-goos-orange-700' },
      { shade: '600', hex: '#DA720B', className: 'bg-goos-orange-600' },
      { shade: '500', hex: '#F48B25', className: 'bg-goos-orange-500' },
      { shade: '400', hex: '#F6A555', className: 'bg-goos-orange-400' },
      { shade: '300', hex: '#F9BF86', className: 'bg-goos-orange-300' },
      { shade: '200', hex: '#FBD8B6', className: 'bg-goos-orange-200' },
      { shade: '100', hex: '#FEF2E7', className: 'bg-goos-orange-100' },
    ],
    green: [
      { shade: '900', hex: '#0B422E', className: 'bg-goos-green-900' },
      { shade: '800', hex: '#126E4D', className: 'bg-goos-green-800' },
      { shade: '700', hex: '#189669', className: 'bg-goos-green-700' },
      { shade: '600', hex: '#20C68A', className: 'bg-goos-green-600' },
      { shade: '500', hex: '#39DFA4', className: 'bg-goos-green-500' },
      { shade: '400', hex: '#65E6B8', className: 'bg-goos-green-400' },
      { shade: '300', hex: '#91EDCC', className: 'bg-goos-green-300' },
      { shade: '200', hex: '#BDF4E1', className: 'bg-goos-green-200' },
      { shade: '100', hex: '#E9FBF5', className: 'bg-goos-green-100' },
    ],
    gray: [
      { shade: '900', hex: '#0D0D0D', className: 'bg-goos-gray-900' },
      { shade: '800', hex: '#333333', className: 'bg-goos-gray-800' },
      { shade: '700', hex: '#595959', className: 'bg-goos-gray-700' },
      { shade: '600', hex: '#737373', className: 'bg-goos-gray-600' },
      { shade: '500', hex: '#8C8C8C', className: 'bg-goos-gray-500' },
      { shade: '400', hex: '#A6A6A6', className: 'bg-goos-gray-400' },
      { shade: '300', hex: '#BFBFBF', className: 'bg-goos-gray-300' },
      { shade: '200', hex: '#D9D9D9', className: 'bg-goos-gray-200' },
      { shade: '100', hex: '#F2F2F2', className: 'bg-goos-gray-100' },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">GOOS Color Palette</h2>
        <p className="text-gray-600">
          Complete color system with 5 main colors, each with 9 shades (100-900).
          Hover over each tile to see the shade number.
        </p>
      </div>

      <ColorGradient name="Blue" colors={colorFamilies.blue} />
      <ColorGradient name="Cyan" colors={colorFamilies.cyan} />
      <ColorGradient name="Orange" colors={colorFamilies.orange} />
      <ColorGradient name="Green" colors={colorFamilies.green} />
      <ColorGradient name="Gray" colors={colorFamilies.gray} />

      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="font-bold mb-3">Usage Guidelines</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• <strong>Dark shades (700-900)</strong>: Text on light backgrounds, primary buttons</li>
          <li>• <strong>Medium shades (400-600)</strong>: Accents, hover states, secondary elements</li>
          <li>• <strong>Light shades (100-300)</strong>: Backgrounds, subtle UI elements, borders</li>
        </ul>
      </div>
    </div>
  );
};

const meta = {
  title: 'Foundation/Colors',
  component: ColorPalette,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
GOOS color system with 5 main colors, each with 9 shades (100-900).

## Figma Design - Primary Colors

<iframe
  style="border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 8px; margin-top: 20px; margin-bottom: 20px;"
  width="100%"
  height="450"
  src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/JdNQkdV9E6lLtXAY15GM1L/Goos-Report-Card?node-id=1223-1451"
  allowfullscreen
></iframe>

**[→ Open Primary Colors in Figma](https://www.figma.com/design/JdNQkdV9E6lLtXAY15GM1L/Goos-Report-Card?node-id=1223-1451&t=lyDcrmhzDWxp62H7-4)**

## Figma Design - Color Shades

<iframe
  style="border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 8px; margin-top: 20px; margin-bottom: 20px;"
  width="100%"
  height="450"
  src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/JdNQkdV9E6lLtXAY15GM1L/Goos-Report-Card?node-id=1223-1203"
  allowfullscreen
></iframe>

**[→ Open Color Shades in Figma](https://www.figma.com/design/JdNQkdV9E6lLtXAY15GM1L/Goos-Report-Card?node-id=1223-1203&t=lyDcrmhzDWxp62H7-4)**
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    showHex: {
      control: 'boolean',
      description: 'Show hex color codes',
    },
    showClasses: {
      control: 'boolean',
      description: 'Show Tailwind class names',
    },
  },
  args: {
    showHex: true,
    showClasses: true,
  },
} satisfies Meta<typeof ColorPalette>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * GOOS Color Palette
 *
 * Interactive color palette showing all GOOS colors as gradient tiles.
 * Use the controls to toggle hex codes and class names visibility.
 */
export const Default: Story = {
  args: {
    showHex: true,
    showClasses: true,
  },
};
