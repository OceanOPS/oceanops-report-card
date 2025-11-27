import type { Preview } from '@storybook/react';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; // Initialize i18next
import '@fontsource/roboto'; // Import Roboto font
import '@fontsource/roboto-condensed'; // Import Roboto Condensed font
import '../../src/index.css'; // Import Tailwind styles from main project
import '../preview.css'; // Additional Storybook-specific styles

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const storyElement = React.createElement(Story, context);
      return React.createElement(I18nextProvider, { i18n }, storyElement);
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Introduction', 'Brand', 'Foundation', 'Components', 'Layout'],
      },
    },
  },
};

export default preview;
