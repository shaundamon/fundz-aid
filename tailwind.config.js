  module.exports = {
    content: [
      './src/**/*.html',
      './src/**/*.jsx',
      './src/**/*.js',
      // Add other paths as needed
    ],
    theme: {
      extend: {},
    },
    plugins: [
      require('@tailwindcss/forms')
    ],
  };
