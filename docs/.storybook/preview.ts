import type { Preview } from '@storybook/react';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; // Initialize i18next

// Fonts - Roboto (all weights)
import '@fontsource/roboto/100.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';

// Fonts - Roboto Condensed (all weights)
import '@fontsource/roboto-condensed/300.css';
import '@fontsource/roboto-condensed/400.css';
import '@fontsource/roboto-condensed/700.css';

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
        order: ['01. Introduction', '02. Design System', '03. Foundation', '04. Brand', '05. Components', '06. Layout'],
      },
    },
  },
};

export default preview;
