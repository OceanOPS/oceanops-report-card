import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';

addons.setConfig({
  theme: {
    ...themes.dark,
    brandTitle: 'OceanOPS Report Card',
    brandUrl: 'https://www.ocean-ops.org',
    brandImage: 'logos/goos-logo-w.png',
    brandTarget: '_blank',

    // GOOS colors
    colorPrimary: '#157FD2',
    colorSecondary: '#F38B25',
    appBg: '#0B1E42',
    appContentBg: '#12336E',
    barBg: '#184596',
    barSelectedColor: '#F38B25',
  },
});
