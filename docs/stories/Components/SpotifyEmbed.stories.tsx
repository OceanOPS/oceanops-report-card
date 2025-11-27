import type { Meta, StoryObj } from '@storybook/react';
import SpotifyEmbed from '../../../src/components/SpotifyEmbed';

const meta = {
  title: '05. Components/Media/SpotifyEmbed',
  component: SpotifyEmbed,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    spotifyId: {
      control: 'text',
      description: 'Spotify ID or full URL',
    },
    type: {
      control: 'select',
      options: ['episode', 'track', 'album', 'playlist', 'show'],
      description: 'Type of Spotify content',
    },
    height: {
      control: { type: 'number', min: 80, max: 500, step: 10 },
      description: 'Height in pixels',
    },
    width: {
      control: 'text',
      description: 'Width (e.g., "100%", "400px")',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Player theme',
    },
  },
  args: {
    spotifyId: '3AjTpnz2G7RZofpSOtiDa1',
    type: 'episode',
    height: 152,
    width: '100%',
    theme: 'light',
  },
} satisfies Meta<typeof SpotifyEmbed>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * SpotifyEmbed - Spotify player embed
 *
 * Embed Spotify content:
 * - **Episodes** (podcasts)
 * - **Tracks** (songs)
 * - **Albums**
 * - **Playlists**
 * - **Shows**
 *
 * Use the controls to customize:
 * - Spotify ID (or paste full URL - ID will be extracted)
 * - Content type
 * - Player size and theme
 *
 * **Example IDs**:
 * - Episode: `3AjTpnz2G7RZofpSOtiDa1`
 * - Track: `4cOdK2wGLETKBW3PvgPWqT`
 */
export const Default: Story = {
  args: {
    spotifyId: '3AjTpnz2G7RZofpSOtiDa1',
    type: 'episode',
    height: 152,
    width: '100%',
    theme: 'light',
  },
};
