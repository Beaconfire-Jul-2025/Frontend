import type { Preview } from '@storybook/react-webpack5'

import "antd/dist/reset.css";

// Set a global variable so UploadFile can detect Storybook mode
if (typeof window !== 'undefined') {
  (window as any).STORYBOOK_ENV = true;
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;
