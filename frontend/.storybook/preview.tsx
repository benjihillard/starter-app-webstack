import type { Preview } from '@storybook/react-vite';
import { withProviders } from './decorators';
import '../src/styles/index.css';

const preview: Preview = {
  decorators: [withProviders],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
};

export default preview;

