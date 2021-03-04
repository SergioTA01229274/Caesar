const path = require('path');

const contentBase = path.resolve(__dirname);

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    module: {
        rules: [
          {
            test: /\.wasm$/,
            type: 'webassembly/experimental',
            use: 'vue-wasm',}
        ]
    }
  },
}