import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import PartnerModal from '@/components/PartnerModal';

// Wrapper component to manage modal state
const ModalWrapper = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-8">
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-goos-orange-500 text-white font-semibold rounded-lg hover:bg-goos-orange-600 transition-colors"
      >
        Open Partner Countries
      </button>

      <PartnerModal
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

const meta = {
  title: '05. Components/Interactive/PartnerModal',
  component: PartnerModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Modal displaying partner countries with platform counts per network.

## Figma Design

<iframe
  style="border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 8px; margin-top: 20px; margin-bottom: 20px;"
  width="100%"
  height="450"
  src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/JdNQkdV9E6lLtXAY15GM1L/Goos-Report-Card?node-id=2050-8839"
  allowfullscreen
></iframe>

**[→ Open in Figma](https://www.figma.com/design/JdNQkdV9E6lLtXAY15GM1L/Goos-Report-Card?node-id=2050-8839&t=lyDcrmhzDWxp62H7-4)**
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    countries: {
      control: 'object',
      description: 'Array of country data with platform counts per network',
    },
    titleKey: {
      control: 'text',
      description: 'Translation key for modal title',
    },
    showFlags: {
      control: 'boolean',
      description: 'Show country flags',
    },
  },
} satisfies Meta<typeof PartnerModal>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * PartnerModal - Partner countries and platforms
 *
 * Features:
 * - **Collapsible countries**: Expand to see platform breakdown
 * - **14 network types**: All major ocean observing networks
 * - **Network icons**: Visual identification for each network
 * - **Platform counts**: Total networks and platforms per country
 * - **GSAP animations**: Smooth expand/collapse transitions
 * - **Scroll support**: Handles long lists of countries
 * - **ESC key support**: Close with Escape key
 * - **Search/filter**: Find specific countries (if implemented)
 *
 * Networks shown:
 * - Drifting Buoys, Argo, Ocean Gliders, AniBOS
 * - FVON, SOT-VOS, SOT-ASAP, SOT, GO-SHIP
 * - GLOSS, OceanSITES, Moored Buoys, Tsunami Buoys, HF Radars
 *
 * Use the controls to customize:
 * - Countries array with platform counts
 * - Title and description
 * - Flag display option
 *
 * **Note**: Click "Open Partner Countries" button to see the modal
 */
export const Default: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    titleKey: 'Partner Countries',
    showFlags: false,
    countries: [
      {
        name: 'France',
        countryCode: 'fr', // ISO 3166-1 alpha-2 code for flag display
        description: 'Leading contributor to global ocean observing systems',
        networks: {
          driftingBuoys: 150,
          argo: 200,
          oceanGliders: 10,
          aniBOS: 5,
          fvon: 8,
          sotVos: 30,
          sotAsap: 15,
          oceantrax: 25,
          goShip: 8,
          gloss: 12,
          oceanSites: 6,
          mooredBuoys: 45,
          tsunamiBuoys: 2,
          hfRadars: 4,
        },
      },
      {
        name: 'United States',
        countryCode: 'us', // ISO 3166-1 alpha-2 code for flag display
        description: 'Major ocean observation network operator',
        networks: {
          driftingBuoys: 300,
          argo: 450,
          oceanGliders: 25,
          aniBOS: 0,
          fvon: 12,
          sotVos: 50,
          sotAsap: 20,
          oceantrax: 40,
          goShip: 15,
          gloss: 20,
          oceanSites: 10,
          mooredBuoys: 150,
          tsunamiBuoys: 39,
          hfRadars: 125,
        },
      },
      {
        name: 'Japan',
        countryCode: 'jp', // ISO 3166-1 alpha-2 code for flag display
        description: 'Advanced tsunami and ocean monitoring systems',
        networks: {
          driftingBuoys: 80,
          argo: 120,
          oceanGliders: 5,
          aniBOS: 0,
          fvon: 6,
          sotVos: 20,
          sotAsap: 10,
          oceantrax: 15,
          goShip: 6,
          gloss: 8,
          oceanSites: 4,
          mooredBuoys: 60,
          tsunamiBuoys: 25,
          hfRadars: 10,
        },
      },
    ],
  },
};
