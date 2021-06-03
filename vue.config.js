module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  lintOnSave: 'warning',
  devServer: {
    overlay: {
      warnings: false,
      errors: false,
    },
  },
};
