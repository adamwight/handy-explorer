module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ?  "/handy-explorer" : ".",

    pluginOptions: {
      webpack: {
        dir: [
          './webpack'
        ]
      }
    }
}
