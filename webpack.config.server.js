const webpack = require("webpack");

const configs = {
  resolve: {
    modules: ["src", "node_modules"]
  },

  plugins: [
    new webpack.NormalModuleReplacementPlugin(
      /^(tedious|m[sy]sql2?|oracle(db)?|sqlite3|pg|pg-(native|query|connection|query-stream))$/,
      "noop2"
    ),
  ],
  externals: {
    knex: 'commonjs knex'
  }
}

module.exports = configs