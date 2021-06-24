const path = require('path');

module.exports = {
  webpack: {
    alias: {
      "@assets": path.resolve(__dirname, 'src/assets'),
      "@components": path.resolve(__dirname, 'src/components'),
      "@context": path.resolve(__dirname, 'src/context'),
      "@hooks": path.resolve(__dirname, 'src/hooks'),
      "@pages": path.resolve(__dirname, 'src/pages'),
      "@services": path.resolve(__dirname, 'src/services'),
      "@styles": path.resolve(__dirname, 'src/styles'),
    }
  }
};