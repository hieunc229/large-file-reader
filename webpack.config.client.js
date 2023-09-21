const webpack = require("webpack");

const configs = {
  resolve: {
    modules: ["src", "node_modules"]
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /includes\/db$/
    })
  ]
}

module.exports = configs