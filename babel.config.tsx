module.exports = {
    presets: [
      '@babel/preset-env',
      '@babel/preset-react',
      '@babel/preset-typescript',
      '@babel/preset-flow',
    ],
    plugins: [
      '@babel/plugin-transform-flow-strip-types',
    ],
  };