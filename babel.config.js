module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['nativewind/babel'],
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@screens': './src/screens',
            '@components': './src/components',
            '@routes': './src/routes',
            '@assets': './src/assets',
            '@constants': './src/constants',
            '@hooks': './src/hooks',
            '@lib': './src/lib',
            '@contexts': './src/contexts',
            '@utils': './src/utils',
            '@navigation': './src/navigation',
            '@theme': './src/theme',
            '@db': './src/db',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  }
}
