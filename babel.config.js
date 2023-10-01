module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      "react-native-reanimated/plugin",
      ["nativewind/babel"], 
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
            '@lib': './src/lib'
          }
        }
      ]
    ],
  };
};
