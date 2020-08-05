module.exports = {
  theme: {
    extend: {
      height: {
        custom: 'calc(100vh - 250px)',
        custom2: '400px',
      },
      borderRadius: {
        xl: '20px',
        xxl: '40px',
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
