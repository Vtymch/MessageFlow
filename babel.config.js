module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      '@babel/preset-env',  // Добавьте это для поддержки современных возможностей
    ],
  };
};

