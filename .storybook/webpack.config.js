// https://storybook.js.org/configurations/custom-webpack-config/

const path = require('path');

// load the default config generator.
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');

module.exports = (baseConfig, env) => {
  const config = genDefaultConfig(baseConfig, env);

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: [
      path.resolve(__dirname, '../src'),
      path.resolve(__dirname, '../stories')
    ],
    loader: require.resolve('ts-loader'),
    options: {
      configFile: 'tsconfig.storybook.json',
    }
  });
  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};