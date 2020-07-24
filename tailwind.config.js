module.exports = {
  theme: {
    extend: {
      height: {
        custom: 'calc(100vh - 160px)',
        custom2: '400px',
      },
    },
  },
  variants: {},
  plugins: [],
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './public/**/*.html',
      './src/**/*.vue',
    ],
  },
};
