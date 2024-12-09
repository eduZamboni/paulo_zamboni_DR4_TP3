import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import reactNativeWeb from 'vite-plugin-react-native-web';
import liveReload from 'vite-plugin-live-reload';
import viteBabel from 'vite-plugin-babel';

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    reactNativeWeb(),
    liveReload('src/**/*.{js,jsx,ts,tsx}'),
    viteBabel({
      babelConfig: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
          '@babel/preset-typescript',
          '@babel/preset-flow',
        ],
        plugins: ['@babel/plugin-transform-flow-strip-types'],
      },
      filter: /node_modules\/react-native\/.*/,
    }),
  ],
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
    },
  },
  optimizeDeps: {
    include: ['normalize-css-color'],
  },
});