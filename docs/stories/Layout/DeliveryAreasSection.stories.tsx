import type { Meta, StoryObj } from '@storybook/react';
import ContentModule from '../../../src/components/ContentModule';
import ColorStripes from '../../../src/components/ColorStripes';
import DeliveryAreasNav from '../../../src/components/DeliveryAreasNav';
import QuoteBlock from '../../../src/components/QuoteBlock';
import ImageCaption from '../../../src/components/ImageCaption';
import Spacer from '../../../src/components/Spacer';

// Wrapper component to combine all elements
const DeliveryAreasSection = () => {
  return (
    <div>
      {/* Introduction ContentModule (h2) */}
      <div className="bg-goos-white">
        <ContentModule
          titleLevel="h2"
          title="Value of Ocean Observations"
          introduction="Ocean observations support critical delivery areas including climate monitoring, operational services, and ocean health. This section showcases three key stories demonstrating the impact of ocean data."
          layout="split"
          backgroundColor="bg-goos-white"
          titleColor="text-goos-blue-900"
          textColor="text-goos-black"
          lineColor="bg-goos-cyan-600"
          stickyTitle={false}
        >
          <p className="text-goos-black text-base sm:text-lg md:text-xl leading-relaxed">
            The Global Ocean Observing System provides essential information about the state of our ocean, supporting climate monitoring, weather forecasting, and marine ecosystem management. The following stories demonstrate how ocean observations deliver value across three critical areas.
          </p>
        </ContentModule>
      </div>

      {/* Color Stripes - Visual separator and navigation trigger */}
      <ColorStripes
        stripeColors={['bg-goos-cyan-300', 'bg-goos-cyan-200', 'bg-goos-cyan-100']}
        deliveryAreas={[
          {
            iconSrc: '/icons/climate.png',
            iconAlt: 'Climate',
            textKey: 'Climate & Ocean Circulation',
            sectionId: 'amoc-section',
          },
          {
            iconSrc: '/icons/operational_services.png',
            iconAlt: 'Operational Services',
            textKey: 'Operational Services',
            sectionId: 'elnino-section',
          },
          {
            iconSrc: '/icons/ocean_health.png',
            iconAlt: 'Ocean Health',
            textKey: 'Ocean Health',
            sectionId: 'oceanhealth-section',
          },
        ]}
        stripeHeight="100vh"
      />

      {/* Delivery Areas Nav - Fixed navigation bar (appears after color stripes in real project) */}
      <DeliveryAreasNav />

      {/* Story 1: Climate - AMOC Section */}
      <div id="amoc-section" className="pt-8 sm:pt-12 md:pt-16 bg-goos-white">
        <ContentModule
          kicker="Climate & Ocean Circulation"
          title="Atlantic Meridional Overturning Circulation (AMOC)"
          titleLevel="h3"
          layout="split"
          backgroundColor="bg-goos-white"
          titleColor="text-goos-blue-700"
          textColor="text-goos-gray-800"
          lineColor="bg-goos-cyan-600"
        >
          <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-4">
            The Atlantic Meridional Overturning Circulation (AMOC) is a critical component of Earth's climate system, transporting heat and nutrients across the Atlantic Ocean. Ocean observations help us monitor changes in this vital system.
          </p>

          <Spacer size="sm" />

          <div className="-mx-4 sm:mx-0">
            <ImageCaption
              src="/images/climate1.webp"
              alt="Climate observation"
              caption=""
            />
          </div>

          <Spacer size="sm" />

          <h3 className="text-xl sm:text-2xl font-bold text-goos-blue-700 mb-3 sm:mb-4">Observations & Benefits</h3>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-4">
            Continuous observations from Argo floats, moorings, and ship-based measurements provide critical data on ocean temperature, salinity, and currents. This data enables scientists to detect changes in ocean circulation patterns and improve climate models.
          </p>

          <QuoteBlock
            variant="quote"
            quote="Ocean observations are essential for understanding and predicting changes in the AMOC, which has profound implications for global climate."
            authorName="Dr. Maria Santos"
            authorTitle="Climate Scientist, GOOS"
            quoteColor="text-goos-blue-700"
            authorColor="text-goos-blue-700"
            iconColor="fill-goos-cyan-600"
          />
        </ContentModule>
      </div>

      {/* Story 2: Operational Services - El Niño Section */}
      <div id="elnino-section" className="pt-8 sm:pt-12 md:pt-16 bg-goos-white">
        <ContentModule
          kicker="Operational Services"
          title="El Niño Southern Oscillation (ENSO)"
          titleLevel="h3"
          layout="split"
          backgroundColor="bg-goos-white"
          titleColor="text-goos-blue-700"
          textColor="text-goos-gray-800"
          lineColor="bg-goos-cyan-600"
        >
          <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-4">
            El Niño events have significant impacts on weather patterns worldwide. Real-time ocean observations enable early detection and forecasting of these events, supporting disaster preparedness and resource management.
          </p>

          <Spacer size="sm" />

          <div className="-mx-4 sm:mx-0">
            <ImageCaption
              src="/images/operational1.webp"
              alt="Operational observation"
              caption=""
            />
          </div>

          <Spacer size="sm" />

          <h3 className="text-xl sm:text-2xl font-bold text-goos-blue-700 mb-3 sm:mb-4">Forecasting Impact</h3>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-4">
            The Tropical Pacific Observing System (TPOS) provides real-time data on ocean temperatures, enabling forecasters to predict El Niño events months in advance. This early warning capability helps communities prepare for extreme weather events and manage water resources.
          </p>

          <QuoteBlock
            variant="quote"
            quote="Ocean observations have dramatically improved our ability to forecast El Niño events, providing critical lead time for communities to prepare."
            authorName="Dr. Juan Quintana"
            authorTitle="Operational Oceanographer, NOAA"
            quoteColor="text-goos-blue-700"
            authorColor="text-goos-blue-700"
            iconColor="fill-goos-cyan-600"
          />
        </ContentModule>
      </div>

      {/* Story 3: Ocean Health Section */}
      <div id="oceanhealth-section" className="pt-8 sm:pt-12 md:pt-16 bg-goos-white">
        <ContentModule
          kicker="Ocean Health"
          title="Marine Ecosystem Monitoring"
          titleLevel="h3"
          layout="split"
          backgroundColor="bg-goos-white"
          titleColor="text-goos-blue-700"
          textColor="text-goos-gray-800"
          lineColor="bg-goos-cyan-600"
        >
          <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-4">
            Healthy ocean ecosystems are fundamental to human well-being, providing food, livelihoods, and ecosystem services. Ocean observations help us monitor ecosystem health and respond to threats like ocean acidification and marine heatwaves.
          </p>

          <Spacer size="sm" />

          <div className="-mx-4 sm:mx-0">
            <ImageCaption
              src="/images/content.jpg"
              alt="Ocean health observation"
              caption=""
            />
          </div>

          <Spacer size="sm" />

          <h3 className="text-xl sm:text-2xl font-bold text-goos-blue-700 mb-3 sm:mb-4">Biogeochemical Observations</h3>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-4">
            Biogeochemical sensors on Argo floats and autonomous vehicles measure ocean oxygen, pH, and nutrients. These observations reveal changes in ocean chemistry and biological productivity, enabling early detection of ecosystem stress.
          </p>

          <QuoteBlock
            variant="quote"
            quote="Sustained ocean observations are critical for understanding how marine ecosystems are responding to climate change and human pressures."
            authorName="Dr. Sophie Chen"
            authorTitle="Marine Ecologist, IOC-UNESCO"
            quoteColor="text-goos-blue-700"
            authorColor="text-goos-blue-700"
            iconColor="fill-goos-cyan-600"
          />
        </ContentModule>
      </div>
    </div>
  );
};

const meta = {
  title: '06. Layout/DeliveryAreasSection',
  component: DeliveryAreasSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DeliveryAreasSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * DeliveryAreasSection - Complete layout pattern from real project
 *
 * This story demonstrates how ColorStripes, DeliveryAreasNav, and ContentModules work together
 * to create the "Value of Ocean Observations" section of the report.
 *
 * Features:
 * - **Intro ContentModule (h2)**: Sets up the section with title and introduction
 * - **ColorStripes**: Visual separator with clickable delivery area icons (100vh height)
 * - **DeliveryAreasNav**: Fixed navigation bar (appears on scroll in real project)
 * - **Three ContentModule stories (h3)**: Climate, Operational Services, Ocean Health
 *
 * Layout pattern (as used in App.tsx):
 * 1. ContentModule h2 → "Value of Ocean Observations"
 * 2. ColorStripes → Visual transition with delivery area icons
 * 3. DeliveryAreasNav → Fixed nav (highlights active section on scroll)
 * 4. ContentModule h3 → AMOC story (#amoc-section)
 * 5. ContentModule h3 → El Niño story (#elnino-section)
 * 6. ContentModule h3 → Ocean Health story (#oceanhealth-section)
 *
 * Navigation:
 * - ColorStripes icons link to section IDs
 * - DeliveryAreasNav provides persistent navigation
 * - Sections have IDs matching the sectionId in ColorStripes
 *
 * **Note**: In Storybook, scroll-based highlighting is limited.
 * In production, DeliveryAreasNav highlights the current section based on scroll position.
 */
export const Default: Story = {};
